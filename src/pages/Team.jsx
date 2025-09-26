// src/pages/Team.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import "../Styles/Join.css";   // reuse your hero + shared section styles
import "../Styles/Team.css";   // team-specific styles (grid, modal, search)
import "../Styles/overall-style.css";

/**
 * Team Page (search + socials + modal)
 * - Search by name, role, or campus (location).
 * - LinkedIn + Gmail on each card.
 * - Click a card to open an accessible modal with more details.
 */

const TEAMS = [
  {
    location: "Sydney",
    statement:
      "Founding campus team driving programs, recruitment, and club operations.",
    members: [
      {
        name: "Sahisa Sunuwar",
        role: "President",
        email: "sahisa.sunuwar@cqumail.com",
        linkedin: "https://www.linkedin.com/in/sahisa-sunuwar-6506a4212/",
        avatar: "public/images/team/sahisa_sunuwar.jpg",
        bio: "As the President of the CQUniversity Initiation & Innovation Computer Club, I am dedicated to fostering a community where creativity, technology, and collaboration come together. My role is to guide our club's vision-supporting students in exploring emerging technologies, working on hands-on projects, and building real-world skills that extend beyond the classroom.",
      },
      {
        name: "Loojaw Manandhar",
        role: "Vice President",
        email: "loojaw.manandhar@cqumail.com",
        linkedin: "https://www.linkedin.com/in/loojaw-manandhar-665326363/",
        avatar: "public/images/team/loojaw_manandhar.jpg",
        bio: "I am Loojaw Manandhar, pursuing a Bachelor of IT and serving as IT Club Vice President. I support executive leadership and facilitate organizational operations. My responsibilities include assisting with strategic planning, coordinating events, and supervising committee functions. I collaborate with the executive team on policy development and member engagement programs. I also lead meetings when needed, manage project implementation, and ensure effective communication between leadership and members to maintain operational excellence.",
      },
      {
        name: "Jatin Shrestha",
        role: "Vice President",
        email: "jatin.shrestha@cqumail.com",
        linkedin: "https://www.linkedin.com/in/jatin-s-70443b13a/",
        avatar: "public/images/team/jatin_shrestha.jpg",
        bio: "I am Jatin Shrestha, pursuing a Bachelor of IT and serving as IT Club Vice President. I support executive leadership and facilitate organizational operations. My responsibilities include assisting with strategic planning, coordinating events, and supervising committee functions. I collaborate with the executive team on policy development and member engagement programs. I also lead meetings when needed, manage project implementation, and ensure effective communication between leadership and members to maintain operational excellence.",
      },
      {
        name: "Prajita Bhandari",
        role: "Treasurer",
        email: "prajita.bhandari@cqumail.com",
        linkedin: "https://www.linkedin.com/",
        avatar: "public/images/team/prajita_bhandari.jpg",
        bio: "As the Treasurer of the CQUniversity Initiation & Innovation Computer Club, I am committed to ensuring the financial health and sustainability of our initiatives. My role focuses on managing budgets, securing resources, and maintaining transparent financial practices—empowering our club to support innovative projects, organize impactful events, and provide opportunities for students to grow their skills beyond the classroom.",
      },
      {
        name: "Tahnik Khan",
        role: "Secretary",
        email: "tahnik.khan@cqumail.com",
        linkedin: "https://www.linkedin.com/in/tahnik92345/",
        avatar: "public/images/team/tahnik_khan.jpg",
        bio: "Hello, I'm Tahnik Khan, a Bachelor of IT student and secretary of the IT Club. I ensure effective communication and maintain accurate records for our organization. My responsibilities include managing official documents, recording meeting minutes, and organizing records on our Teams channel. I collaborate with the president and vice president to notify members of meetings, events, and deadlines. I also assist with meeting agenda preparation and ensure timely, clear communication of important information.",
      },
      {
        name: "Sahil Shrestha",
        role: "Marketing Team",
        email: "sahil.basnet@cqumail.com",
        linkedin: "https://www.linkedin.com/in/sahil-basnet-2a6071306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app ",
        avatar: "public/images/team/sahil_shrestha.jpg",
        bio: "I’m Sahil Basnet, a member of the CQinitiation Marketing Team and a Bachelor of Information Technology student majoring in Cybersecurity at Central Queensland University. I have a strong interest in network security, ethical hacking, and cloud security. Alongside my studies, I contribute to digital marketing and outreach efforts at CQinitiation, where I help promote student engagement and awareness.",
      },
      {
        name: "Neha Thanait",
        role: "Marketing Team",
        email: "neha.thanait@cqumail.com",
        linkedin: "https://www.linkedin.com/in/neha-thanait-b58b5b270?trk=contact-info ",
        avatar: "public/images/team/neha_thanait.jpg",
        bio: "I’m Neha Thanait, currently pursuing a Bachelor of Information Technology with a major in Cybersecurity at Central Queensland University. My interests lie in penetration testing, digital forensics, and cloud security, where I enjoy exploring practical ways to strengthen systems against evolving cyber threats. I’m motivated to expand my skills through projects, research, and collaboration, with the goal of building a career that contributes to a safer digital world.",
      },
      {
        name: "Prasuna Shrestha",
        role: "Marketing Team",
        email: "prasuna.shrestha@cqumail.com",
        linkedin: "https://www.linkedin.com/in/prasuna-stha-9ba029324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        avatar: "public/images/team/prasuna_shrestha.jpg",
        bio: "Storytelling and event promotion.",
      },
    ],
  },
  {
    location: "Rockhampton",
    statement:
      "Local leadership is forming. If you’re keen to help kickstart initiatives, reach out!",
    members: [
      {
        name: "Anshul Bairy",
        role: "Prseident",
        email: "anshul.bairy@cqumail.com",
        linkedin: "",
        avatar: "public/images/team/anshul_bairy.jpg",
        bio: "",
      },
      {
        name: "Ben Woods",
        role: "President",
        email: "ben.woods@cqumail.com",
        linkedin: "",
        avatar: "public/images/team/ben_woods.jpg",
        bio: "",
      },
    ],
  },
];

function SocialIconLink({ href, label, icon }) {
  if (!href) return null;
  return (
    <a
      href={href}
      className="social-btn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={(e) => e.stopPropagation()} // don't trigger card click
    >
      <img src={icon} alt="" aria-hidden="true" />
    </a>
  );
}

export default function Team() {
  // Search
  const [query, setQuery] = useState("");
  const handleClearQuery = () => setQuery("");

  // Modal
  const [active, setActive] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const closeModal = useCallback(() => setActive(null), []);

  // Flattened list for searching
  const allMembers = useMemo(
    () =>
      TEAMS.flatMap((c) =>
        c.members.map((m) => ({ ...m, campus: c.location }))
      ),
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allMembers.filter((m) =>
      [m.name, m.role, m.campus]
        .filter(Boolean)
        .some((f) => f.toLowerCase().includes(q))
    );
  }, [allMembers, query]);

  // Close modal on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

  // Lock background scroll when modal open
  useEffect(() => {
    if (active) {
      setScrollY(window.scrollY);
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    }
  }, [active, scrollY]);

  return (
    <>
      {/* ===== Hero (reusing Join/Home styles) ===== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <span className="hero-badge">Meet the People Behind the Club</span>
            <h1 className="cta-section-title">Our Team</h1>
            <p className="cta-section-subtitle">
              Builders and organizers across CQU campuses — Sydney today, with Rockhampton and more locations next.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Search bar ===== */}
      <div className="container">
        <div className="team-searchbar">
          <label htmlFor="teamSearch" className="sr-only">
            Find team members quickly and easily.
          </label>

          <div className="search-input-wrap">
            {/* search icon */}
            <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"></path>
            </svg>

            <input
              id="teamSearch"
              type="search"
              className="search-input"
              placeholder="Search name, location, or role…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />

            {query && (
              <button
                type="button"
                className="clear-btn"
                aria-label="Clear search"
                onClick={handleClearQuery}
              >
                ×
              </button>
            )}
          </div>

          {/* live result count for a11y */}
          <div className="search-meta" aria-live="polite">
            {query ? `${results.length} result${results.length === 1 ? "" : "s"} found` : " "}
          </div>
        </div>
      </div>

      {/* ===== Results (when searching) ===== */}
      {query ? (
        <section className="team-section">
          <div className="container">
            <h2 className="section-title">Search Results</h2>

            {results.length === 0 ? (
              <div className="team-empty">
                <p>No team members match “{query}”.</p>
              </div>
            ) : (
              <div className="team-grid" role="list">
                {results.map((m) => {
                  const mailto = m.email ? `mailto:${m.email}` : "";
                  return (
                    <article
                      key={`result-${m.campus}-${m.name}`}
                      className="member-card"
                      role="listitem"
                      tabIndex={0}
                      onClick={() => setActive(m)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActive(m);
                        }
                      }}
                      aria-label={`${m.name}, ${m.role} (${m.campus}). Open details`}
                    >
                      <div className="member-avatar-wrap">
                        <img
                          src={m.avatar}
                          alt=""
                          className="member-avatar"
                          loading="lazy"
                          width="128"
                          height="128"
                        />
                      </div>

                      <div className="member-meta">
                        <h3 className="member-name">{m.name}</h3>
                        <p className="member-role">
                          <span className="role-badge">{m.role}</span>
                          <span className="campus-tag">{m.campus}</span>
                        </p>
                      </div>

                      <div className="member-socials" aria-label={`${m.name} contact links`}>
                        <SocialIconLink
                          href={m.linkedin}
                          label={`${m.name} on LinkedIn`}
                          icon="public/images/linkedin.png"
                        />
                        <SocialIconLink
                          href={mailto}
                          label={`Email ${m.name}`}
                          icon="public/images/gmail.png"
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      ) : (
        /* ===== Default view (grouped by campus) ===== */
        TEAMS.map((campus) => (
          <section className="team-section" key={campus.location}>
            <div className="container">
              <div className="team-section-head">
                <h2 className="section-title">{campus.location}</h2>
                {campus.statement && <p className="section-blurb">{campus.statement}</p>}
              </div>

              {campus.members.length === 0 ? (
                <div className="team-empty">
                  <span className="role-badge">Recruiting</span>
                  <p>We’re assembling the core team here. Want to help shape the chapter?</p>
                </div>
              ) : (
                <div className="team-grid" role="list">
                  {campus.members.map((m) => {
                    const mailto = m.email ? `mailto:${m.email}` : "";
                    const withCampus = { ...m, campus: campus.location };
                    return (
                      <article
                        key={`${campus.location}-${m.name}`}
                        className="member-card"
                        role="listitem"
                        tabIndex={0}
                        onClick={() => setActive(withCampus)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setActive(withCampus);
                          }
                        }}
                        aria-label={`${m.name}, ${m.role}. Open details`}
                      >
                        <div className="member-avatar-wrap">
                          <img
                            src={m.avatar}
                            alt=""
                            className="member-avatar"
                            loading="lazy"
                            width="128"
                            height="128"
                          />
                        </div>

                        <div className="member-meta">
                          <h3 className="member-name">{m.name}</h3>
                          <p className="member-role">
                            <span className="role-badge">{m.role}</span>
                          </p>
                        </div>

                        <div className="member-socials" aria-label={`${m.name} contact links`}>
                          <SocialIconLink
                            href={m.linkedin}
                            label={`${m.name} on LinkedIn`}
                            icon="/images/linkedin.png"
                          />
                          <SocialIconLink
                            href={mailto}
                            label={`Email ${m.name}`}
                            icon="/images/gmail.png"
                          />
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        ))
      )}

      {/* ===== Modal (member details) ===== */}
      {active && (
        <div
          className="member-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} details`}
          onClick={closeModal}
        >
          <div className="member-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Close details" onClick={closeModal}>
              ×
            </button>

            <div className="modal-header">
              <div className="member-avatar-wrap lg">
                <img
                  src={active.avatar}
                  alt=""
                  className="member-avatar"
                  loading="eager"
                  width="160"
                  height="160"
                />
              </div>
              <div className="modal-title-wrap">
                <h3 className="modal-name">{active.name}</h3>
                <p className="modal-role">
                  <span className="role-badge">{active.role}</span>
                  <span className="campus-tag">{active.campus}</span>
                </p>
              </div>
            </div>

            <div className="modal-body">
              <p className="modal-bio">{active.bio || "More details coming soon."}</p>

              <div className="modal-actions">
                {active.linkedin && (
                  <a
                    className="btn btn-primary"
                    href={active.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View LinkedIn
                  </a>
                )}
                {active.email && (
                  <a className="btn btn-secondary" href={`mailto:${active.email}`}>
                    Email {active.name.split(" ")[0]}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
