// src/pages/Blog.jsx
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { POSTS } from "../data/posts";
import "../Styles/Join.css";
import "../Styles/Blog.css";

/* ---------- LocalStorage for user-submitted posts ---------- */
const USER_POSTS_KEY = "cqu_club_user_posts_v1";
const safeWindow = typeof window !== "undefined" ? window : null;

const loadUserPosts = () => {
  if (!safeWindow) return [];
  try {
    const v = JSON.parse(safeWindow.localStorage.getItem(USER_POSTS_KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch { return []; }
};
const saveUserPosts = (arr) => {
  if (!safeWindow) return;
  try { safeWindow.localStorage.setItem(USER_POSTS_KEY, JSON.stringify(arr)); } catch {}
};
const uuid = () =>
  (safeWindow?.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`).toString();

export default function Blog() {
  /* — Filters — */
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  /* — Posts — */
  const [userPosts, setUserPosts] = useState(loadUserPosts);
  useEffect(() => saveUserPosts(userPosts), [userPosts]);

  const categories = useMemo(() => {
    const builtIn = POSTS.map(p => p.category);
    const user = userPosts.map(p => p.category);
    return ["All", ...Array.from(new Set([...builtIn, ...user]))];
  }, [userPosts]);

  const allPosts = useMemo(
    () => [...userPosts, ...POSTS].sort((a,b)=> new Date(b.date)-new Date(a.date)),
    [userPosts]
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return allPosts.filter(p => {
      const text = `${p.title} ${p.excerpt} ${p.category} ${p.body || ""}`.toLowerCase();
      const catOK = cat === "All" || p.category === cat;
      return catOK && (!s || text.includes(s));
    });
  }, [q, cat, allPosts]);

  const onImgError = (e) => { e.currentTarget.src = "/images/logo.jpg"; e.currentTarget.alt = "Club logo"; };

  /* — Publish Form — */
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Announcements");
  const [cover, setCover] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  const publish = async (e) => {
    e.preventDefault();
    setNotice("");

    if (!title.trim() || !author.trim() || !body.trim()) {
      setNotice("Title, Author and Full Post are required.");
      return;
    }

    const newPost = {
      id: `user-${uuid()}`,
      title: title.trim(),
      author: author.trim(),
      category: category.trim() || "Announcements",
      cover: cover.trim() || "/images/logo.jpg",
      excerpt: summary.trim() || (body.trim().slice(0, 120) + (body.trim().length > 120 ? "…" : "")),
      body: body.trim(),
      date: new Date().toISOString(),
    };

    setSubmitting(true);
    await new Promise(r => setTimeout(r, 250));
    setUserPosts(prev => [newPost, ...prev]);

    setTitle(""); setAuthor(""); setCategory("Announcements");
    setCover(""); setSummary(""); setBody("");
    setSubmitting(false);
    setNotice("✅ Published! Your post now appears above.");
    setTimeout(()=>setNotice(""), 2500);
  };

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

      {/* Posts */}
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

      {/* Publish — outer frame + inner card */}
      <section className="publish-section">
        <div className="container">
          <div className="publish-shell">
            <h2 className="publish-title">
              <span className="gradient-text">Ready to Publish?</span>
            </h2>
            <p className="publish-subtitle">
              Complete the form below to share your blog post with our community.
              Once submitted, it will appear in the list above for everyone to explore.
            </p>

            <div className="publish-card">
              {notice && <div className="alert success" role="status">{notice}</div>}

              <form onSubmit={publish} className="publish-form" noValidate>
                {/* Row 1 */}
                <div className="row-2">
                  <div className="field">
                    <label htmlFor="bTitle">Title *</label>
                    <input
                      id="bTitle"
                      type="text"
                      placeholder="Enter your blog title"
                      value={title}
                      onChange={e=>setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="bAuthor">Author *</label>
                    <input
                      id="bAuthor"
                      type="text"
                      placeholder="Your full name"
                      value={author}
                      onChange={e=>setAuthor(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="row-2">
                  <div className="field">
                    <label htmlFor="bCat">Category *</label>
                    <select
                      id="bCat"
                      value={category}
                      onChange={e=>setCategory(e.target.value)}
                      required
                    >
                      <option>Announcements</option>
                      <option>Workshops</option>
                      <option>Projects</option>
                      <option>Events</option>
                      <option>Tips & Guides</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="bCover">Cover Image URL (optional)</label>
                    <input
                      id="bCover"
                      type="url"
                      placeholder="https://…/cover.jpg"
                      value={cover}
                      onChange={e=>setCover(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="bSummary">Short Summary (optional)</label>
                  <textarea
                    id="bSummary"
                    rows={3}
                    maxLength={240}
                    placeholder="One or two lines describing your post."
                    value={summary}
                    onChange={e=>setSummary(e.target.value)}
                  />
                  <div className="char-count">{summary.length}/240</div>
                </div>

                <div className="field">
                  <label htmlFor="bBody">Full Post *</label>
                  <textarea
                    id="bBody"
                    rows={8}
                    maxLength={10000}
                    placeholder="Write your full content here…"
                    value={body}
                    onChange={e=>setBody(e.target.value)}
                    required
                  />
                  <div className="char-count">{body.length}/10000</div>
                </div>

                <button type="submit" className="btn publish-btn" disabled={submitting}>
                  {submitting ? "Publishing…" : "Publish Blog"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
