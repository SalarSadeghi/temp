import DrawerLayout from "@pages/layout/drawerLayout/DrawerLayout";
import { NotFound } from "@superapp/ui";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="greenCard" element={<DrawerLayout />} >
        <Route index path="register" element={<h1>hi</h1>} />
        <Route path="draft" element={"draft green card"} />
        <Route path="sent" element={"sent green card"} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
