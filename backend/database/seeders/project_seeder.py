from src.models import Project

from .base_seeder import BaseSeeder


class ProjectSeeder(BaseSeeder):
    def run(self):
        print("Project seeder run")
