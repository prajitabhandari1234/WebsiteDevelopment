from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from src.api.schemas.event_schema import EventSchema
from src.models import CampusEvent, Event
from src.utils import get_db_session

event_router = APIRouter(prefix="/events", tags=["Event"])


@event_router.get(
    "",
    status_code=status.HTTP_200_OK,
    response_model=list[EventSchema],
)
def fetch_events(session: Annotated[Session, Depends(get_db_session)]):
    return (
        session.scalars(
            select(Event).options(
                joinedload(Event.campus_associations).joinedload(CampusEvent.campus)
            )
        )
        .unique()
        .all()
    )
