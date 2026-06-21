// import { getAccessToken } from "@utils/index";
import {  Outlet } from "react-router-dom";

const AuthLayout = () => {
  // const token = getAccessToken();
  // const accessToken = useAuthStore((state) => state.accessToken);
  // if (accessToken) {
  //   // I should validate this token. maybe later!
  //   return <Navigate to="/home" replace />;
  // }

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
