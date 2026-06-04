import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { Loadable } from "@superapp/ui/common";

const Home = Loadable(lazy(() => import("@pages/home/Home")));
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<h1>Temp Home Page</h1>} />
      <Route path="/about" element={<h1>Temp About Page</h1>} />
    </Routes>
  );
};

export default AppRouter;
