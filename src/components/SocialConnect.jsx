import "./SocialConnect.css";

export default function SocialConnect({
  onFacebook,
  onInstagram,
  onLinkedIn,
  onGoogle,
  profileLinks = {
    facebook: "https://www.facebook.com/people/CQU-Initiation-and-Innovation-Club/61574034382474/#",
    instagram: "https://www.instagram.com/cquinitiation/",
    linkedin: "https://www.linkedin.com/in/cqu-innovation-club-a6b079354/",
    email: "cqu.innovation@gmail.com",
  },
}) {
  return (
    <section className="questions-section" id="contact">
      <div className="container">
        <h3>Questions? We're Here to Help</h3>
        <p>Connect on social or send us an email!</p>

        <div className="social-actions">
          <a
            href={profileLinks.facebook}
            className="pill-btn pill-btn--lg pill-btn--glass"
            onClick={(e) => { if (onFacebook) { e.preventDefault(); onFacebook(); } }}
            rel="noopener noreferrer"
          >
            {/* remove /public -> everything in /public is served from / */}
            <img src="/images/facebook.png" alt="Facebook" className="pill-icon" />
            Facebook
          </a>

          <a
            href={profileLinks.instagram}
            className="pill-btn pill-btn--lg pill-btn--glass"
            onClick={(e) => { if (onInstagram) { e.preventDefault(); onInstagram(); } }}
            rel="noopener noreferrer"
          >
            <img src="/images/instagram.png" alt="Instagram" className="pill-icon" />
            Instagram
          </a>

          <a
            href={profileLinks.linkedin}
            className="pill-btn pill-btn--lg pill-btn--glass"
            onClick={(e) => { if (onLinkedIn) { e.preventDefault(); onLinkedIn(); } }}
            rel="noopener noreferrer"
          >
            <img src="/images/linkedin.png" alt="LinkedIn" className="pill-icon" />
            LinkedIn
          </a>

          <a
            href="#"
            className="pill-btn pill-btn--lg pill-btn--glass"
            onClick={(e) => {
              if (onGoogle) { e.preventDefault(); onGoogle(); }
              else { window.location.href = profileLinks.email; }
            }}
            rel="noopener noreferrer"
          >
            <img src="/images/gmail.png" alt="Gmail" className="pill-icon" />
            Gmail
          </a>
        </div>
      </div>
    </section>
  );
}
