import LayoutWrapper from "@neo/components/LayoutWrapper";
import { lazy } from "react";

import { CounrtyDetails } from "../Authorized/MasterData/Country/CountryDetails";
import { NAVIGATION_ROUTES } from "./navigationRoutes";
const PartnerSetup = lazy(() => import("@neo/pages/Authorized/PartnerSetup"));
const AutomaticDiscount = lazy(
  () => import("@neo/pages/Authorized/MasterData/AutomaticDiscount")
);
const LedgerSetup = lazy(
  () => import("@neo/pages/Authorized/Accounting/LedgerSetup")
);
const VoucherEntry = lazy(
  () => import("@neo/pages/Authorized/Accounting/VoucherEntry")
);
const Document = lazy(
  () => import("@neo/pages/Authorized/MasterData/DocumentSetup")
);
const Dashboard = lazy(() => import("@neo/pages/Authorized/Dashboard"));
const Currency = lazy(
  () => import("@neo/pages/Authorized/MasterData/Currency")
);
const Country = lazy(() => import("@neo/pages/Authorized/MasterData/Country"));

const Relationship = lazy(
  () => import("@neo/pages/Authorized/MasterData/Relationship")
);
const PurposeOfPayment = lazy(
  () => import("@neo/pages/Authorized/MasterData/PurposeOfPayment")
);
const SourceOfFund = lazy(
  () => import("@neo/pages/Authorized/MasterData/SourceOfFund/index")
);
const PayoutMethod = lazy(
  () => import("@neo/pages/Authorized/MasterData/PayoutMethod")
);
const PayoutPartner = lazy(
  () => import("@neo/pages/Authorized/MasterData/Payout Partner")
);
const FeeAndCharges = lazy(
  () => import("@neo/pages/Authorized/FeeAndCharges/SenderServiceCharge")
);
const Occupation = lazy(
  () => import("@neo/pages/Authorized/MasterData/Occupation")
);
const MaritalStatus = lazy(
  () => import("@neo/pages/Authorized/MasterData/MaritalStatus")
);
const PromoCode = lazy(
  () => import("@neo/pages/Authorized/MasterData/PromoCode")
);
const RoleSetup = lazy(
  () => import("@neo/pages/Authorized/InternalUser/Role/")
);
const User = lazy(() => import("@neo/pages/Authorized/InternalUser/User"));

const PartnerCommission = lazy(
  () => import("@neo/pages/Authorized/FeeAndCharges/PartnerCommission")
);

const PartnerDataMapping = lazy(
  () => import("@neo/pages/Authorized/PartnerSetup/PartnerDataMapping")
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
        path: NAVIGATION_ROUTES.ACCOUNTING.LEDGER_SETUP,
        element: <LedgerSetup />
      },
      {
        path: NAVIGATION_ROUTES.ACCOUNTING.VOUCHER_ENTRY,
        element: <VoucherEntry />
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
        path: NAVIGATION_ROUTES.PAYOUT_CONFIG.BANK_WALLET_LIST,
        element: <PayoutPartner />
      },
      {
        path: NAVIGATION_ROUTES.PAYOUT_CONFIG.PAYOUT_METHOD,
        element: <PayoutMethod />
      },
      {
        path: NAVIGATION_ROUTES.MASTER_DATA.COUNTRY_SETUP,
        element: <Country />
      },
      {
        path: NAVIGATION_ROUTES.FEES_AND_CHARGES,
        element: <FeeAndCharges />
      },
      {
        path: NAVIGATION_ROUTES.PARTNER_COMMISION,
        element: <PartnerCommission />
      },
      {
        path: NAVIGATION_ROUTES.MASTER_DATA.OCCUPATION,
        element: <Occupation />
      },
      {
        path: NAVIGATION_ROUTES.MASTER_DATA.MARITAL_STATUS,
        element: <MaritalStatus />
      },
      {
        path: NAVIGATION_ROUTES.PROMO_CODE,
        element: <PromoCode />
      },
      {
        path: NAVIGATION_ROUTES.AUTOMATIC_DISCOUNT,
        element: <AutomaticDiscount />
      },
      {
        path: NAVIGATION_ROUTES.INTERNAL_USER.ROLE_SETUP,
        element: <RoleSetup />
      },
      {
        path: NAVIGATION_ROUTES.USER_MANAGEMENT.USER,
        element: <User />
      },
      {
        path: NAVIGATION_ROUTES.COUNTRY,
        element: <CounrtyDetails />
      },
      {
        path: NAVIGATION_ROUTES.PARTNERS,
        element: <PartnerSetup />
      }
    ]
  }
];
