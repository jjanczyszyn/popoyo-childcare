import React from "react";
import ReactDOM from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App";
import "./index.css";

// We always wrap with ConvexProvider so hooks like `useMutation` work in the
// component tree. If VITE_CONVEX_URL isn't set yet (e.g. before the user has
// run `npx convex dev`), we mount with a placeholder that passes Convex's
// `^https?://` constructor check; the booking form short-circuits the mutation
// call via CONVEX_ENABLED and just opens WhatsApp.
//
// GitHub Actions substitutes secrets that don't exist with empty string (not
// undefined), which is why the truthiness check below is `&&` and not `??`.
const rawConvexUrl = import.meta.env.VITE_CONVEX_URL;
const convexUrl =
  rawConvexUrl && /^https?:\/\//.test(rawConvexUrl)
    ? rawConvexUrl
    : "https://placeholder.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </React.StrictMode>,
);
