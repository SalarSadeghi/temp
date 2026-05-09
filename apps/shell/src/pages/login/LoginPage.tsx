// src/components/LoginPage.tsx
import React from "react";
import { Lock } from "@superapp/icons";
import Login from "@components/pages/login/Login";

export const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen p-4 bg-gradient-to-br  to-[#9945FF] from-[#14F195]">
      <div className="bg-white min-h-96 w-[90%] rounded-2xl shadow-lg p-4 flex flex-col justify-between items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-gradient-to-br  to-[#9945FF] from-[#14F195] p-2">
            <Lock sx={{ color: "white" }} />
          </div>
          <span className="font-semibold text-lg">خوش آمدید!</span>
        </div>
        <div>
          <Login />
        </div>
        <div className="text-xs flex gap-2">
          <span className="text-gray-400">عضو نیستید؟</span>
          <span className="text-[#9945FF] cursor-pointer underline underline-offset-8">
            ثبت‌نام
          </span>
        </div>
      </div>
    </div>
  );
};
