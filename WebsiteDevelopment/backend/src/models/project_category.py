from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel


class ProjectCategory(BaseModel):
    __tablename__ = "project_categories"  # type: ignore

    name: Mapped[str] = mapped_column(String, unique=True)

    # relationships
    projects: Mapped[list["Project"]] = relationship(back_populates="category")
