from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from .base import BaseModel


class BootcampApplication(BaseModel):
    name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False)
    phone: Mapped[str | None] = mapped_column(String, nullable=True)
    interest: Mapped[str] = mapped_column(String, nullable=False)
    other_interest: Mapped[str | None] = mapped_column(String, nullable=True)
