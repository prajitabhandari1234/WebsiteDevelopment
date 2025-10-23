from datetime import date

from sqlalchemy import Date, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel
from .blog_tag import blog_tags
from .tag import Tag


class Blog(BaseModel):
    title: Mapped[str] = mapped_column(
        String,
        unique=True,
    )
    publish_date: Mapped[date] = mapped_column(
        Date,
    )
    overview: Mapped[str] = mapped_column(
        Text,
    )
    image: Mapped[str | None] = mapped_column(String, nullable=True)
    description: Mapped[str] = mapped_column(
        Text,
    )

    # relationship
    tags: Mapped[list[Tag]] = relationship(secondary=blog_tags, back_populates="blogs")
