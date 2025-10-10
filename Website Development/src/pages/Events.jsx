import { useMemo, useState } from "react";
import { EVENTS } from "../data/events";
import "../Styles/Join.css";    // reuse your hero styles
import "../Styles/Events.css";  // timeline styling

function byDateAsc(a, b) { return new Date(a.date) - new Date(b.date); }
function byDateDesc(a, b) { return new Date(b.date) - new Date(a.date); }

export default function Events() {
  const [q, setQ] = useState("");
  const [campus, setCampus] = useState("All");

  const campuses = useMemo(() => {
    const s = new Set(EVENTS.map(e => e.campus).filter(Boolean));
    return ["All", ...Array.from(s)];
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return EVENTS
      .filter(e => {
        const text = `${e.title} ${e.campus} ${e.location} ${e.blurb}`.toLowerCase();
        const okCampus = campus === "All" || e.campus === campus;
        return okCampus && (!s || text.includes(s));
      });
  }, [q, campus]);

  const now = new Date();
  const upcoming = [...filtered].filter(e => new Date(e.date) >= now).sort(byDateAsc);
  const past     = [...filtered].filter(e => new Date(e.date) <  now).sort(byDateDesc);

  return (
    <>
      {/* Hero */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <span className="hero-badge">Official Schedule</span>
            <h1 className="cta-section-title">Events</h1>
            <p className="cta-section-subtitle">
              Showcases, workshops, meet-ups, and campus initiatives from CQU I&amp;I.
            </p>
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className="container events-controls">
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
          </svg>
          <input
            className="events-search"
            type="search"
            placeholder="Search title, campus, or location…"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
          />
        </div>

        <select
          className="events-filter"
          value={campus}
          onChange={(e)=>setCampus(e.target.value)}
          aria-label="Filter by campus"
        >
          {campuses.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Upcoming */}
      <TimelineSection title="Upcoming">
        <Timeline events={upcoming} empty="No upcoming events match your filters." />
      </TimelineSection>

      {/* Past */}
      <TimelineSection title="Past" alt>
        <Timeline events={past} empty="No past events yet." />
      </TimelineSection>
    </>
  );
}

/* ---------------- Components ---------------- */

function TimelineSection({ title, alt, children }) {
  return (
    <section className={`events-section ${alt ? "alt" : ""}`}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Timeline({ events, empty }) {
  if (!events.length) return <p className="muted">{empty}</p>;

  // insert month dividers
  const rows = [];
  let currentMonthKey = "";

  events.forEach((e) => {
    const d = new Date(e.date);
    const monthKey = `${d.getFullYear()}-${d.getMonth()}`;
    if (monthKey !== currentMonthKey) {
      currentMonthKey = monthKey;
      rows.push(
        <div className="month-divider" key={`m-${monthKey}`}>
          {d.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </div>
      );
    }
    rows.push(<EventRow key={e.id} e={e} />);
  });

  return <div className="timeline">{rows}</div>;
}

function EventRow({ e }) {
  const d = new Date(e.date);
  const time = d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

  return (
    <article className="timeline-row">
      <div className="row-date">
        <div className="date-badge">
          <div className="day">{d.toLocaleDateString(undefined, { day: "2-digit" })}</div>
          <div className="mon">{d.toLocaleDateString(undefined, { month: "short" })}</div>
        </div>
      </div>

      <div className="row-dot" aria-hidden="true" />
      <div className="row-line" aria-hidden="true" />

      <div className="row-card">
        {e.cover && (
          <div className="card-media">
            <img src={e.cover} alt="" loading="lazy" onError={(ev)=>{ ev.currentTarget.src="/images/logo.jpg"; }}/>
          </div>
        )}

        <div className="card-body">
          <div className="meta">
            <span className="campus">{e.campus}</span>
            <span className="sep">•</span>
            <time dateTime={e.date}>{time}</time>
          </div>

          <h3 className="title">{e.title}</h3>
          {e.location && <p className="location">📍 {e.location}</p>}
          {e.blurb && <p className="blurb">{e.blurb}</p>}
        </div>
      </div>
    </article>
  );
}
