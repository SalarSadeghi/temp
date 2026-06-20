import { RouteObject } from "react-router-dom";
import { homeRoutes } from "./home.routes";
import { profileRoutes } from "./profile.routes";
import { servicesRoutes } from "./services.routes";

export const appRoutes: RouteObject[] = [
  ...homeRoutes,
  ...servicesRoutes,
  ...profileRoutes,
  //profile routes, ... maybe later
  {
    path: "*",
    lazy: async () => {
      const module = await import("@components/common/NotFound");
      return {
        Component: module.default,
      };
    },
  },
];
