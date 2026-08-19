import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styles/Home.css";
import "../Styles/overall-style.css";
import BootcampModal from "../components/BootCampForm";
import { api } from "../apiClient";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState("");

  // Prevent scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isModalOpen]);

  /* 📌 NEW: Handler to submit bootcamp form to API */
  const handleBootcampSubmit = async (payload) => {
    try {
      console.log("Submitting workshop application:", payload);

      await api.post("/forms/bootcamp", payload); // backend call

      setNotice("🎉 Application submitted! Check your email soon.");
      setTimeout(() => setNotice(""), 3500);
    } catch (err) {
      console.error(err);
      setNotice("❌ Error submitting application. Please try again.");
      setTimeout(() => setNotice(""), 4000);
    }
  };

  return (
    <>
      {/* Notice message at top of page */}
      {notice && (
        <div className="alert success" style={{ textAlign: "center", margin: "1rem auto" }}>
          {notice}
        </div>
      )}

      {/* ====================== CTA (Hero) ====================== */}
      <section className="cta-section" id="intro">
        <div className="container">
          <div className="cta-grid">
            <div className="cta-media">
              <video
                src="public/videos/intro.mp4"
                controls
                playsInline
                preload="metadata"
                poster="/images/bootcamp2.jpg"
              />
            </div>

            <div className="cta-content">
              <div className="cta-section-title">Ready to Start Your Innovation Journey?</div>

              <div className="cta-section-subtitle">
                Join a community where your ideas matter, skills grow, and future is shaped
                with innovation.
              </div>

              <div className="cta-buttons">
                <Link className="startup-cta primary" to="/join">Become a Member</Link>
                <Link className="startup-cta secondary" to="/projects">Explore Our Work</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== About ====================== */}
      <section className="about-section">
        <div className="container">
          <h1 className="section-title">About CQU Initiation and Innovation</h1>

          <div className="club-introduction intro-card">
            <div className="intro-grid">
              <div className="intro-body">
                <h2>Society for Computer Enthusiasts, by Computer Geeks</h2>
                <p className="intro-lead">
                  A thriving community where curiosity and collaboration spark real innovation.
                </p>
                <p className="intro-lead">
                  Learn, build and innovate together — one project at a time.
                </p>
              </div>

              <figure className="intro-media">
                <img src="/images/bootcamp2.jpg" alt="Innovation hub" loading="lazy" />
              </figure>
            </div>
          </div>

          {/* Mission / Vision / Values */}
          <div className="mission-vision-values">
            <div className="mission-section mvv-card">
              <figure className="mvv-media">
                <img src="/images/bootcamp1.jpg" alt="Mission action" loading="lazy" />
              </figure>
              <div className="mvv-body">
                <h2>Our Mission</h2>
                <p>Build meaningful tech solutions together.</p>
              </div>
            </div>

            <div className="vision-section mvv-card mvv-reverse">
              <figure className="mvv-media">
                <img src="/images/bootcamp3.jpg" alt="Vision future" loading="lazy" />
              </figure>
              <div className="mvv-body">
                <h2>Our Vision</h2>
                <p>Become a launchpad for tech creativity and innovation.</p>
              </div>
            </div>

            <div className="values-section">
              <h3>Our Core Values</h3>
              <div className="values-grid">
                <div className="value-item"><div className="value-icon">🚀</div><h4>Innovation</h4></div>
                <div className="value-item"><div className="value-icon">🤝</div><h4>Collaboration</h4></div>
                <div className="value-item"><div className="value-icon">🔥</div><h4>Impact</h4></div>
                <div className="value-item"><div className="value-icon">💡</div><h4>Learning</h4></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop CTA */}
      <section className="feature-spotlight feature-bootcamp">
        <div className="container">
          <div className="feature-grid">

            <figure className="feature-media">
              <video
                className="feature-video"
                controls
                preload="metadata"
                poster="/images/bootcamp3.jpg"
              >
                <source src="public/videos/bootcamp.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </figure>

            <div className="feature-content">
              <h2 className="section-title">Club Workshop: Build • Ship • Showcase</h2>
              <p className="feature-subtitle">4-week sprint • Mentors • Demo Day</p>

              <ul className="feature-list">
                <li>Web Dev, AI/ML, IoT & more</li>
                <li>Weekly team check-ins</li>
                <li>Showcase your project on Demo Day</li>
              </ul>

              {/* New Modal Trigger */}
              <button className="startup-cta primary" onClick={() => setModalOpen(true)}>
                Apply for Workshop
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 🆕 Bootcamp Modal w/ real backend submit */}
      <BootcampModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleBootcampSubmit}
      />
    </>
  );
}
