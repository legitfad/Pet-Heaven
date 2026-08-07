import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

// ---------------------------------------------------------------------------
// Layout — the shared shell around every page.
//
//   NavBar  (top, same on every page)
//   <Outlet />  <- React Router draws the current page here
//   Footer  (bottom, same on every page)
//
// Because the NavBar and Footer live here just ONCE, every page automatically
// gets them. (In a plain multi-page HTML site you would have to copy the header
// and footer into every file — reusing components avoids that.)
//
// It also scrolls back to the top each time the URL changes, so moving to a new
// page starts you at the top like a normal website.
// ---------------------------------------------------------------------------
export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-shell">
      {/* Accessibility: lets keyboard users jump straight to the content */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <NavBar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
