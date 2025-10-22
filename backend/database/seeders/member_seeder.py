import json

from sqlalchemy import select
from sqlalchemy.dialects.postgresql import insert

from src.models import Campus, Member, Role

from .base_seeder import BaseSeeder


class MemberSeeder(BaseSeeder):
    def run(self):
        with open(
            file="database/seeders/fixtures/members.json", mode="r", encoding="utf-8"
        ) as f:
            members_data = json.load(f)

        # Seed Roles
        roles = {member["role"] for member in members_data}
        role_insert_stmt = insert(Role).values([{"name": role} for role in roles])
        role_do_nothing_stmt = role_insert_stmt.on_conflict_do_nothing(
            index_elements=["name"]
        )
        self._session.execute(role_do_nothing_stmt)
        print(f"✅ Upserted {len(roles)} roles")

        # Seed Campuses
        campuses = {member.get("campus", "Rockhampton") for member in members_data}
        campus_insert_stmt = insert(Campus).values(
            [{"name": campus} for campus in campuses]
        )
        campus_do_nothing_stmt = campus_insert_stmt.on_conflict_do_nothing(
            index_elements=["name"]
        )
        self._session.execute(campus_do_nothing_stmt)
        print(f"✅ Upserted {len(campuses)} campuses")

        # Get Role and Campus maps
        db_roles = self._session.scalars(select(Role)).all()
        role_map = {role.name: role.id for role in db_roles}

        db_campuses = self._session.scalars(select(Campus)).all()
        campus_map = {campus.name: campus.id for campus in db_campuses}

        # Seed members
        members_to_upsert = []
        for member_data in members_data:
            members_to_upsert.append(
                {
                    "name": member_data.get("name"),
                    "role_id": role_map[member_data.get("role")],
                    "email": member_data.get("email"),
                    "linkedin": member_data.get("linkedin", None),
                    "avatar": member_data.get("avatar", None),
                    "bio": member_data.get("bio", None),
                    "campus_id": campus_map[member_data.get("campus", "Rockhampton")],
                }
            )

        stmt = insert(Member).values(members_to_upsert)
        stmt = stmt.on_conflict_do_update(
            index_elements=["email"],
            set_={
                "name": stmt.excluded.name,
                "role_id": stmt.excluded.role_id,
                "linkedin": stmt.excluded.linkedin,
                "avatar": stmt.excluded.avatar,
                "bio": stmt.excluded.bio,
                "campus_id": stmt.excluded.campus_id,
            },
        )
        self._session.execute(stmt)
        self._session.commit()

        print(f"✅ Upserted {len(members_to_upsert)} members")
