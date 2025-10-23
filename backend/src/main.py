from fastapi import Depends, FastAPI
from sqlalchemy import text

from src.api.routers import *
from src.utils import get_db_session

app = FastAPI(
    title="CQ Innovation Club",
    version="0.0.0",
)

app.include_router(blog_router)
app.include_router(event_router)
app.include_router(member_router)
app.include_router(project_router)


@app.get("/health")
async def health(session=Depends(get_db_session)):
    stmt = text("select 'healthy'")

    result = session.execute(stmt)
    return {"status": result.scalar()}
