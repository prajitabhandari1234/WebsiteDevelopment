import json

from sqlalchemy.dialects.postgresql import insert

from src.models import Project, ProjectCategory

from .base_seeder import BaseSeeder


class ProjectSeeder(BaseSeeder):
    def run(self):
        # Seed project categories
        categories = {"web", "raspberry-pi", "games", "networking", "more"}
        category_insert_stmt = insert(ProjectCategory).values(
            [{"name": category} for category in categories]
        )
        category_do_update_stmt = category_insert_stmt.on_conflict_do_nothing(
            index_elements=["name"]
        )
        self._session.execute(category_do_update_stmt)
        self._session.commit()
        print(f"✅ Upserted {len(categories)} project categories")

        # Seed projects
        with open(
            file="database/seeders/fixtures/projects.json", mode="r", encoding="utf-8"
        ) as f:
            projects_data = json.load(f)

        categories_from_db = self._session.query(ProjectCategory).all()
        category_map = {cat.name: cat.id for cat in categories_from_db}

        project_values = [
            {
                "title": project.get("title"),
                "description": project.get("description"),
                "thumbnail": project.get("thumbnail", None),
                "tags": project.get("tags", []),
                "status": project.get("status"),
                "demo_link": project.get("demo_link", None),
                "github_link": project.get("github_link", None),
                "category_id": category_map[project["category"]],
            }
            for project in projects_data
        ]

        project_insert_stmt = insert(Project).values(project_values)
        project_do_update_stmt = project_insert_stmt.on_conflict_do_update(
            index_elements=["title"],
            set_={
                "description": project_insert_stmt.excluded.description,
                "thumbnail": project_insert_stmt.excluded.thumbnail,
                "tags": project_insert_stmt.excluded.tags,
                "status": project_insert_stmt.excluded.status,
                "demo_link": project_insert_stmt.excluded.demo_link,
                "github_link": project_insert_stmt.excluded.github_link,
                "category_id": project_insert_stmt.excluded.category_id,
            },
        )

        self._session.execute(project_do_update_stmt)
        self._session.commit()
        print(f"✅ Upserted {len(projects_data)} projects successfully!")
