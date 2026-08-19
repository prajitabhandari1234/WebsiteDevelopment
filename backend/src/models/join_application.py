from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .base import BaseModel


class JoinApplication(BaseModel):
    name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False)
    major: Mapped[str | None] = mapped_column(String, nullable=True)
    location: Mapped[str | None] = mapped_column(String, nullable=True)
    # comma-separated interests from the front-end
    interests: Mapped[str | None] = mapped_column(Text, nullable=True)
    about: Mapped[str | None] = mapped_column(Text, nullable=True)
