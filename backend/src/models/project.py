from sqlalchemy import ForeignKey, JSON, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel


class Project(BaseModel):
    title: Mapped[str] = mapped_column(
        String,
        unique=True,
    )
    description: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )
    thumbnail: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )
    tags: Mapped[list[str]] = mapped_column(
        JSON,
    )
    status: Mapped[str] = mapped_column(
        String,
    )
    demo_link: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )
    github_link: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )
    category_id: Mapped[int] = mapped_column(
        ForeignKey(
            "cqu_schema.project_categories.id",
            ondelete="SET NULL",
        ),
        nullable=True,
    )

    # relationships
    category: Mapped["ProjectCategory"] = relationship(
        back_populates="projects",
    )
