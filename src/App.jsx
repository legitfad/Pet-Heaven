import { Routes, Route } from "react-router-dom";

// Shared layout (navigation bar + footer wrap every page)
import Layout from "./components/Layout.jsx";

// The individual pages ("screens") of our Single Page Application
import Home from "./pages/Home.jsx";
import Adopt from "./pages/Adopt.jsx";
import PetDetails from "./pages/PetDetails.jsx";
import AdoptRequest from "./pages/AdoptRequest.jsx";
import Release from "./pages/Release.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

// ---------------------------------------------------------------------------
// App = the "router". It maps each URL to the page component that should show.
// Because everything is nested inside the <Layout> route, every page is
// automatically drawn with the same NavBar on top and Footer at the bottom.
// This is the heart of the Single Page Application: changing pages only swaps
// the middle content, the browser never does a full reload.
// ---------------------------------------------------------------------------
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="adopt" element={<Adopt />} />
        <Route path="adopt/:id" element={<PetDetails />} />
        <Route path="adopt/:id/request" element={<AdoptRequest />} />
        <Route path="release" element={<Release />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        {/* Any unknown URL falls through to a friendly "not found" page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
