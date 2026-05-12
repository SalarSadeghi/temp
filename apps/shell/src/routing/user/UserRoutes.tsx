// src/routes/UserRoutes.tsx
import { Routes, Route } from "react-router-dom";
import NotFound from "@components/common/NotFound";
import ProtectedRoute from "@components/common/ProtectedRoute";
import { lazy } from "react";
import Loadable from "@components/common/Suspence";

const TempMFE = Loadable(lazy(() => import("temp/Temp")));
const HomePage = Loadable(lazy(() => import("@pages/home/HomePage")));

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/temp/*" element={<TempMFE />} />
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
