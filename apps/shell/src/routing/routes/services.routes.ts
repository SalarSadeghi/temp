import { RouteObject } from "react-router-dom";

export const servicesRoutes: RouteObject[] = [
  {
    path: "/services",
    lazy: async () => {
      const module = await import("@pages/services/ServicesPage");
      return {
        Component: module.default,
      };
    },
  },
];
