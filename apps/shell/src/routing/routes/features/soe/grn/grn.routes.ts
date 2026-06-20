import { RouteObject } from "react-router-dom";
export const grnRoutes: RouteObject[] = [
  {
    path: "grn",
    lazy: async () => {
      const module =
        await import("@components/pages/features/soe/grn/GRNDrawer");
      return {
        Component: module.default,
      };
    },

    // children: [
    //   {
    //     path: "register",
    //     lazy: async () => {
    //       const module =
    //         await import("@components/pages/features/soe/grn/RegisterGreenCardForm");
    //       return {
    //         Component: module.default,
    //       };
    //     },
    //   },
    //     {
    //       path: "draft",
    //       lazy: async () => {
    //         const module =
    //           await import("@components/pages/features/soe/grn/DraftGreenCard");
    //         return {
    //           Component: module.default,
    //         };
    //       },
    //     },
    //     {
    //       path: "sent",
    //       lazy: async () => {
    //         const module =
    //           await import("@components/pages/features/soe/grn/SentGreenCardForm");
    //         return {
    //           Component: module.default,
    //         };
    //       },
    //     },
    // ],
  },
  {
    path: "grn/register",
    lazy: async () => {
      const module =
        await import("@components/pages/features/soe/grn/RegisterGreenCardForm");
      return {
        Component: module.default,
      };
    },
  },
  {
    path: "grn/draft",
    lazy: async () => {
      const module =
        await import("@components/pages/features/soe/grn/DraftGreenCard");
      return {
        Component: module.default,
      };
    },
  },
  {
    path: "grn/sent",
    lazy: async () => {
      const module =
        await import("@components/pages/features/soe/grn/SentGreenCardForm");
      return {
        Component: module.default,
      };
    },
  },
  //   {
  //     path: "*",
  //     lazy: async () => {
  //       const module = await import("@components/common/NotFound");
  //       return {
  //         Component: module.default,
  //       };
  //     },
  //   },
];
