from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from src.api.schemas.blog_schema import BlogSchema
from src.models import Blog
from src.utils import get_db_session

blog_router = APIRouter(prefix="/blogs", tags=["Blog"])


@blog_router.get(
    "",
    status_code=status.HTTP_200_OK,
    response_model=list[BlogSchema],
)
def fetch_blogs(session: Annotated[Session, Depends(get_db_session)]):
    return (
        session.scalars(select(Blog).options(joinedload(Blog.tags)))
        .unique()
        .all()
    )
