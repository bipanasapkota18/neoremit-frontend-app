import LayoutWrapper from "@neo/components/LayoutWrapper";
import { Authorities } from "@neo/services/service-token";
import { lazy } from "react";

import { NAVIGATION_ROUTES } from "./navigationRoutes";

const Dashboard = lazy(() => import("@neo/pages/Authorized/Dashboard"));
const Currency = lazy(
  () => import("@neo/pages/Authorized/MasterData/Currency")
);
const ForgotPassword = lazy(() => import("@neo/pages/NoAuth/ForgotPassword"));
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
        element: <Dashboard />,
        accessor: [Authorities.client, Authorities.gateway]
      },

      {
        path: NAVIGATION_ROUTES.CURRENCY_SETUP,
        element: <Currency />,
        accessor: [Authorities.client, Authorities.gateway]
      },
      {
        path: NAVIGATION_ROUTES.RELATIONSHIP,
        element: <Relationship />,
        accessor: [Authorities.client, Authorities.gateway]
      }
    ]
  },
  {
    path: NAVIGATION_ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />
  }
];
