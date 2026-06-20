import { RouteObject } from "react-router-dom";

export const profileRoutes: RouteObject[] = [
  {
    path: "/profile",
    lazy: async () => {
      const module = await import("@pages/profile/ProfilePage");
      return {
        Component: module.default,
      };
    },
  },
];
