import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CustomConfirmDialog } from "@superapp/ui";

// Import the local Tailwind build ONLY in development
if (import.meta.env.DEV) {
  import("./index.css");
   import('@superapp/shared-assets/fonts.css');
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <CustomConfirmDialog />
    </BrowserRouter>
  </React.StrictMode>,
);
