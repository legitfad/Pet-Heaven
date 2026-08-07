import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useMember } from "../context/MemberContext.jsx";

// ---------------------------------------------------------------------------
// NavBar — the site navigation, shown on every page (through Layout).
//
// Key features:
//   - <NavLink> automatically adds an "active" class to the link for the page
//     you are currently on (so it can be highlighted).
//   - On narrow screens the links collapse behind a hamburger button that this
//     component opens/closes with a piece of state (`open`).
//   - It reads the member context to show either "Log in / Join us" or a
//     greeting + "Log out", depending on whether someone is signed in.
// ---------------------------------------------------------------------------
export default function NavBar() {
  const [open, setOpen] = useState(false); // is the mobile menu open?
  const { currentMember, logout } = useMember();
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/"); // go home after signing out
  }

  // Gives the active page's link an extra "active" class for highlighting.
  const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "");

  return (
    <header className="site-header">
      <div className="nav-inner">
        {/* Brand / logo (a little paw + the name), links back to Home */}
        <Link to="/" className="brand" onClick={closeMenu}>
          <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
            <g fill="currentColor">
              <ellipse cx="22" cy="24" rx="6" ry="8" />
              <ellipse cx="42" cy="24" rx="6" ry="8" />
              <ellipse cx="13" cy="37" rx="5.5" ry="7" />
              <ellipse cx="51" cy="37" rx="5.5" ry="7" />
              <path d="M32 34c-8 0-14 6-14 12 0 5 5 7 14 7s14-2 14-7c0-6-6-12-14-12z" />
            </g>
          </svg>
          <span className="brand-text">
            Pet <strong>Heaven</strong>
          </span>
        </Link>

        {/* Hamburger button (only visible on small screens via CSS) */}
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="bars" aria-hidden="true"></span>
        </button>

        {/* The links. "show" class slides them open on mobile. */}
        <nav id="primary-nav" className={"nav-links" + (open ? " show" : "")}>
          <NavLink to="/" end className={linkClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/adopt" className={linkClass} onClick={closeMenu}>
            Adopt
          </NavLink>
          <NavLink to="/release" className={linkClass} onClick={closeMenu}>
            Release a Pet
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass} onClick={closeMenu}>
            Contact
          </NavLink>

          {currentMember ? (
            <span className="nav-account">
              <span className="nav-hello">
                Hi, {currentMember.name.split(" ")[0]}
              </span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleLogout}
              >
                Log out
              </button>
            </span>
          ) : (
            <span className="nav-account">
              <NavLink to="/login" className={linkClass} onClick={closeMenu}>
                Log in
              </NavLink>
              <Link
                to="/register"
                className="btn btn-primary btn-sm"
                onClick={closeMenu}
              >
                Join us
              </Link>
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
