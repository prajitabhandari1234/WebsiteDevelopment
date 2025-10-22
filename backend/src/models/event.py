from datetime import datetime

from sqlalchemy import Boolean, DateTime, String, UniqueConstraint, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel
from .campus_event import CampusEvent


class Event(BaseModel):
    event_datetime: Mapped[datetime] = mapped_column(
        DateTime,
    )
    title: Mapped[str] = mapped_column(
        String,
    )
    description: Mapped[str | None] = mapped_column(
        String,
        nullable=True,
    )
    thumbnail: Mapped[str | None] = mapped_column(
        String,
        nullable=True,
    )
    is_online: Mapped[bool] = mapped_column(
        Boolean, server_default=text("False"), default=False
    )
    recurrence: Mapped[str | None] = mapped_column(
        String,
        nullable=True,
    )

    __table_args__ = (UniqueConstraint("event_datetime", "title"),)

    # relationships
    campuses: Mapped[list["Campus"]] = relationship(
        secondary=CampusEvent.__table__,
        back_populates="events",
    )
    campus_associations: Mapped[list["CampusEvent"]] = relationship(
        back_populates="event",
    )
