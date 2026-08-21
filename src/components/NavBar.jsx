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
          <span className="brand-text">
            Pet <strong>Heaven</strong>
          </span>
        </Link>

        <button
          className={"nav-toggle" + (open ? " open" : "")}
          onClick={() => setOpen(!open)}
        >
          <span>Menu</span>
          <span className="bars"></span>
        </button>

        <nav className={"nav-links" + (open ? " show" : "")}>
          <NavLink to="/" end className={linkClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/adopt" className={linkClass} onClick={closeMenu}>
            Adopt
          </NavLink>
          <NavLink to="/quiz" className={linkClass} onClick={closeMenu}>
            Match Quiz
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
          {currentMember && currentMember.role === "employee" && (
            <NavLink to="/employee" className={linkClass} onClick={closeMenu}>
              Employee
            </NavLink>
          )}

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
