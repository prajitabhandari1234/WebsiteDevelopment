from fastapi import Depends, FastAPI
from sqlalchemy import text

from src.api.routers import project_router
from src.utils import get_db_session

app = FastAPI()

app.include_router(project_router)

@app.get("/health")
async def health(session=Depends(get_db_session)):
    stmt = text("select 'healthy'")

    result = session.execute(stmt)
    return {"status": result.scalar()}
