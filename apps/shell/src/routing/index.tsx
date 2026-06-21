import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import AppLoading from "@components/common/Suspence";

const AppRouter = () => {
  return (
    
    <RouterProvider router={router} fallbackElement={<AppLoading />} />
  );
};

export default AppRouter;
