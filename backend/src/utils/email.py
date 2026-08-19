import httpx
from src.config import settings


async def send_notification_email(subject: str, text: str) -> None:
    """
    Send a simple text email via Mailgun.
    Uses MAILGUN_* settings from .env.
    """
    api_key = settings.mailgun.api_key
    domain = settings.mailgun.domain
    from_email = settings.mailgun.from_email
    to_email = settings.mailgun.notify_to

    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.post(
            f"https://api.mailgun.net/v3/{domain}/messages",
            auth=("api", api_key),
            data={
                "from": from_email,
                "to": [to_email],
                "subject": subject,
                "text": text,
            },
        )

    resp.raise_for_status()
