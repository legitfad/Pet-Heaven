import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useMember } from "../context/MemberContext.jsx";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { currentMember, logout } = useMember();
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/");
  }

  const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "");

  return (
    <header className="site-header">
      <div className="nav-inner">
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

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="bars" aria-hidden="true"></span>
        </button>

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
