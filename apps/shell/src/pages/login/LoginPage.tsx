// src/components/LoginPage.tsx
import Login from "@components/pages/login/Login";
import logo from "/pwa-76.png";
import LoginFooter from "./LoginFooter";

const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen p-4 bg-default">
      <div className="flex flex-col justify-between">
        <div className="flex items-center flex-col gap-2">
          <div className="flex justify-center">
            <img src={logo} className="rounded-full" />
          </div>
          <span className="font-semibold">به اپلیکیشن سازمان خوش آمدید</span>
        </div>
        <div className="py-4">
          <Login />
        </div>
        <div className="flex justify-center">
          <LoginFooter />
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default LoginPage;
