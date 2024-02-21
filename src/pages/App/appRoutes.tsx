import LayoutWrapper from "@neo/components/LayoutWrapper";
import { lazy } from "react";

import { NAVIGATION_ROUTES } from "./navigationRoutes";

const Dashboard = lazy(() => import("@neo/pages/Authorized/Dashboard"));
const Currency = lazy(
  () => import("@neo/pages/Authorized/MasterData/Currency")
);

const Relationship = lazy(
  () => import("@neo/pages/Authorized/MasterData/Relationship")
);
export const appRoutes = [
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },

      {
        path: NAVIGATION_ROUTES.CURRENCY_SETUP,
        element: <Currency />
      },
      {
        path: NAVIGATION_ROUTES.RELATIONSHIP,
        element: <Relationship />
      }
    ]
  }
];
