import { Link } from "react-router-dom";

// ---------------------------------------------------------------------------
// Footer — shown at the bottom of every page (through Layout).
// Holds quick links, the society's visiting details, and contact info.
// The year is generated so it never goes out of date.
// ---------------------------------------------------------------------------
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-text">
            Pet <strong>Heaven</strong>
          </span>
          <p>
            A charity that cares for the welfare of abandoned cats and dogs, and
            helps them find loving new homes.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/adopt">Adopt a pet</Link>
          <Link to="/release">Release a pet</Link>
          <Link to="/register">Become a member</Link>
          <Link to="/about">About us</Link>
        </div>

        <div className="footer-col">
          <h4>Visit us</h4>
          <p>
            12 Sunshine Avenue
            <br />
            Singapore 123456
          </p>
          <p>Open daily · 10am – 6pm</p>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>
            admin@petheaven.org.sg
            <br />
            +65 6123 4567
          </p>
          <Link to="/contact">Send us a message</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {year} Pet Heaven. A student project created for ISIT207 — not a real
          organisation.
        </p>
      </div>
    </footer>
  );
}
