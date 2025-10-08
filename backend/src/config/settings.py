from pydantic_settings import BaseSettings, SettingsConfigDict

from .database import DatabaseSettings


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=(".env",), env_nested_delimiter="_")

    db: DatabaseSettings


settings = Settings()  # type: ignore
