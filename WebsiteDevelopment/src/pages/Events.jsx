// src/pages/Events.jsx
// Elegant Agenda: one event per row, NO location, NO term intros.

import { useMemo, useState } from "react";
import { EVENTS } from "../data/events";
import "../Styles/Join.css";     // keep your green hero
import "../Styles/Events.css";   // agenda styles

function byDateAsc(a, b) { return new Date(a.date) - new Date(b.date); }

export default function Events() {
  const [q, setQ] = useState("");
  const [campus, setCampus] = useState("All");

  // campus options
  const campuses = useMemo(() => {
    const s = new Set(EVENTS.map(e => e.campus).filter(Boolean));
    return ["All", ...Array.from(s).sort()];
  }, []);

  // filter (location not used)
  const now = new Date();
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return EVENTS.filter(e => {
      const text = `${e.title} ${e.campus} ${e.blurb}`.toLowerCase();
      const okCampus = campus === "All" || e.campus === campus;
      return okCampus && (!needle || text.includes(needle));
    });
  }, [q, campus]);

  // always show upcoming only, soonest first
  const list = useMemo(
    () => filtered.filter(e => new Date(e.date) >= now).sort(byDateAsc),
    [filtered, now]
  );

  // group by month
  const months = useMemo(() => {
    const groups = new Map();
    for (const e of list) {
      const d = new Date(e.date);
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
      const label = d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
      if (!groups.has(key)) groups.set(key, { label, items: [] });
      groups.get(key).items.push(e);
    }
    return Array.from(groups.entries())
      .sort(([a],[b]) => a.localeCompare(b))
      .map(([,v]) => v);
  }, [list]);

  return (
    <>
      {/* HERO */}
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

      {/* Controls: ONLY search + campus */}
      <div className="container agenda-controls" role="region" aria-label="Filters">
        <div className="control-row">
          <div className="search-wrap">
            <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
            </svg>
            <input
              className="agenda-search"
              type="search"
              placeholder="Search title, campus, or description…"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
            />
          </div>

          <select
            className="agenda-select"
            value={campus}
            onChange={(e)=>setCampus(e.target.value)}
            aria-label="Filter by campus"
          >
            {campuses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Agenda */}
      <section className="container agenda" aria-live="polite">
        {months.length === 0 ? (
          <p className="muted">No events match your filters.</p>
        ) : (
          months.map(({label, items}) => (
            <div className="month-block" key={label}>
              <h3 className="month-sticky">{label}</h3>
              <div className="cards">
                {items.map(e => <AgendaCard key={e.id} e={e} />)}
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}

function AgendaCard({ e }) {
  const start = new Date(e.date);
  const end = e.end ? new Date(e.end) : null;
  const day  = start.toLocaleDateString(undefined, { day: "2-digit" });
  const mon  = start.toLocaleDateString(undefined, { month: "short" });
  const wday = start.toLocaleDateString(undefined, { weekday: "short" });
  const time = start.toLocaleTimeString(undefined, { timeStyle: "short" });
  const timeEnd = end ? end.toLocaleTimeString(undefined, { timeStyle: "short" }) : "";

  return (
    <article className="agenda-card">
      <div className="date-chip" aria-hidden="true">
        <span className="chip-day">{day}</span>
        <span className="chip-mon">{mon}</span>
      </div>

      <div className="card-main">
        <header className="card-header">
          <h4 className="card-title">{e.title}</h4>
          <span className={`pill ${pillForCampus(e.campus)}`}>{e.campus}</span>
        </header>

        <dl className="facts">
          <div><dt></dt><dd>{wday}, {time}{timeEnd ? ` – ${timeEnd}` : ""}</dd></div>
          {/* Location intentionally removed */}
        </dl>

        {e.blurb && <p className="blurb">{e.blurb}</p>}
      </div>
    </article>
  );
}

function pillForCampus(c) {
  const k = (c || "").toLowerCase();
  if (k.includes("rockhampton")) return "pill-rocky";
  if (k.includes("multi")) return "pill-multi";
  if (k.includes("online")) return "pill-online";
  return "pill-sydney";
}
