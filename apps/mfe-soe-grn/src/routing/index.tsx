import DrawerLayout from "@pages/layout/drawerLayout/DrawerLayout";
import { Loadable, NotFound } from "@superapp/ui";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const RegisterGreenCardForm = Loadable(
  lazy(() => import("@components/pages/greenCardForm/RegisterGreenCardForm")),
);

const DraftGreenCard = Loadable(
  lazy(() => import("@components/pages/greenCardForm/DraftGreenCard")),
);

const AppRouter = () => {
  return (
    <Routes>
      <Route path="greenCard" element={<DrawerLayout />}>
        <Route index element={<Navigate to="register" replace />} />
        <Route path="register" element={<RegisterGreenCardForm />} />
        <Route path="draft" element={<DraftGreenCard />} />
        <Route path="sent" element={"sent green card"} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
