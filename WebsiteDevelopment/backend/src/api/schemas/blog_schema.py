from datetime import date
from pydantic import BaseModel, ConfigDict


class TagSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class BlogSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    publish_date: date
    overview: str
    image: str | None
    description: str
    tags: list[TagSchema]
