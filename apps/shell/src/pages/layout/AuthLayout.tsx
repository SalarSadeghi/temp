import { getAccessToken } from "@utils/index";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const token = getAccessToken();
  if (token) {
    // I should validate this token. maybe later!
    return <Navigate to="/" replace />;
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
