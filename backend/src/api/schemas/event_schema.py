from datetime import datetime
from pydantic import BaseModel, ConfigDict


class CampusSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class CampusEventSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    location: str
    campus: CampusSchema


class EventSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    event_datetime: datetime
    description: str | None
    thumbnail: str | None
    is_online: bool
    recurrence: str | None
    campus_associations: list[CampusEventSchema]
