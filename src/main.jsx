import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { MemberProvider } from "./context/MemberContext.jsx";
import "./styles.css";

// ---------------------------------------------------------------------------
// Application entry point.
// This file runs first. It finds the empty <div id="root"> in index.html and
// tells React to render our whole app inside it.
//
// We wrap <App /> in three providers:
//   1. HashRouter      -> gives us page routing (URLs like  .../#/adopt ).
//                         The "#" style works on any static web host and never
//                         shows a 404 when the visitor refreshes an inner page.
//   2. MemberProvider  -> shares the logged-in member with every component
//                         (our simple "who is signed in" state).
//   3. React.StrictMode -> a development-only helper that highlights potential
//                          problems. It does nothing in the final build.
// ---------------------------------------------------------------------------
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <MemberProvider>
        <App />
      </MemberProvider>
    </HashRouter>
  </React.StrictMode>
);
