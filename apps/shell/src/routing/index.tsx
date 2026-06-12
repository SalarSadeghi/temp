import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import AppLoading from "@components/common/Suspence";

const AppRouter = () => {
  return (
    // <Router>
    //   <ErrorBoundary>
    //     {/* <InstallPWABanner /> */}
    //     <Routes>
    //       {/* Redirect to '/user' path */}
    //       <Route path="/" element={<Navigate to="/user" replace />} />
    //       {/* Auth Routes */}
    //       <Route path="/auth/*" element={<AuthRoutes />} />
    //       {/* Admin Routes */}
    //       <Route path="/admin/*" element={<AdminRoutes />} />
    //       {/* User Routes */}
    //       <Route path="/user/*" element={<UserRoutes />} />
    //       <Route
    //         path="*"
    //         element={
    //           <ProtectedRoute>
    //             <NotFound />
    //           </ProtectedRoute>
    //         }
    //       />{" "}
    //       {/* 404 Not Found */}
    //     </Routes>
    //   </ErrorBoundary>
    // </Router>
    <RouterProvider router={router} fallbackElement={<AppLoading />} />
  );
};

export default AppRouter;
