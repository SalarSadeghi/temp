import { RouteObject } from "react-router-dom";

export const homeRoutes: RouteObject[] = [
  {
    path: "/",
    lazy: async () => {
      const module = await import("@pages/home/HomePage");
      return {
        Component: module.default,
      };
    },
  },
];
