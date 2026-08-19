// src/pages/Blog.jsx

import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { POSTS } from "../data/posts";
import "../Styles/Join.css";
import "../Styles/Blog.css";
import { api } from "../apiClient";

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

  const onImgError = (e) => { e.currentTarget.src = "/images/logo.jpg"; };

  /* — Publish Form — */
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Announcements");
  const [cover, setCover] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  /** NEW 📌 */
  const publish = async (e) => {
    e.preventDefault();
    setNotice("");

    if (!title.trim() || !author.trim() || !body.trim()) {
      setNotice("Title, Author and Full Post are required.");
      return;
    }

    const payload = {
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      cover: cover.trim() || "",
      summary: summary.trim() || "",
      body: body.trim(),
    };

    setSubmitting(true);

    try {
      // Save to backend DB + send email ✔
      await api.post("/forms/blog-submission", payload);

      // Also save locally to show immediately ✔
      const newPost = {
        id: `user-${uuid()}`,
        ...payload,
        excerpt:
          summary.trim() ||
          (body.trim().slice(0, 120) +
            (body.trim().length > 120 ? "…" : "")),
        date: new Date().toISOString(),
      };

      setUserPosts((prev) => [newPost, ...prev]);

      // Reset form
      setTitle("");
      setAuthor("");
      setCategory("Announcements");
      setCover("");
      setSummary("");
      setBody("");

      setNotice("✅ Published! Your post has been submitted.");
      setTimeout(() => setNotice(""), 3000);

    } catch (err) {
      console.error(err);
      setNotice("❌ Error submitting your post. Please try again later.");
    }

    setSubmitting(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <span className="hero-badge">Official Updates</span>
            <h1 className="cta-section-title">Blog & News</h1>
            <p className="cta-section-subtitle">
              Announcements, projects, and event highlights from I&I.
            </p>
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className="container blog-controls">
        <div className="search-wrap">
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

      {/* Publish Form */}
      <section className="publish-section">
        <div className="container">
          <div className="publish-shell">
            <h2 className="publish-title">
              <span className="gradient-text">Ready to Publish?</span>
            </h2>

            <div className="publish-card">
              {notice && <div className="alert success">{notice}</div>}

              <form onSubmit={publish} className="publish-form" noValidate>
                <div className="row-2">
                  <div className="field">
                    <label>Title *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={e=>setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field">
                    <label>Author *</label>
                    <input
                      type="text"
                      value={author}
                      onChange={e=>setAuthor(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row-2">
                  <div className="field">
                    <label>Category *</label>
                    <select
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
                    <label>Cover URL</label>
                    <input
                      type="url"
                      value={cover}
                      onChange={e=>setCover(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Short Summary</label>
                  <textarea
                    rows={3}
                    value={summary}
                    onChange={e=>setSummary(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Full Post *</label>
                  <textarea
                    rows={8}
                    value={body}
                    onChange={e=>setBody(e.target.value)}
                    required
                  />
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
