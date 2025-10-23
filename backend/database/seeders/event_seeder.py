import json
from datetime import datetime

from sqlalchemy.dialects.postgresql import insert

from src.models import Campus, CampusEvent, Event
from .base_seeder import BaseSeeder


class EventSeeder(BaseSeeder):
    def run(self):
        with open(
            file="database/seeders/fixtures/events.json", mode="r", encoding="utf-8"
        ) as f:
            events_data = json.load(f)

        events_to_insert = []
        for event_data in events_data:
            events_to_insert.append(
                {
                    "title": event_data["title"],
                    "event_datetime": datetime.fromisoformat(event_data["date"]),
                    "description": event_data.get("description", None),
                    "thumbnail": event_data.get("thumbnail", None),
                    "is_online": event_data.get("is_online", False),
                    "recurrence": event_data.get("recurrence", None),
                }
            )

        if events_to_insert:
            event_stmt = insert(Event).values(events_to_insert)
            event_stmt = event_stmt.on_conflict_do_update(
                index_elements=["event_datetime", "title"],
                set_=dict(
                    description=event_stmt.excluded.description,
                    thumbnail=event_stmt.excluded.thumbnail,
                    is_online=event_stmt.excluded.is_online,
                    recurrence=event_stmt.excluded.recurrence,
                ),
            )
            self._session.execute(event_stmt)

        self._session.flush()

        all_campuses = self._session.query(Campus).all()
        all_events = self._session.query(Event).all()
        campus_map = {c.name: c.id for c in all_campuses}
        event_map = {(e.title, e.event_datetime): e.id for e in all_events}

        campus_events_to_insert = []
        for event_data in events_data:
            event_dt = datetime.fromisoformat(event_data["date"])
            event_key = (event_data["title"], event_dt)
            event_id = event_map.get(event_key)

            if not event_id:
                continue

            if "venue" in event_data:
                for campus_name, location in event_data["venue"].items():
                    campus_id = campus_map.get(campus_name)
                    if campus_id:
                        campus_events_to_insert.append(
                            {
                                "event_id": event_id,
                                "campus_id": campus_id,
                                "location": location,
                            }
                        )

        if campus_events_to_insert:
            ce_stmt = insert(CampusEvent).values(campus_events_to_insert)
            ce_stmt = ce_stmt.on_conflict_do_update(
                index_elements=["event_id", "campus_id"],
                set_=dict(location=ce_stmt.excluded.location),
            )
            self._session.execute(ce_stmt)

        self._session.commit()

        print(f"✅ Upserted {len(events_to_insert)} events")
