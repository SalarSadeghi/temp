import NotFound from "@components/common/NotFound";
import ProtectedRoute from "@components/common/ProtectedRoute";
import { LoginPage } from "@pages/login/LoginPage";
import { Route, Routes } from "react-router-dom";

function AuthRoutes() {
  return (
    <>
      <Routes>
        <Route path="login" element={<LoginPage />} />
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
