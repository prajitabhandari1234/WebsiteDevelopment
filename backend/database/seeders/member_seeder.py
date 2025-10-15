import json

from sqlalchemy import select
from sqlalchemy.dialects.postgresql import insert

from src.models import Location, Member, Role

from .base_seeder import BaseSeeder


class MemberSeeder(BaseSeeder):
    def run(self):
        with open(
            file="database/seeders/fixtures/members.json", mode="r", encoding="utf-8"
        ) as f:
            members_data = json.load(f)

        # Seed Roles
        roles = {member["role"] for member in members_data}
        existing_roles = self._session.scalars(select(Role.name)).all()
        roles_to_add = roles - set(existing_roles)
        role_data = [Role(name=role) for role in roles_to_add]
        self._session.add_all(role_data)
        self._session.commit()
        print(f"✅ Seeded {len(roles_to_add)} roles")

        # Seed Locations
        locations = {member.get("location", "Rockhampton") for member in members_data}
        existing_locations = self._session.scalars(select(Location.name)).all()
        locations_to_add = locations - set(existing_locations)
        location_data = [Location(name=location) for location in locations_to_add]
        self._session.add_all(location_data)
        self._session.commit()
        print(f"✅ Seeded {len(locations_to_add)} locations")

        # Get Role and Location maps
        db_roles = self._session.scalars(select(Role)).all()
        role_map = {role.name: role.id for role in db_roles}

        db_locations = self._session.scalars(select(Location)).all()
        location_map = {location.name: location.id for location in db_locations}

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
                    "location_id": location_map[
                        member_data.get("location", "Rockhampton")
                    ],
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
                "location_id": stmt.excluded.location_id,
            },
        )
        self._session.execute(stmt)
        self._session.commit()

        print(f"✅ Upserted {len(members_to_upsert)} members")
