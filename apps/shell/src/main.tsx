import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AppThemeProvider,
  // AppThemeProvider,
  CustomConfirmDialog,
  CustomSnackbar,
} from "@superapp/ui";
import App from "./App";
import "@superapp/shared-assets/fonts.css";

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
      <AppThemeProvider>
        <App />
        <CustomSnackbar />
        <CustomConfirmDialog />
      </AppThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
