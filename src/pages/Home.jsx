import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styles/Home.css";
import BootcampModal from "../components/BootCampForm";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isModalOpen]);

  return (
    <>
      {/* ===== CTA ===== */}
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
              <div className="cta-section-title">
                Ready to Start Your Innovation Journey?
              </div>
              <div className="cta-section-subtitle">
                Join a community where your ideas matter, your skills grow, and
                your impact extends beyond the classroom. Whether you're a
                beginner eager to learn or an experienced developer ready to
                mentor others, there's a place for you in our innovative
                ecosystem.
              </div>
              <div className="cta-buttons">
                <Link className="startup-cta primary" to="/join">
                  Become a Member
                </Link>
                <Link className="startup-cta secondary" to="/projects">
                  Explore Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">About CQU Initiation and Innovation</h2>

          <div className="club-introduction intro-card">
            <div className="intro-grid">
              <div className="intro-body">
                <h1>Society for Computer Enthusiasts, by Computer Geeks</h1>
                <p className="intro-lead">
                  Welcome to Initiation & Innovation, a thriving community of
                  computer enthusiasts dedicated to learning, growing, and
                  innovating together.
                </p>
                <p className="intro-lead">
                  We intersect at the crossroads of curiosity and
                  collaboration. Initiate individually and innovate
                  together—through projects, blogs, and interactive sessions
                  that spark real outcomes.
                </p>
              </div>

              <figure className="intro-media">
                <img
                  src="/images/bootcamp2.jpg"
                  alt="CQU students collaborating in the innovation hub"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>

          {/* Mission / Vision / Values */}
          <div className="mission-vision-values">
            <div className="mission-section mvv-card">
              <figure className="mvv-media">
                <img
                  src="/images/bootcamp1.jpg"
                  alt="Team ideating—mission in action"
                  loading="lazy"
                />
              </figure>
              <div className="mvv-body">
                <h2>Our Mission</h2>
                <p>
                  Foster a vibrant community that collaborates, learns, and
                  innovates—sharing knowledge and building creative solutions
                  that push the boundaries of computing.
                </p>
              </div>
            </div>

            <div className="vision-section mvv-card mvv-reverse">
              <figure className="mvv-media">
                <img
                  src="/images/bootcamp3.jpg"
                  alt="Futuristic skyline—forward vision"
                  loading="lazy"
                />
              </figure>
              <div className="mvv-body">
                <h2>Our Vision</h2>
                <p>
                  Be a hub where passion for technology flourishes and the
                  future of computing is shaped through curiosity,
                  collaboration, and creativity.
                </p>
              </div>
            </div>

            <div className="values-section">
              <h3>Our Core Values</h3>
              <div className="values-grid">
                <div className="value-item">
                  <div className="value-icon">🚀</div>
                  <h4>Innovation Excellence</h4>
                  <p>Explore emerging tech and push boundaries with creativity.</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🤝</div>
                  <h4>Collaborative Learning</h4>
                  <p>Grow together through open sharing and peer mentorship.</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🔥</div>
                  <h4>Real-World Impact</h4>
                  <p>Build meaningful solutions for real community challenges.</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">💡</div>
                  <h4>Continuous Growth</h4>
                  <p>Turn every challenge into a learning opportunity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Spotlight / Bootcamp ===== */}
      <section className="feature-spotlight feature-bootcamp">
        <div className="container">
          <div className="feature-grid">
            <figure className="feature-media">
              <video
                className="feature-video"
                controls
                playsInline
                preload="metadata"
                poster="/images/bootcamp3.jpg"
              >
                <source src="public/videos/bootcamp.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </figure>

            <div className="feature-content">
              <h2 className="section-title">Club Bootcamp: Build • Ship • Showcase</h2>
              <p className="feature-subtitle">
                In four weeks your team will scope, build, and demo a real
                product—with mentorship, code reviews, and feedback along the
                way.
              </p>

              <ul className="feature-list">
                <li>Weekly build sprints (Web, AI/ML, Mobile, IoT)</li>
                <li>Mentors from industry & alumni</li>
                <li>Demo Day showcase</li>
              </ul>

              <div className="feature-ctas">
                <button
                  className="startup-cta primary"
                  onClick={() => setModalOpen(true)}
                >
                  Apply for Bootcamp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bootcamp Modal (separate component) ===== */}
      <BootcampModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={() =>
          alert("Submitted! (Wire this to your backend later)")
        }
      />
    </>
  );
}
