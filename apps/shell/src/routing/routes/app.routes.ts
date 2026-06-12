import { RouteObject } from "react-router-dom";
import { homeRoutes } from "./home.routes";
import { profileRoutes } from "./profile.routes";

export const appRoutes: RouteObject[] = [
  ...homeRoutes,
  ...profileRoutes,
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
