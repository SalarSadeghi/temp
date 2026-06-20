import { RouteObject } from "react-router-dom";
import { grnRoutes } from "./grn/grn.routes";

export const soeRoutes: RouteObject[] = [
  { path: "/soe", children: [...grnRoutes] },

  // {
  //   path: "*",
  //   lazy: async () => {
  //     const module = await import("@components/common/NotFound");
  //     return {
  //       Component: module.default,
  //     };
  //   },
  // },
];
