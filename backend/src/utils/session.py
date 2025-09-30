import contextlib
from typing import Any, AsyncIterator

from sqlalchemy import URL
from sqlalchemy.ext.asyncio import (
    AsyncConnection,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from config.settings import settings


class DatabaseSessionManager:
    def __init__(self, host: URL, engine_kwargs: dict[str, Any] = {}):
        """
        - self._engine = Think of the engine as the highway system connecting your city (FastAPI app) to the database city
        - create_async_engine builds the highway
        - self._sessionmaker = Think of sessionmaker as a car factory connected to the highway
            - car = session
            - a fresh car/session for each journey/request
            - Cars track what goods you carry (ORM objects) and report back to the warehouse (database) when you arrive (commit/rollback).
        """
        self._engine = create_async_engine(host, **engine_kwargs)
        self._sessionmaker = async_sessionmaker(bind=self._engine)

    @contextlib.asynccontextmanager
    async def connect(self) -> AsyncIterator[AsyncConnection]:
        """
        Think of @asynccontextmanager as the traffic control system for your highway:
            - It manages the lifecycle of every lane you reserve.
            - Ensures that setup, usage, and cleanup are handled safely.
        """
        if self._engine is None:
            raise Exception("DatabaseSessionManager not initialized")
        
        async with self._engine.begin() as conn: # reserving a lane (transaction)
            try:
                yield conn # temporarily a private lane
            except Exception:
                await conn.rollback()
                raise

    @contextlib.asynccontextmanager
    async def session(self) -> AsyncIterator[AsyncSession]:
        if self._engine is None:
            raise Exception("DatabaseSessionManager not initialized")

        if self._sessionmaker is None:
            raise
        
        session = self._sessionmaker()

        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

    async def close(self):
        if self._engine is None:
            raise Exception("DatabaseSessionManager not initialized")

        await self._engine.dispose()

        self._engine = None
        self._sessionmaker = None


sessionmanager = DatabaseSessionManager(settings.db.url)

async def get_db_session():
    async with sessionmanager.session() as session:
        yield session
