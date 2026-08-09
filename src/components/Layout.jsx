import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

//Standard layout for all pages
//  NavBar  (top, same on every page)
//  <Outlet /> React Router draws the current page here
//  Footer  (bottom, same on every page)

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
