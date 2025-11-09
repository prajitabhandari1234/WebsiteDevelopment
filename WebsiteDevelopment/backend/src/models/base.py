import re

from datetime import datetime

from sqlalchemy import (
    BigInteger,
    DateTime,
    MetaData,
    func,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, declared_attr, mapped_column

from src.config import settings


constraint_naming_conventions = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}


class Base(DeclarativeBase):
    metadata = MetaData(
        naming_convention=constraint_naming_conventions, schema=settings.db.pgschema
    )

    @declared_attr.directive
    def __tablename__(cls) -> str:
        return f"{re.sub(r'(?<!^)(?=[A-Z])', "_", cls.__name__).lower()}s"


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(),
        server_default=func.now(),
        deferred=True,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(),
        server_default=func.now(),
        onupdate=func.now(),
        deferred=True,
    )


class BaseModel(Base, TimestampMixin):
    __abstract__ = True

    id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )
