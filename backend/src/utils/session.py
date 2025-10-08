from contextlib import contextmanager
from typing import Any, Iterator

from sqlalchemy import (
    Connection,
    URL,
    create_engine,
)
from sqlalchemy.orm import Session, sessionmaker

from src.config import settings


class DatabaseSessionManager:
    def __init__(self, host: URL, engine_kwargs: dict[str, Any] = {}):
        self._engine = create_engine(host, **engine_kwargs)
        self._sessionmaker = sessionmaker(bind=self._engine)

    @contextmanager
    def connect(self) -> Iterator[Connection]:
        if self._engine is None:
            raise Exception("DatabaseSessionManager not initialized")

        with self._engine.begin() as conn:  # reserving a lane (transaction)
            try:
                yield conn  # temporarily a private lane
            except Exception:
                conn.rollback()
                raise

    @contextmanager
    def session(self) -> Iterator[Session]:
        if self._engine is None:
            raise Exception("DatabaseSessionManager not initialized")

        if self._sessionmaker is None:
            raise

        session = self._sessionmaker()

        try:
            yield session
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    def close(self):
        if self._engine is None:
            raise Exception("DatabaseSessionManager not initialized")

        self._engine.dispose()

        self._engine = None
        self._sessionmaker = None


sessionmanager = DatabaseSessionManager(settings.db.url)


@contextmanager
def get_db_session():
    with sessionmanager.session() as session:
        yield session
