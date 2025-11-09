from typing import Annotated

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from src.models import Member
from src.utils import get_db_session

member_router = APIRouter(prefix="/members", tags=["Member"])


@member_router.get(
    "",
    status_code=status.HTTP_200_OK,
)
def fetch_member(session: Annotated[Session, Depends(get_db_session)]):
    return session.scalars(
        select(Member).options(joinedload(Member.role), joinedload(Member.campus))
    ).all()
