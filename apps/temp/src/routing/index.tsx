import Home from "@pages/home/Home";
import { Route, Routes } from "react-router-dom";

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
