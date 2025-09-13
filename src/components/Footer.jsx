import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="startup-footer">
      <div className="startup-footer-content">
        <div className="startup-footer-section">
          <div className="footer-column">
            <h3>Together, we Innovate, Inspire, and Grow</h3>
            <a href="mailto:cqu.innovation@gmail.com" className="footer-email">
              cqu.innovation@gmail.com
            </a>
            <Link to="/team" className="footer-link">Team Chart</Link>
          </div>

          <div className="footer-column">
            <h3>Support</h3>
            <a href="#" className="footer-link">Help Centre</a>
            <a href="#" className="footer-link">Report an Issue</a>
          </div>

          <div className="footer-column">
            <h3>Advertise & Collaborate</h3>
            <a href="#" className="footer-link">Partner/Collaborate</a>
            <a href="#" className="footer-link">Advertise with us</a>
            <a href="#" className="footer-link">Sponsorships</a>
          </div>
        </div>
      </div>

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
