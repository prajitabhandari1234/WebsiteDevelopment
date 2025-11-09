from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel


class Role(BaseModel):
    name: Mapped[str] = mapped_column(
        String,
        unique=True,
    )

    # relationships
    members: Mapped[list["Member"]] = relationship(
        back_populates="role",
    )
