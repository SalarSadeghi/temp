import NotFound from "@components/common/NotFound";
import ProtectedRoute from "@components/common/ProtectedRoute";
import { Route, Routes } from "react-router-dom";

function AuthRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="login"
          element={
            <div className="flex justify-center items-center flex-col h-full">
              <span className="text-blue-900 font-bold text-xl">لاگین</span>
            </div>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        />
        {/* Add more auth routes as needed */}
      </Routes>
    </>
  );
}

export default AuthRoutes;
