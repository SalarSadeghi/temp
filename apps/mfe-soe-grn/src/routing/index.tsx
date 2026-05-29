import DrawerLayout from "@pages/layout/drawerLayout/DrawerLayout";
import { Loadable, NotFound } from "@superapp/ui";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export const RegisterGreenCardForm = Loadable(
  lazy(() => import("@components/pages/greenCardForm/RegisterGreenCardForm"))
);

const AppRouter = () => {
  return (
    <Routes>
      <Route path="greenCard" element={<DrawerLayout />}>
        <Route index element={<Navigate to="register" replace />} />
        <Route path="register" 
        // element={<RegisterGreenCardForm />} 
        element={<h1>hiiiii</h1>}
        />
        <Route path="draft" element={"draft green card"} />
        <Route path="sent" element={"sent green card"} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
