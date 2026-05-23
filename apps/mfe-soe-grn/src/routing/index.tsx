import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Route index  path="soe/greenCard/register" element={"root green card"} />
      <Route index  path="soe/greenCard/draft" element={"draft green card"} />
      <Route index  path="soe/greenCard/sent" element={"sent green card"} />
    </Routes>
  );
};

export default AppRouter;



