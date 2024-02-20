import LayoutWrapper from "@neo/components/LayoutWrapper";
import { Authorities } from "@neo/services/service-token";
import { lazy } from "react";
import Currency from "../Authorized/MasterData/Currency";
import ForgotPassword from "../NoAuth/ForgotPassword";
import { NAVIGATION_ROUTES } from "./navigationRoutes";
const Dashboard = lazy(() => import("@neo/pages/Authorized/Dashboard"));

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
      }
    ]
  },
  {
    path: NAVIGATION_ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />
  }
];
