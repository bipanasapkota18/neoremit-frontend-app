import LayoutWrapper from "@neo/components/LayoutWrapper";
import { lazy } from "react";

import Country from "../Authorized/MasterData/Country";
import State from "../Authorized/MasterData/Country/State";
import PayoutPartner from "../Authorized/MasterData/Payout Partner";
import PayoutMethod from "../Authorized/MasterData/PayoutMethod";
import { NAVIGATION_ROUTES } from "./navigationRoutes";

const Document = lazy(
  () => import("@neo/pages/Authorized/MasterData/DocumentSetup")
);
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
const SourceOfFund = lazy(
  () => import("@neo/pages/Authorized/MasterData/SourceOfFund/index")
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
      },
      {
        path: NAVIGATION_ROUTES.MASTER_DATA.DOCUMENT_SETUP,
        element: <Document />
      },
      {
        path: NAVIGATION_ROUTES.MASTER_DATA.SOURCE_OF_FUND,
        element: <SourceOfFund />
      },
      {
        path: NAVIGATION_ROUTES.MASTER_DATA.PAYOUT_PARTNER,
        element: <PayoutPartner />
      },
      {
        path: NAVIGATION_ROUTES.MASTER_DATA.PAYOUT_METHOD,
        element: <PayoutMethod />
      },
      {
        path: NAVIGATION_ROUTES.MASTER_DATA.COUNTRY_SETUP,
        element: <Country />
      },
      {
        path: NAVIGATION_ROUTES.MASTER_DATA.STATE_SETUP,
        element: <State />
      }
    ]
  }
];
