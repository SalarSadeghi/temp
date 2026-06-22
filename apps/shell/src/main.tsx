import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

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
      retry: false,
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
      {import.meta.env.DEV && (
        <TanStackDevtools
          plugins={[
            {
              name: "TanStack Query",
              render: <ReactQueryDevtoolsPanel />,
            },
          ]}
        />
      )}
    </QueryClientProvider>
  </React.StrictMode>
);
