// src/components/JoinForm.jsx
import { useEffect, useMemo, useState } from "react";
import "./JoinForm.css";

/**
 * JoinForm
 * - A fully responsive, branded application form with validation, interest selection,
 *   and localStorage to prevent duplicate submissions.
 * - Honeypot field used for spam protection.
 * - Includes success and error banners.
 */
const INTERESTS = [
  { value: "ai-ml", label: "AI/Machine Learning" },
  { value: "web-dev", label: "Web Development" },
  { value: "mobile-apps", label: "Mobile Apps" },
  { value: "blockchain", label: "Blockchain" },
  { value: "iot", label: "Internet of Things" },
  { value: "design", label: "UI/UX Design" },
];

const STORAGE_KEY = "cqu_join_submissions";

export default function JoinForm() {
  // Controlled input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [interests, setInterests] = useState([]);

  // Submission states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Honeypot field (hidden); bots may fill it in
  const [nickname, setNickname] = useState("");

  // Derived state: character count for about textarea
  const charCount = useMemo(() => about.length, [about]);
  const maxChars = 500;

  // Focus first field on mount
  useEffect(() => {
    document.getElementById("name")?.focus();
  }, []);

  // Toggle interest selection
  const toggleInterest = (val) => {
    setInterests((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  // Simple email validation
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Retrieve and store emails in localStorage to prevent duplicates
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    const errs = [];
    if (!name || name.trim().length < 2) errs.push("Please enter a valid name.");
    if (!email || !validateEmail(email)) errs.push("Please enter a valid email address.");
    if (!major) errs.push("Please select your major.");
    if (!location) errs.push("Please select your location.");

    // Honeypot triggered
    if (nickname.trim()) {
      errs.push("Submission flagged. Please try again.");
    }

    // Duplicate prevention
    const normalizedEmail = (email || "").trim().toLowerCase();
    const already = getSavedEmails().includes(normalizedEmail);
    if (already) {
      errs.push("This email has already submitted the form. We’ll be in touch soon!");
    }

    // Stop submission if errors
    if (errs.length) {
      setError(errs.join(" "));
      return;
    }

    // Compose payload (would send to API)
    const payload = {
      name,
      email: normalizedEmail,
      major,
      location,
      interests,
      about,
    };
    console.log("Form data:", payload);

    // Simulate network submission
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200)); // simulate delay
      saveEmail(normalizedEmail);

      // Show success and reset form
      setSuccess(true);
      setName("");
      setEmail("");
      setMajor("");
      setLocation("");
      setInterests([]);
      setAbout("");
      setNickname("");

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

          {/* Show success or error banners */}
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

          {/* Main form */}
          <form
            className="join-form"
            id="joinForm"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="on"
          >
            {/* Honeypot field (hidden from users) */}
            <div className="hp" aria-hidden="true">
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

            {/* Controlled input fields */}
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
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="abcd@cqumail.com.au"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                inputMode="email"
              />
            </div>

            {/* Academic major select */}
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

            {/* Location select */}
            <div className="form-group">
              <label htmlFor="location">Preferred Location *</label>
              <select
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                autoComplete="address-level2" // city/suburb
              >
                <option value="">Select your location</option>
                <option value="sydney">Sydney</option>
                <option value="melbourne">Melbourne</option>
                <option value="rockhampton">Rockhampton</option>
                <option value="brisbane">Brisbane</option>
                <option value="cairns">Cairns</option>
                <option value="adelaide">Adelaide</option>
              </select>
            </div>

            {/* Interests checkboxes grid */}
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

            {/* About textarea with character counter */}
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
                autoComplete="on"
              />
              <div className="character-counter">
                {charCount} / {maxChars} characters
              </div>
            </div>

            {/* Submit button */}
            <button type="submit" className="join-submit-btn" id="submitBtn" disabled={loading}>
              {loading ? "Submitting..." : "Join CQU Innovation Community"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
