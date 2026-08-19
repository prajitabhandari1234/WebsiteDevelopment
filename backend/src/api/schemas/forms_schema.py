from pydantic import BaseModel, ConfigDict
from typing import List


class JoinFormCreate(BaseModel):
    name: str
    email: str
    major: str | None = None
    location: str | None = None
    interests: List[str] = []
    about: str | None = None


class BootcampFormCreate(BaseModel):
    name: str
    email: str
    phone: str | None = None
    interest: str
    other_interest: str | None = None


class BlogSubmissionCreate(BaseModel):
    title: str
    author: str
    category: str
    cover: str | None = None
    summary: str | None = None
    body: str

    model_config = ConfigDict(from_attributes=True)
