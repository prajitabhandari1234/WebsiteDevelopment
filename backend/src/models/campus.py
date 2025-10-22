from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel
from.campus_event import CampusEvent


class Campus(BaseModel):
    __tablename__ = "campuses"  # type: ignore

    name: Mapped[str] = mapped_column(
        String,
        unique=True,
    )

    # relationships
    members: Mapped[list["Member"]] = relationship(
        back_populates="campus",
    )
    events: Mapped[list["Event"]] = relationship(
        secondary=lambda: CampusEvent.__table__,
        back_populates="campuses",
        viewonly=True,
    )
    event_associations: Mapped[list["CampusEvent"]] = relationship(
        back_populates="campus",
    )
