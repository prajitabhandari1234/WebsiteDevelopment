import JoinForm from "../components/JoinForm";
import SocialConnect from "../components/SocialConnect";
import "../Styles/Join.css";

export default function Join() {
  // Optional: wire real OAuth here (Firebase/Auth0/etc.)
  const onFacebook  = () => window.open("https://www.facebook.com/people/CQU-Initiation-and-Innovation-Club/61574034382474/#", "_blank");
  const onInstagram = () => window.open("https://www.instagram.com/cquinitiation/", "_blank");
  const onLinkedIn  = () => window.open("https://www.linkedin.com/in/cqu-innovation-club-a6b079354/", "_blank");
  const onGoogle    = () => window.open("cqu.innovation@gmail.com", "_blank");

  return (
    <>
      {/* Hero */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <span className="hero-badge">🚀 Now Open for Applications</span>
            <h2 className="cta-section-title">Join Our Innovation Community</h2>
            <p className="cta-section-subtitle">
              Connect with 50+ passionate builders, innovators, and future entrepreneurs. Transform your ideas into reality with cutting-edge technology and expert mentorship.
            </p>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">50+</span>
                <span className="hero-stat-label">Active Members</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">25+</span>
                <span className="hero-stat-label">Projects Launched</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">$100K+</span>
                <span className="hero-stat-label">Funding Secured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="offerings-section">
        <div className="container">
          <h2 className="section-title">Join CQU Initation and Innovation Club</h2>
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

      {/* Form (separate component) */}
      <JoinForm />

      {/* Social connect section */}
      <SocialConnect
        onFacebook={onFacebook}
        onInstagram={onInstagram}
        onLinkedIn={onLinkedIn}
        onGoogle={onGoogle}
        profileLinks={{
          facebook: "https://www.facebook.com/people/CQU-Initiation-and-Innovation-Club/61574034382474/#",
          instagram: "https://www.instagram.com/cquinitiation/",
          linkedin: "https://www.linkedin.com/in/cqu-innovation-club-a6b079354/",
          email: "cqu.innovation@gmail.com"
        }}
      />

      {/* Footer remains as your site’s global footer */}
    </>
  );
}
