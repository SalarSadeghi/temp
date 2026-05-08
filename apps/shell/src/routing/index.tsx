import ErrorBoundary from "@components/common/ErrorBoundary";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AuthRoutes from "@routing/auth/AuthRoutes";
import AdminRoutes from "@routing/admin/AdminRoutes";
import UserRoutes from "@routing/user/UserRoutes";
import ProtectedRoute from "@components/common/ProtectedRoute";
import NotFound from "@components/common/NotFound";

const AppRouter = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          {/* Redirect to '/user' path */}
          <Route path="/" element={<Navigate to="/user" replace />} />
          {/* Auth Routes */}
          <Route path="/auth/*" element={<AuthRoutes />} />
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          {/* User Routes */}
          <Route path="/user/*" element={<UserRoutes />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />{" "}
          {/* 404 Not Found */}
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default AppRouter;
