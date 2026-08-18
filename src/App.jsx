import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx";

import Home from "./pages/Home.jsx";
import Adopt from "./pages/Adopt.jsx";
import PetDetails from "./pages/PetDetails.jsx";
import AdoptRequest from "./pages/AdoptRequest.jsx";
import Release from "./pages/Release.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Employee from "./pages/Employee.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

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
        <Route path="employee" element={<Employee />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
