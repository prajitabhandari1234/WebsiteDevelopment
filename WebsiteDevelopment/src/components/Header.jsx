// src/components/Header.jsx
import { NavLink, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";

/**
 * Header
 * - Fixed site header with logo, navigation, and a hamburger menu for mobile.
 * - Accessibility: uses aria-label + aria-expanded on the toggle button.
 * - UX: closes mobile menu automatically when route changes.
 *
 * NOTE:
 * - React Router v6 sets aria-current="page" on active NavLink
 *   (it does NOT auto-apply `.active` class). Your CSS targets `.active`,
 *   so verify your router version or adjust CSS if needed.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu on route change to avoid a stuck-open tray.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="startup-header">
      {/* Brand / Logo (links to Home) */}
      <Link to="/" className="startup-logo" aria-label="Home">
        {/* Fixed-size image prevents layout shift; served from public path */}
        <img src="/images/logo.jpg" alt="CQU Logo" className="logo-img" />
        <span className="logo-text">CQU Initiation & Innovation</span>
      </Link>

      {/* Mobile hamburger toggle
         - aria-expanded communicates open/closed state to screen readers
         - onClick toggles the menu only (no state outside this component)
         TIP: Consider `type="button"` and `aria-controls="primary-navigation"`
         in the future for stricter a11y, but left unchanged per request. */}
      <button
        className="nav-toggle"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>

      {/* Primary navigation
         - `is-open` class is used only on mobile to reveal the tray.
         - Ensure the page content accounts for the fixed header (padding/offset). */}
      <nav className={`startup-nav ${open ? "is-open" : ""}`}>
        {/* `end` prevents "/" from matching nested routes */}
        <NavLink to="/" end className="startup-nav-item">Home</NavLink>
        <NavLink to="/projects" className="startup-nav-item">Project</NavLink>
        <NavLink to="/team" className="startup-nav-item">Team</NavLink>
        <NavLink to="/events" className="startup-nav-item">Events</NavLink>
        <NavLink to="/blog" className="startup-nav-item">Blog</NavLink>
        <NavLink to="/join" className="startup-nav-item">Join Us</NavLink>
      </nav>
    </header>
  );
}
