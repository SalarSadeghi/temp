// src/routes/UserRoutes.tsx
import { Routes, Route } from "react-router-dom";
import NotFound from "@components/common/NotFound";
import ProtectedRoute from "@components/common/ProtectedRoute";
import { lazy } from "react";
const TempMFE = lazy(() => import("temp/Temp"));

const HomePage = lazy(() => import("@pages/home/HomePage"));

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          //   <ProtectedRoute>
          <HomePage />
          //    </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />{" "}
      {/* 404 Not Found */}
      {/* Add more user routes as needed */}
    </Routes>
  );
};

export default UserRoutes;
