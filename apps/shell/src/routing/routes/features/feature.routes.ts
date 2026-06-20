import { RouteObject } from "react-router-dom";
import { soeRoutes } from "./soe/soe.routes";

export const featureRoutes: RouteObject[] = [
  ...soeRoutes,
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
