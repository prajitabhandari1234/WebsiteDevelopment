// src/pages/Join.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import JoinForm from "../components/JoinForm";
import SocialConnect from "../components/SocialConnect";
import "../Styles/Join.css";
import "../Styles/overall-style.css";

/**
 * Join Page
 * - Displays the “Join Our Innovation Community” hero,
 *   club benefits section, embedded JoinForm, and SocialConnect.
 * - Handles automatic scrolling to top or to a hash anchor on mount.
 * - Wires up social buttons to open external links in new tabs.
 */
export default function Join() {
  const location = useLocation();

  // 1) On page mount, jump to top so the hero is visible.
  useEffect(() => {
    // Use behavior "auto" (not "instant") for immediate scroll.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // 2) If URL contains a #hash (e.g. /join#join), scroll to that element
  //    accounting for the fixed header offset.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80; // adjust to your fixed header height
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [location]);

  // Social button handlers: open external pages or mailto in new tab/mail client.
  const onFacebook  = () => window.open("https://www.facebook.com/people/CQU-Initiation-and-Innovation-Club/61574034382474/#", "_blank");
  const onInstagram = () => window.open("https://www.instagram.com/cquinitiation/", "_blank");
  const onLinkedIn  = () => window.open("https://www.linkedin.com/in/cqu-innovation-club-a6b079354/", "_blank");

  // Define onGoogle to avoid ReferenceError.
  const onGoogle = () => {
    // Open default mail client directly.
    window.location.href = "mailto:cqu.innovation@gmail.com";
  };

  return (
    <>
      {/* ===== Hero Section =====
         - Eye-catching gradient hero introducing the club and its benefits. */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <span className="hero-badge">Now Open for Applications</span>
            <h2 className="cta-section-title">Join Our Innovation Community</h2>
            <p className="cta-section-subtitle">
              Connect with 50+ passionate builders, innovators, and future entrepreneurs.
              Transform your ideas into reality with cutting-edge technology and expert mentorship.
            </p>
            {/* Stats hidden for now; can be added later */}
          </div>
        </div>
      </section>

      {/* ===== Benefits Section =====
         - Highlights what members get by joining.
         - Uses offering cards with emoji icons. */}
      <section className="offerings-section">
        <div className="container">
          <h2 className="section-title">Join CQU Initiation and Innovation Club</h2>
          <div className="offerings-grid">
            <div className="offering-card">
              <div className="offering-icon">🚀</div>
              <h3>Real Startup Experience</h3>
              <p>Work on meaningful, real-world projects that make an impact while building a strong portfolio.</p>
            </div>
            <div className="offering-card">
              <div className="offering-icon">🧠</div>
              <h3>Cutting-Edge Technology</h3>
              <p>Master emerging technologies like AI, blockchain, IoT, and AR/VR that are shaping the future.</p>
            </div>
            <div className="offering-card">
              <div className="offering-icon">🤝</div>
              <h3>Network with Founders</h3>
              <p>Connect with alumni entrepreneurs and industry experts who will guide you on your entrepreneurial journey.</p>
            </div>
            <div className="offering-card">
              <div className="offering-icon">💰</div>
              <h3>Funding Opportunities</h3>
              <p>Unlock access to grants, pitch competitions, and investor networks to bring your startup ideas to reality.</p>
            </div>
            <div className="offering-card">
              <div className="offering-icon">🎯</div>
              <h3>Skill Development</h3>
              <p>Participate in workshops, hackathons, and training sessions to sharpen your technical and entrepreneurial expertise.</p>
            </div>
            <div className="offering-card">
              <div className="offering-icon">🌟</div>
              <h3>Recognition & Awards</h3>
              <p>Showcase your innovative projects in competitions and gain recognition for your contributions to technology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Form Section (embedded component) ===== */}
      <JoinForm />

      {/* ===== Social Connect Section (embedded component) ===== */}
      <SocialConnect
        onFacebook={onFacebook}
        onInstagram={onInstagram}
        onLinkedIn={onLinkedIn}
        onGoogle={onGoogle}
        profileLinks={{
          facebook: "https://www.facebook.com/people/CQU-Initiation-and-Innovation-Club/61574034382474/#",
          instagram: "https://www.instagram.com/cquinitiation/",
          linkedin: "https://www.linkedin.com/in/cqu-innovation-club-a6b079354/",
          email: "cqu.innovation@gmail.com",
        }}
      />
    </>
  );
}
