from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
import logging
logging.basicConfig(level=logging.DEBUG)


from src.api.routers import blog_router, event_router, member_router, project_router, forms_router
from src.utils import get_db_session

app = FastAPI(
    title="CQ Innovation Club",
    version="0.0.0",
)

# CORS so React dev (localhost:5173) can call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(blog_router)
app.include_router(event_router)
app.include_router(member_router)
app.include_router(project_router)
app.include_router(forms_router)


@app.get("/health")
async def health(session=Depends(get_db_session)):
    stmt = text("select 'healthy'")
    result = session.execute(stmt)
    return {"status": result.scalar()}
