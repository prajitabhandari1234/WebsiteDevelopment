import json

from sqlalchemy import select

from src.models import Project, ProjectCategory

from .base_seeder import BaseSeeder


class ProjectSeeder(BaseSeeder):
    def run(self):
        with open(file="database/seeders/fixtures/projects.json", mode="r", encoding="utf-8") as f:
            projects_data = json.load(f)
        
        categories = self._session.scalars(select(ProjectCategory)).all()
        category_map = {cat.name: cat.id for cat in categories}

        projects = [
            Project(
                title=project.get("title"),
                description=project.get("description"),
                thumbnail=project.get("thumbnail", None),
                tags=project.get("tags", []),
                status=project.get("status"),
                demo_link=project.get("demo_link", None),
                github_link=project.get("github_link", None),
                category_id=category_map[project["category"]]

            )
            for project in projects_data
        ]

        self._session.add_all(projects)
        self._session.commit()
        print(f"✅ Inserted {len(projects)} projects successfully!")
