import { RouteObject } from "react-router-dom";

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    children: [
      {
        path: "login",
        lazy: async () => {
          const module = await import("@pages/login/LoginPage");
          return {
            Component: module.default,
          };
        },
      },
      {
        path: "*",
        lazy: async () => {
          const module = await import("@components/common/NotFound");
          return {
            Component: module.default,
          };
        },
      },
    ],
  },
];
