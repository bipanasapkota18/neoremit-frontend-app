import LayoutWrapper from "@/components/LayoutWrapper";
import { Authorities } from "@/services/service-token";
import { lazy } from "react";
import { NAVIGATION_ROUTES } from "./navigationRoutes";
const Dashboard = lazy(() => import("@/pages/Authorized/Dashboard"));
const Home = lazy(() => import("@/pages/Authorized/Home"));

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
        path: NAVIGATION_ROUTES.HOME,
        element: <Home />,
        accessor: [Authorities.client, Authorities.gateway]
      }
    ]
  }
];
