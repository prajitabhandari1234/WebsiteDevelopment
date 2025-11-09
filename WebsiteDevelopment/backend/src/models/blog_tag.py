from sqlalchemy import Column, ForeignKey, Table

from .base import Base


blog_tags = Table(
    "blog_tags",
    Base.metadata,
    Column(
        "blog_id",
        ForeignKey(
            "cqu_schema.blogs.id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    ),
    Column(
        "tag_id",
        ForeignKey(
            "cqu_schema.tags.id",
        ),
        primary_key=True,
    ),
)
