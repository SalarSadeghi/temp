import { Loadable, NotFound } from "@superapp/ui";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const DrawerLayout = Loadable(
  lazy(() => import("@pages/layout/drawerLayout/DrawerLayout"))
);

const RegisterGreenCardForm = Loadable(
  lazy(() => import("@components/pages/greenCardForm/RegisterGreenCardForm"))
);

const DraftGreenCard = Loadable(
  lazy(() => import("@components/pages/greenCardForm/DraftGreenCard"))
);

const SentGreenCardForm = Loadable(
  lazy(() => import("@components/pages/greenCardForm/DraftGreenCard"))
);

const AppRouter = () => {
  return (
    <Routes>
      <Route path="greenCard" element={<DrawerLayout />}>
        <Route index element={<Navigate to="register" replace />} />
        <Route path="register" element={<RegisterGreenCardForm />} />
        <Route path="draft" element={<DraftGreenCard />} />
        <Route path="sent" element={<SentGreenCardForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
