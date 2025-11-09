from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel
from .blog_tag import blog_tags


class Tag(BaseModel):
    name: Mapped[str] = mapped_column(
        String,
        unique=True,
    )

    # relationship
    blogs: Mapped[list["Blog"]] = relationship(
        secondary=blog_tags,
        back_populates="tags",
    )
