from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict

from .database import DatabaseSettings


class MailgunSettings(BaseModel):
    api_key: str
    domain: str
    from_email: str
    notify_to: str


class Settings(BaseSettings):
   
    model_config = SettingsConfigDict(
        env_file=".env",
        env_nested_delimiter="__"
    )

    db: DatabaseSettings
    mailgun: MailgunSettings


settings = Settings()
