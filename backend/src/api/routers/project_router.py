from typing import Annotated

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from src.models import Project
from src.utils import get_db_session

project_router = APIRouter(prefix="/projects", tags=["Project"])

@project_router.get(
    "",
    status_code=status.HTTP_200_OK,
)
def fetch_projects(
    session: Annotated[Session, Depends(get_db_session)]
):
    return session.scalars(
        select(Project)
            .options(joinedload(Project.category))
    ).all()