// src/components/SocialConnect.jsx
import "./SocialConnect.css";

/**
 * SocialConnect
 * - Branded “Connect With Us” hero section with social links.
 * - Supports optional click handlers to open custom windows or tracking
 *   (onFacebook/onInstagram/onLinkedIn/onGoogle). If handlers are supplied,
 *   default <a> navigation is prevented and the handler is executed.
 *
 * Props:
 * - onFacebook/onInstagram/onLinkedIn/onGoogle (optional): () => void
 * - profileLinks: object with social URLs; defaults provided.
 *
 * Accessibility / Best Practices:
 * - Relies on standard <a> elements for external navigation.
 * - `rel="noopener noreferrer"` is present for security when using target _blank
 *   (target isn’t set here, but rel is harmless and future-proof).
 * - Icons have proper alt text (“Facebook”, “Instagram”, “LinkedIn”).
 */
export default function SocialConnect({
  onFacebook,
  onInstagram,
  onLinkedIn,
  onGoogle, // (not used in markup below; available for future Gmail/Google link)
  profileLinks = {
    facebook: "https://www.facebook.com/people/CQU-Initiation-and-Innovation-Club/61574034382474/#",
    instagram: "https://www.instagram.com/cquinitiation/",
    linkedin: "https://www.linkedin.com/in/cqu-innovation-club-a6b079354/",
  },
}) {
  return (
    <section className="questions-section" id="contact">
      <div className="container">
        {/* Title + subtitle communicate purpose and value of the section */}
        <h3>Connect With Us</h3>
        <p>
          Stay updated with our latest insights, industry news, and professional content across our social media channels.
        </p>

        {/* Action pills: external links with optional click handlers.
           - If a handler is provided, prevent default and call the handler,
             allowing the parent to control behavior (e.g., open new tab/window). */}
        <div className="social-actions">
          <a
            href={profileLinks.facebook}
            className="pill-btn pill-btn--lg pill-btn--glass"
            onClick={(e) => { if (onFacebook) { e.preventDefault(); onFacebook(); } }}
            rel="noopener noreferrer"
          >
            {/* Assets in /public can be referenced from root (no /public prefix). */}
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
        </div>
      </div>
    </section>
  );
}
