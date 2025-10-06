from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from .base import BaseModel


class Project(BaseModel):
    title: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    thumbnail: Mapped[str] = mapped_column(String)
    tags: Mapped[list[str]] = mapped_column(String)
    status: Mapped[str] = mapped_column(String)
    demo_link: Mapped[str] = mapped_column(String)
    github_link: Mapped[str] = mapped_column(String)
