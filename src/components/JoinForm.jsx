import { useEffect, useMemo, useState } from "react";
import "./JoinForm.css";

const INTERESTS = [
  { value: "ai-ml", label: "AI/Machine Learning" },
  { value: "web-dev", label: "Web Development" },
  { value: "mobile-apps", label: "Mobile Apps" },
  { value: "blockchain", label: "Blockchain" },
  { value: "iot", label: "Internet of Things" },
  { value: "design", label: "UI/UX Design" },
];

const STORAGE_KEY = "cqu_join_submissions"; // stores an array of submitted emails (lowercased)

export default function JoinForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [about, setAbout] = useState("");
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Honeypot (bots fill this, humans don't see it)
  const [nickname, setNickname] = useState("");

  const charCount = useMemo(() => about.length, [about]);
  const maxChars = 500;

  useEffect(() => {
    document.getElementById("name")?.focus();
  }, []);

  const toggleInterest = (val) => {
    setInterests((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // helpers for localStorage
  const getSavedEmails = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const saveEmail = (e) => {
    try {
      const list = getSavedEmails();
      if (!list.includes(e)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...list, e]));
      }
    } catch {
      /* ignore storage write errors */
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // simple validation
    const errs = [];
    if (!name || name.trim().length < 2) errs.push("Please enter a valid name.");
    if (!email || !validateEmail(email)) errs.push("Please enter a valid email address.");
    if (!major) errs.push("Please select your major.");

    // honeypot check
    if (nickname.trim()) {
      errs.push("Submission flagged. Please try again.");
    }

    // block duplicate by email (case-insensitive)
    const normalizedEmail = (email || "").trim().toLowerCase();
    const already = getSavedEmails().includes(normalizedEmail);
    if (already) {
      errs.push("This email has already submitted the form. We’ll be in touch soon!");
    }

    if (errs.length) {
      setError(errs.join(" "));
      return;
    }

    const payload = { name, email: normalizedEmail, major, interests, about };
    console.log("Form data:", payload);

    try {
      setLoading(true);

      // TODO: replace with your real API call
      // await fetch('/api/join', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });

      await new Promise((r) => setTimeout(r, 1200));

      // mark email as used
      saveEmail(normalizedEmail);

      setSuccess(true);
      // reset visible fields
      setName("");
      setEmail("");
      setMajor("");
      setInterests([]);
      setAbout("");
      setNickname("");

      // hide success after 5s
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="join-form-section" id="join">
      <div className="container">
        <div className={`join-form-container ${loading ? "loading" : ""}`}>
          <div className="form-header">
            <h2>Ready to Get Started?</h2>
            <p>Fill out this application and we'll connect you with our innovation community</p>
          </div>

          {success && (
            <div className="success-message" role="status">
              🎉 Welcome to CQU Innovation! We'll be in touch within 24 hours.
            </div>
          )}

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <form className="join-form" id="joinForm" onSubmit={handleSubmit} noValidate>
            {/* Honeypot field (hidden) */}
            <div className="hp">
              <label htmlFor="nickname">Nickname</label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="major">Academic Major *</label>
              <select
                id="major"
                name="major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                required
              >
                <option value="">Select your major</option>
                <option value="computer-science">Computer Science</option>
                <option value="software-engineering">Software Engineering</option>
                <option value="information-technology">Information Technology</option>
                <option value="data-science">Data Science</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="other-engineering">Other Engineering</option>
                <option value="business">Business/Entrepreneurship</option>
                <option value="design">Design & Creative</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Areas of Interest</label>
              <div className="interest-grid">
                {INTERESTS.map((opt) => {
                  const checked = interests.includes(opt.value);
                  return (
                    <label
                      key={opt.value}
                      className={`interest-item ${checked ? "selected" : ""}`}
                    >
                      <input
                        type="checkbox"
                        name="interests"
                        value={opt.value}
                        checked={checked}
                        onChange={() => toggleInterest(opt.value)}
                      />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="about">Tell Us About Yourself</label>
              <textarea
                id="about"
                name="about"
                rows={4}
                placeholder="What projects have you worked on? What are you passionate about? What do you want to build with us?"
                value={about}
                maxLength={maxChars}
                onChange={(e) => setAbout(e.target.value)}
              />
              <div className="character-counter">
                {charCount} / {maxChars} characters
              </div>
            </div>

            <button type="submit" className="join-submit-btn" id="submitBtn" disabled={loading}>
              {loading ? "Submitting..." : "Join CQU Innovation Community"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
