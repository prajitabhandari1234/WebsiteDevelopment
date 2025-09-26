import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { POSTS } from "../data/posts";
import "../Styles/Join.css";  // for .cta-section hero
import "../Styles/Blog.css";

/* ---------- LocalStorage Reviews ---------- */
const REVIEWS_KEY = "cqu_club_reviews_v5";
const safeWindow = typeof window !== "undefined" ? window : null;
const load = () => {
  if (!safeWindow) return [];
  try {
    const v = JSON.parse(safeWindow.localStorage.getItem(REVIEWS_KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};
const save = (v) => {
  if (!safeWindow) return;
  try { safeWindow.localStorage.setItem(REVIEWS_KEY, JSON.stringify(v)); } catch {}
};

/* ---------- Stars ---------- */
function StarRating({ value, onChange, idPrefix="rating", readOnly=false }) {
  const stars = [1,2,3,4,5];
  return (
    <fieldset className={`stars ${readOnly ? "stars--readonly" : ""}`}>
      {!readOnly && <legend className="sr-only">Rate 1 to 5</legend>}
      <div className="stars-row" role="radiogroup" aria-label="Rating">
        {stars.map(n => {
          const id = `${idPrefix}-${n}`;
          return readOnly ? (
            <span key={n} className={`star ${n <= value ? "is-on" : ""}`} aria-hidden>★</span>
          ) : (
            <label key={n} htmlFor={id} className="star-label" aria-label={`${n} star${n>1?"s":""}`}>
              <input
                id={id}
                type="radio"
                name={idPrefix}
                value={n}
                checked={Number(value)===n}
                onChange={()=>onChange(n)}
              />
              <span className={`star ${n <= value ? "is-on" : ""}`} aria-hidden>★</span>
            </label>
          );
        })}
      </div>
      {!readOnly && <div className="stars-hint">{value ? `${value}/5` : "Select a rating"}</div>}
    </fieldset>
  );
}

export default function Blog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [reviews, setReviews] = useState(load);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(()=>save(reviews), [reviews]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(POSTS.map(p => p.category)))],
    []
  );

  const featured = useMemo(
    () => [...POSTS].sort((a,b)=>new Date(b.date)-new Date(a.date))[0],
    []
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return POSTS
      .filter(p => {
        const text = `${p.title} ${p.excerpt} ${p.category}`.toLowerCase();
        const catOK = cat === "All" || p.category === cat;
        return catOK && (!s || text.includes(s));
      })
      .sort((a,b)=> new Date(b.date) - new Date(a.date));
  }, [q, cat]);

  /* Reviews summary */
  const stats = useMemo(() => {
    const count = reviews.length;
    const avg = count ? reviews.reduce((s,r)=>s+r.rating,0)/count : 0;
    return { count, avg: Number(avg.toFixed(2)) };
  }, [reviews]);

  /* Submit review */
  const submit = async (e) => {
    e.preventDefault(); setError(""); setSuccess("");
    const errs=[];
    if(!name.trim()) errs.push("Please enter your name.");
    if(!rating) errs.push("Please select a rating.");
    if(!feedback.trim() || feedback.trim().length<10) errs.push("Please share at least 10 characters of feedback.");
    if(errs.length){ setError(errs.join(" ")); return; }

    const entry = {
      id: (safeWindow?.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`),
      name: name.trim(),
      rating,
      feedback: feedback.trim(),
      createdAt: new Date().toISOString(),
    };
    setLoading(true);
    await new Promise(r=>setTimeout(r,400));
    setReviews(prev=>[entry, ...prev]);
    setName(""); setRating(0); setFeedback("");
    setLoading(false); setSuccess("Thanks for your feedback! 🎉");
    setTimeout(()=>setSuccess(""), 2500);
  };

  const onImgError = (e) => { e.currentTarget.src = "/images/logo.jpg"; e.currentTarget.alt = "Club logo"; };

  return (
    <>
      {/* Hero */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <span className="hero-badge">Official Updates</span>
            <h1 className="cta-section-title">Blog & News</h1>
            <p className="cta-section-subtitle">Announcements, projects, and event highlights from I&amp;I.</p>
          </div>
        </div>
      </section>


      {/* Controls */}
      <div className="container blog-controls">
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
          </svg>
          <input
            className="blog-search"
            type="search"
            placeholder="Search posts…"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
          />
        </div>
        <select
          className="blog-filter"
          value={cat}
          onChange={(e)=>setCat(e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Grid */}
      <section className="blogs-section">
        <div className="container">
          <div className="blogs-grid">
            {filtered.map(p => (
              <article key={p.id} className="blog-card">
                <div className="blog-media">
                  <img src={p.cover} alt={p.title} loading="lazy" onError={onImgError} />
                </div>
                <div className="blog-body">
                  <span className="chip">{p.category}</span>
                  <h3 className="blog-title">
                    <Link to={`/blog/${p.id}`}>{p.title}</Link>
                  </h3>
                  <p className="blog-excerpt">{p.excerpt}</p>
                  <div className="blog-meta">
                    <time dateTime={p.date}>{new Date(p.date).toLocaleDateString()}</time>
                    <Link className="blog-read" to={`/blog/${p.id}`}>Read more →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews-section">
        <div className="container">
          <h2 className="section-title">Rate the Club</h2>

          <div className="two-col-stack">
            <div className="reviews-summary-card">
              <div className="summary-number">{stats.avg}</div>
              <StarRating value={Math.round(stats.avg)} readOnly />
              <div className="summary-caption">{stats.count} review{stats.count===1?"":"s"}</div>
            </div>

            <div className={`reviews-form ${loading ? "is-loading" : ""}`}>
              <h3 className="reviews-form-title">Leave a Review</h3>
              {success && <div className="alert success" role="status">{success}</div>}
              {error && <div className="alert error" role="alert">{error}</div>}

              <form onSubmit={submit} noValidate>
                <div className="field">
                  <label htmlFor="revName">Your Name *</label>
                  <input
                    id="revName"
                    type="text"
                    placeholder="e.g., Priya"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label>Rating *</label>
                  <StarRating value={rating} onChange={setRating} idPrefix="clubRating" />
                </div>
                <div className="field">
                  <label htmlFor="revText">Your Feedback *</label>
                  <textarea
                    id="revText"
                    rows={4}
                    maxLength={800}
                    placeholder="What did you like? What could be better?"
                    value={feedback}
                    onChange={(e)=>setFeedback(e.target.value)}
                    required
                  />
                  <div className="char-count">{feedback.length}/800</div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Submitting…" : "Submit Review"}
                </button>
              </form>
            </div>
          </div>

          <div className="reviews-list">
            <h3 className="reviews-list-title">Recent Feedback</h3>
            {reviews.length===0 ? (
              <p className="muted">No reviews yet — be the first!</p>
            ) : (
              <ul className="review-items">
                {reviews.map(r=>(
                  <li key={r.id} className="review-item">
                    <div className="review-head">
                      <strong className="reviewer">{r.name}</strong>
                      <StarRating value={r.rating} readOnly />
                    </div>
                    <p className="review-text">{r.feedback}</p>
                    <time className="review-date" dateTime={r.createdAt}>
                      {new Date(r.createdAt).toLocaleString()}
                    </time>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
