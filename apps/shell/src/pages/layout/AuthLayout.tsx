// import { getAccessToken } from "@utils/index";
import { useAuthStore } from "@store/auth/authStore";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <main className="w-full h-screen">
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
};
export default AuthLayout;
