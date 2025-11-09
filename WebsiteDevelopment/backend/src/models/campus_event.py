from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


from src.config import settings


class CampusEvent(Base):
    __tablename__ = "campus_events"

    event_id: Mapped[int] = mapped_column(
        ForeignKey(
            f"{settings.db.pgschema}.events.id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )
    campus_id: Mapped[int] = mapped_column(
        ForeignKey(
            f"{settings.db.pgschema}.campuses.id",
            ondelete="CASCADE",
        ),
        primary_key=True,
    )
    location: Mapped[str] = mapped_column(
        String,
    )

    # relationships
    campus: Mapped["Campus"] = relationship(
        back_populates="event_associations",
    )
    event: Mapped["Event"] = relationship(
        back_populates="campus_associations",
    )
