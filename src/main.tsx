import React from "react";
import ReactDOM from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App";
import "./index.css";

// We always wrap with ConvexProvider so hooks like `useMutation` work in the
// component tree. If VITE_CONVEX_URL isn't set yet (e.g. before the user has
// run `npx convex dev`), we still mount but the booking form short-circuits
// the mutation call and just opens WhatsApp.
const url = (import.meta.env.VITE_CONVEX_URL as string | undefined) ?? "https://example.invalid";
const convex = new ConvexReactClient(url);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </React.StrictMode>,
);
