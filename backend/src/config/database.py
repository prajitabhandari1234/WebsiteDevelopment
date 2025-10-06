from pydantic import BaseModel
from sqlalchemy import URL


class DatabaseSettings(BaseModel):
    dialect: str
    driver: str
    host: str
    port: int
    database: str
    pgschema: str
    username: str
    password: str

    @property
    def url(self) -> URL:
        return URL.create(
            drivername=f"{self.dialect}+{self.driver}",
            username=self.username,
            password=self.password,
            host=self.host,
            port=self.port,
            database=self.database,
        )
