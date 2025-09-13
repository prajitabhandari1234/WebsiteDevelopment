// src/components/Header.jsx
import { NavLink, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="startup-header">
      <Link to="/" className="startup-logo" aria-label="Home">
        <img src="/images/logo.jpg" alt="CQU Logo" className="logo-img" />
        <span className="logo-text">CQU Initiation & Innovation</span>
      </Link>

      <button className="nav-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(v => !v)}>
        <span className="nav-toggle-bar" /><span className="nav-toggle-bar" /><span className="nav-toggle-bar" />
      </button>

      <nav className={`startup-nav ${open ? "is-open" : ""}`}>
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
