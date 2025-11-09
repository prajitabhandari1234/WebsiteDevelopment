from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel


class Member(BaseModel):
    name: Mapped[str] = mapped_column(
        String,
    )
    avatar: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )
    bio: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )
    linkedin: Mapped[str] = mapped_column(
        String,
        nullable=True,
    )
    email: Mapped[str] = mapped_column(
        String,
        unique=True,
    )
    role_id: Mapped[int] = mapped_column(
        ForeignKey(
            "cqu_schema.roles.id",
            ondelete="SET NULL",
        ),
        nullable=True,
    )
    campus_id: Mapped[int] = mapped_column(
        ForeignKey(
            "cqu_schema.campuses.id",
            ondelete="SET NULL",
        ),
        nullable=True,
    )

    # relationships
    role: Mapped["Role"] = relationship(
        back_populates="members",
    )
    campus: Mapped["Campus"] = relationship(
        back_populates="members",
    )
