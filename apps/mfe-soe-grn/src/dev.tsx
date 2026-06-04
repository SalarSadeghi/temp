import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomConfirmDialog } from "@superapp/ui";

// Import the local Tailwind build ONLY in development
if (import.meta.env.DEV) {
  import("@superapp/shared-assets/fonts.css");
  import("./index.css");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <CustomConfirmDialog />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
