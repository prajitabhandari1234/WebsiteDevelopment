from sqlalchemy import select

from src.models import ProjectCategory

from .base_seeder import BaseSeeder


class ProjectCategorySeeder(BaseSeeder):
    def run(self):
        categories = {"web", "raspberry-pi", "games", "networking", "more"}

        existing_categories = self._session.scalars(select(ProjectCategory.name)).all()

        if not existing_categories is None:
            categories = categories - set(existing_categories)

        project_categories_data = [ProjectCategory(name=category) for category in categories]

        self._session.add_all(project_categories_data)
        self._session.commit()
        
        print(f"✅ Seeded {len(categories)} project categories")
