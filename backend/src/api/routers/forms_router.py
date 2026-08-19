from typing import Annotated
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from src.api.schemas.forms_schema import (
    JoinFormCreate,
    BootcampFormCreate,
    BlogSubmissionCreate,
)
from src.utils import get_db_session, send_notification_email
from src.models import (
    JoinApplication,
    BootcampApplication,
    BlogSubmission,
)


forms_router = APIRouter(prefix="/forms", tags=["Forms"])


@forms_router.post("/join", status_code=status.HTTP_201_CREATED)
async def submit_join_form(
    payload: JoinFormCreate,
    session: Annotated[Session, Depends(get_db_session)],
):
    try:
        record = JoinApplication(
            name=payload.name.strip(),
            email=payload.email.strip().lower(),
            major=(payload.major or "").strip() or None,
            location=(payload.location or "").strip() or None,
            interests=",".join(payload.interests or []),
            about=(payload.about or "").strip() or None,
        )
        session.add(record)
        session.commit()

        await send_notification_email(
            subject="New Join Application",
            text=f"""
Name: {record.name}
Email: {record.email}
Major: {record.major}
Location: {record.location}
Interests: {record.interests}
About: {record.about}
""",
        )

        return {"ok": True, "id": record.id}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Join form failed: {str(e)}")


@forms_router.post("/bootcamp", status_code=status.HTTP_201_CREATED)
async def submit_bootcamp_form(
    payload: BootcampFormCreate,
    session: Annotated[Session, Depends(get_db_session)],
):
    try:
        record = BootcampApplication(
            name=payload.name.strip(),
            email=payload.email.strip().lower(),
            phone=(payload.phone or "").strip() or None,
            interest=payload.interest,
            other_interest=(payload.other_interest or "").strip() or None,
        )
        session.add(record)
        session.commit()

        await send_notification_email(
            subject="New Bootcamp Application",
            text=f"""
Name: {record.name}
Email: {record.email}
Phone: {record.phone}
Interest: {record.interest}
Other Interest: {record.other_interest}
""",
        )

        return {"ok": True, "id": record.id}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Bootcamp form failed: {str(e)}")


@forms_router.post("/blog-submission", status_code=status.HTTP_201_CREATED)
async def submit_blog_submission(
    payload: BlogSubmissionCreate,
    session: Annotated[Session, Depends(get_db_session)],
):
    try:
        record = BlogSubmission(
            title=payload.title.strip(),
            author=payload.author.strip(),
            category=payload.category.strip(),
            cover=(payload.cover or "").strip() or None,
            summary=(payload.summary or "").strip() or None,
            body=payload.body.strip(),
        )
        session.add(record)
        session.commit()

        await send_notification_email(
            subject="New Blog Submission",
            text=f"""
Title: {record.title}
Author: {record.author}
Category: {record.category}

Summary:
{record.summary}

Body (first 500 chars):
{record.body[:500]}...
""",
        )

        return {"ok": True, "id": record.id}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Blog submission failed: {str(e)}")
