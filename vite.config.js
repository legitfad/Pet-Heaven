import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration.
// base: "./" makes the built site use RELATIVE paths for its JS/CSS.
// That means the production build in /dist works no matter what folder it is
// served from (Netlify root, Firebase Hosting, or a project sub-path).
// Together with HashRouter (see src/main.jsx) the deployed app never returns a
// 404 when the visitor refreshes on an inner page.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
