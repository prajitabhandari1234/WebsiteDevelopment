from rich import print
from typer import Typer

import database.seeders as seeders

from src.utils.session import sessionmanager


cli = Typer()


@cli.command()
def seed():
    with sessionmanager.session() as session:
        for seeder in seeders.__all__:
            seeder_cls = getattr(seeders, seeder)

            print(f"🚀 Running seeder: {seeder_cls.__name__} 🚀")
            seeder_cls(session).run()
            print(f"🚀 {seeder_cls.__name__} ran successfully 🚀")


if __name__ == "__main__":
    cli()
