import { Link } from "react-router-dom";

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
            A charity that cares for the welfare of abandoned cats and dogs, and helps them find loving new homes.
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
            59 Sungei Tengah Road
            <br />
            Singapore 699014
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
          © {year} Pet Heaven. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
