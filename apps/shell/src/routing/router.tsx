import AuthLayout from "@pages/layout/AuthLayout";
import MainLayout from "@pages/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import RouteErrorPage from "./RouteErrorPage";
import { appRoutes } from "./routes/app.routes";
import { authRoutes } from "./routes/auth.routes";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <RouteErrorPage />,
    children: authRoutes,
  },

  {
    element: <MainLayout />,
    errorElement: <RouteErrorPage />,
    children: appRoutes,
  },
]);
