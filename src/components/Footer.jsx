// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "./Footer.css";

/**
 * Footer
 * - Provides site-wide contact, support, and partnership links.
 * - Organized into three columns for desktop, stacked on mobile.
 * - Includes brand motto and dynamic year in the bottom bar.
 *
 * Accessibility / Best Practices:
 * - Internal navigation uses React Router <Link>; external uses <a>.
 * - All links styled consistently via CSS.
 * - Could wrap columns in <nav aria-label="Footer"> or <section> for SR users.
 */
export default function Footer() {
  return (
    <footer className="startup-footer">
      {/* Main content area of the footer */}
      <div className="startup-footer-content">
        {/* Three columns: Contact/Team, Support, Advertise */}
        <div className="startup-footer-section">
          
          {/* Column 1: Contact + Team link */}
          <div className="footer-column">
            <h3>Together, we Innovate, Inspire, and Grow</h3>
            {/* Direct mail link */}
            <a href="mailto:cqu.innovation@gmail.com" className="footer-email">
              cqu.innovation@gmail.com
            </a>
            {/* Internal link to team chart */}
            <Link to="/team" className="footer-link">Team Chart</Link>
          </div>

          {/* Column 2: Support links */}
          <div className="footer-column">
            <h3>Support</h3>
            {/* Placeholder href="#" — replace with actual URLs later */}
            <a href="#" className="footer-link">Help Centre</a>
            <a href="#" className="footer-link">Report an Issue</a>
          </div>

          {/* Column 3: Advertise / Collaborate links */}
          <div className="footer-column">
            <h3>Advertise & Collaborate</h3>
            <a href="#" className="footer-link">Partner/Collaborate</a>
            <a href="#" className="footer-link">Advertise with us</a>
            <a href="#" className="footer-link">Sponsorships</a>
          </div>
        </div>
      </div>

      {/* Bottom bar with motto and copyright */}
      <div className="footer-bottom">
        <div className="footer-motto">
          <p>"Where ideas ignite, and innovation thrives."</p>
          <p className="copyright">
            © {new Date().getFullYear()} Initiation & Innovation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
