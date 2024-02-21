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
const PurposeOfPayment = lazy(
  () => import("@neo/pages/Authorized/MasterData/PurposeOfPayment")
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
        path: NAVIGATION_ROUTES.MASTER_DATA.CURRENCY_SETUP,
        element: <Currency />
      },
      {
        path: NAVIGATION_ROUTES.MASTER_DATA.RELATIONSHIP,
        element: <Relationship />
      },
      {
        path: NAVIGATION_ROUTES.MASTER_DATA.PURPOSE_OF_PAYMENT,
        element: <PurposeOfPayment />
      }
    ]
  }
];
