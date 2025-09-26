/**
 * Projects.jsx
 * -----------------------------------------------------------------------------
 * Projects page that showcases:
 *   • Hero (intro)
 *   • Controls bar (Search + Sort)
 *   • Featured grid (status + Demo + GitHub)
 *   • Upcoming grid  (status only)
 *   • Video modal for demos (file/YouTube)
 *   • “Join the Club” call-to-action
 *
 * DATA:
 *   Import shape: see src/data/projects.js
 *   - “Featured” = status !== "planning"
 *   - “Upcoming” = status === "planning"
 *
 * ACCESSIBILITY:
 *   - Modal uses aria-modal + labelled dialog
 *   - Buttons/links have clear labels
 *
 * NOTE:
 *   UI is kept in one file for portability. If it grows, split components.
 * -----------------------------------------------------------------------------
 */

import { useMemo, useState } from "react";
import "../Styles/Projects.css";
import "../Styles/overall-style.css";
import { ALL_PROJECTS, CATEGORY_LABELS } from "../data/projects";

/* =============================================================================
 * Page: Projects
 * ========================================================================== */
export default function Projects() {
  // Search text and sort selection
  const [query, setQuery] = useState("");
  const [sort, setSort]   = useState("featured");

  // Static list for now (swap to API later if needed)
  const [projects] = useState(ALL_PROJECTS);

  // Demo modal (centralized at page scope so any card can open it)
  const [demo, setDemo] = useState({ open:false, src:"", title:"", type:"video" });
  const openDemo  = (d) => setDemo({ open:true, src:d.src, title:d.title || "Demo", type:d.type || "video" });
  const closeDemo = ()   => setDemo({ open:false, src:"", title:"", type:"video" });

  // Derived views
  const featured = useFilteredSorted(projects, { query, sort, plannedOnly:false });
  const upcoming = useFilteredSorted(projects, { query, sort, plannedOnly:true });

  return (
    <>
      {/* ───────────────────────────── Hero ───────────────────────────── */}
      <section className="cta-section" id="intro">
        <div className="container">
          <div className="cta-content" style={{ maxWidth: 900, margin: "0 auto" }}>
            <span className="hero-badge">Our Project Portfolio</span>
            <h2 className="cta-section-title">Merging Creativity with Technology</h2>
            <p className="cta-section-subtitle">
              {/* CATEGORY_LABELS simply prettifies category keys */}
              Explore {CATEGORY_LABELS["raspberry-pi"]}, {CATEGORY_LABELS.web}, {CATEGORY_LABELS.games}, and {CATEGORY_LABELS.networking}.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────── Featured + Controls bar ───────────────────── */}
      <Section
        title="Featured Projects"
        subtitle="All Active & Completed projects across Raspberry Pi / ML, Web, Games, and Networking."
      >
        {/* Controls (Search + Sort) */}
        <div className="controls-wrap">
          <Controls
            query={query} setQuery={setQuery}
            sort={sort}   setSort={setSort}
          />
        </div>

        {/* Featured grid: Status + Demo + GitHub */}
        <ProjectGrid projects={featured} onOpenDemo={openDemo} variant="featured" />
      </Section>

      {/* ─────────────────────────── Upcoming ─────────────────────────── */}
      <Section title="Upcoming Projects" subtitle="Planned ideas we’re scoping next." variant="alt">
        {/* Upcoming grid: Status only */}
        <ProjectGrid projects={upcoming} onOpenDemo={openDemo} variant="upcoming" />
      </Section>

      {/* ─────────────────────────── Bottom CTA ────────────────────────── */}
      <JoinClubCta />

      {/* ─────────────────────────── Video Modal ───────────────────────── */}
      <VideoModal
        open={demo.open}
        onClose={closeDemo}
        title={demo.title}
        src={demo.src}
        type={demo.type}
      />
    </>
  );
}

/* =============================================================================
 * Hook: useFilteredSorted
 *  - Filters list by query (title/description/category/tags)
 *  - Sorts list by "featured" (no-op), "status", "az", "za"
 *  - Splits featured/upcoming via plannedOnly flag
 * ========================================================================== */
function useFilteredSorted(items, { query="", sort="featured", plannedOnly=false }) {
  return useMemo(() => {
    // 1) Slice by “plannedOnly” (upcoming) vs “featured”
    let list = items.filter(p => (plannedOnly ? p.status === "planning" : p.status !== "planning"));

    // 2) Text search (case-insensitive). Swap to Fuse.js for fuzzy search if needed.
    if (query.trim()) {
      const n = query.toLowerCase();
      list = list.filter(p =>
        [p.title||"", p.description||"", p.category||"", (p.tags||[]).join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(n)
      );
    }

    // 3) Sort order
    const copy = [...list];
    if (sort === "status") {
      // Manual status order
      const order = { active: 0, completed: 1, planning: 2 };
      copy.sort((a,b)=> (order[a.status]??9) - (order[b.status]??9));
    } else if (sort === "az") {
      copy.sort((a,b)=> a.title.localeCompare(b.title));
    } else if (sort === "za") {
      copy.sort((a,b)=> b.title.localeCompare(a.title));
    }
    // "featured" keeps insertion order
    return copy;
  }, [items, query, sort, plannedOnly]);
}

/* =============================================================================
 * Section: Generic layout wrapper used for Feature/Upcoming blocks
 * ========================================================================== */
function Section({ title, subtitle, children, variant = "" }) {
  return (
    <section className={`offerings-section ${variant === "alt" ? "offerings-section--alt" : ""}`}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        {subtitle && (
          <p style={{ textAlign: "center", maxWidth: 900, margin: "0 auto 24px", color: "#2c3e50" }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

/* =============================================================================
 * Controls: Big Search input + compact Sort select
 * ========================================================================== */
function Controls({ query, setQuery, sort, setSort }) {
  return (
    <div className="projects-controls pro pro--search-only">
      {/* Search (free text) */}
      <input
        type="search"
        className="input-lite search"
        placeholder="Search projects…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {/* Sort (Featured / Status / A→Z / Z→A) */}
      <div className="select-wrap sm">
        <select
          className="input-lite sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort by"
        >
          <option value="featured">Sort: Featured</option>
          <option value="status">Sort: Status</option>
          <option value="az">Sort: Name A → Z</option>
          <option value="za">Sort: Name Z → A</option>
        </select>
      </div>
    </div>
  );
}

/* =============================================================================
 * ProjectGrid: renders a responsive list of ProjectCard
 *  - variant="featured" => Status + [Demo] + [GitHub]
 *  - variant="upcoming" => Status only
 * ========================================================================== */
function ProjectGrid({ projects = [], onOpenDemo, variant }) {
  if (!projects.length) {
    return (
      <div className="projects-grid empty-note" aria-live="polite">
        No projects match your search.
      </div>
    );
  }
  return (
    <div className="projects-grid">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onOpenDemo={onOpenDemo} variant={variant} />
      ))}
    </div>
  );
}

/* =============================================================================
 * ProjectCard: individual card
 *  Footer:
 *   - Featured: Status + [Demo] + [GitHub]
 *   - Upcoming: Status only (actions area is blank spacer to keep layout)
 * ========================================================================== */
function ProjectCard({ project, onOpenDemo, variant }) {
  const {
    title,
    description,
    status = "active",
    category,
    tags = [],
    emoji = "🌐",
    links, // { repo }
    demo,  // { src, type, title }
  } = project;

  const hasDemo = !!demo?.src;
  const hasGit  = !!links?.repo;

  // Status badge class
  const badgeClass =
    status === "completed"
      ? "status-badge status-completed"
      : status === "planning"
      ? "status-badge status-planned"
      : "status-badge status-active";

  return (
    <article className="project-card pro" data-cat={category} data-status={status}>
      {/* Header (gradient w/ emoji) */}
      <div className="card-head">
        <span className="head-emoji" aria-hidden="true">{emoji}</span>
      </div>

      {/* Body (title, description, tags) */}
      <div className="card-body">
        <h3 className="project-title">{title}</h3>
        {description && <p className="project-desc">{description}</p>}
        {!!tags.length && (
          <ul className="project-tags-lite">
            {tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
        )}
      </div>

      {/* Footer (status + actions) */}
      <div className="card-foot">
        {/* Status (always) */}
        <span className={badgeClass}>
          {status === "completed" ? "Completed" : status === "planning" ? "Planned" : "Active"}
        </span>

        {/* Actions: Featured only */}
        {variant === "featured" ? (
          <div className="actions">
            {hasDemo && (
              <button
                type="button"
                className="btn btn-demo"
                onClick={() => onOpenDemo(demo)}
              >
                Demo
              </button>
            )}
            {hasGit && (
              <a className="btn btn-git" href={links.repo} target="_blank" rel="noreferrer">
                <GitIcon /> GitHub
              </a>
            )}
          </div>
        ) : (
          // Spacer to keep layout consistent when actions are absent
          <span aria-hidden="true" />
        )}
      </div>
    </article>
  );
}

/* =============================================================================
 * VideoModal: lightweight lightbox (mp4 / YouTube)
 *  - Click backdrop or “×” to close
 *  - Converts YT URLs to embeddable form
 * ========================================================================== */
function VideoModal({ open, onClose, title = "Demo", src, type = "video" }) {
  if (!open) return null;
  const isYT = typeof src === "string" && /youtube\.com|youtu\.be/.test(src);

  return (
    <div
      className={`video-modal ${open ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} video`}
    >
      <div className="video-modal__backdrop" onClick={onClose} />
      <div className="video-modal__dialog">
        <button className="video-modal__close" aria-label="Close video" onClick={onClose}>×</button>
        <div className="video-modal__player">
          {type === "video" && !isYT ? (
            /* Local/served video file */
            <video controls playsInline preload="metadata" src={src} />
          ) : (
            /* External embed (YouTube etc.) */
            <iframe
              src={toEmbed(src)}
              title={title}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}

/** Convert a standard YouTube URL to an embeddable URL (no-op for others). */
function toEmbed(url) {
  if (!url) return "";
  if (/youtu\.be/.test(url)) {
    const id = url.split("/").pop().split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (/youtube\.com/.test(url)) {
    const u = new URL(url, window.location.origin);
    const id = u.searchParams.get("v");
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
}

/* =============================================================================
 * Icon: GitHub (inline SVG to avoid external deps)
 * ========================================================================== */
function GitIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" style={{marginRight:8}}>
      <path
        fill="currentColor"
        d="M8 .2a8 8 0 0 0-2.53 15.6c.4.08.55-.18.55-.4v-1.4c-2.24.49-2.71-1.08-2.71-1.08-.36-.93-.88-1.18-.88-1.18-.72-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.71 1.22 1.86.87 2.31.66.07-.52.28-.87.5-1.07-1.79-.2-3.67-.9-3.67-4 0-.89.32-1.6.84-2.16-.08-.2-.36-1.01.08-2.1 0 0 .68-.22 2.24.83.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.56-1.05 2.23-.83 2.23-.83.44 1.09.16 1.9.08 2.1.52.56.84 1.27.84 2.16 0 3.11-1.88 3.8-3.68 4 .29.25.54.75.54 1.52v2.26c0 .22.14.48.55.4A8 8 0 0 0 8 .2Z"
      />
    </svg>
  );
}

/* =============================================================================
 * CTA: “Join the Club” banner shown at the bottom of the page
 * ========================================================================== */
function JoinClubCta() {
  return (
    <section className="join-cta">
      <div className="join-cta__inner container">
        <h2 className="join-cta__title">Interested in Working With Us?</h2>
        <p className="join-cta__subtitle">
          Passionate about Raspberry Pi, web, or game development? <span role="img" aria-label="rocket">🚀</span> Join our club and be part of the next wave of innovation.
        </p>
        <div className="join-cta__actions">
          <a className="join-cta__btn" href="/join">Join the Club</a>
        </div>
      </div>
    </section>
  );
}
