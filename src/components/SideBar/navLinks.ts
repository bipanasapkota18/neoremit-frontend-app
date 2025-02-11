import { sidebarAssets } from "@neo/assets/images/svgs/Sidebar";
import { NAVIGATION_ROUTES } from "@neo/pages/App/navigationRoutes";
import { ComponentProps } from "react";
import NavItem from "./NavItem";

export const navLinks = [
  {
    icon: sidebarAssets.Dashboard,
    href: NAVIGATION_ROUTES.DASHBOARD,
    label: "Dashboard"
  },

  {
    icon: sidebarAssets.MasterData,
    label: "Master Data",
    isNotLink: true,
    childNav: [
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.MASTER_DATA.CURRENCY_SETUP,
        label: "Currency"
      },
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.MASTER_DATA.RELATIONSHIP,
        label: "Relationship"
      },
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.MASTER_DATA.PURPOSE_OF_PAYMENT,
        label: "Purpose of Payment"
      },
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.MASTER_DATA.DOCUMENT_SETUP,
        label: "Document Setup"
      },
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.MASTER_DATA.SOURCE_OF_FUND,
        label: "Source of Fund"
      },

      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.MASTER_DATA.OCCUPATION,
        label: "Occupation"
      },
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.MASTER_DATA.MARITAL_STATUS,
        label: "Marital Status"
      }
    ]
  },
  {
    icon: sidebarAssets.CountryFlag,
    href: NAVIGATION_ROUTES.COUNTRY_SETUP,
    label: "Country Setup"
  },

  {
    icon: sidebarAssets.MasterData,
    label: "Payout Configuration",
    isNotLink: true,
    childNav: [
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.PAYOUT_CONFIG.BANK_WALLET_LIST,
        label: "Bank/Wallet List"
      },
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.PAYOUT_CONFIG.PAYOUT_METHOD,
        label: "Payout Method"
      }
    ]
  },

  {
    icon: sidebarAssets.MasterData,
    // href: NAVIGATION_ROUTES.COLLAPSE,
    label: "Fee and Charges",
    isNotLink: true,
    childNav: [
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.FEES_AND_CHARGES,
        label: "Sender Service Charge"
      },
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.PARTNER_COMMISION,
        label: "Payout Partner Commission"
      }
    ]
  },
  {
    icon: sidebarAssets.MasterData,
    href: NAVIGATION_ROUTES.PROMO_CODE,
    label: "Promo Code"
  },
  {
    icon: sidebarAssets.MasterData,
    href: NAVIGATION_ROUTES.AUTOMATIC_DISCOUNT,
    label: "Automatic Discount"
  },
  {
    icon: sidebarAssets.ProfileCircle,
    label: "User Management",
    isNotLink: true,
    childNav: [
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.INTERNAL_USER.ROLE_SETUP,
        label: "Role Setup"
      },
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.USER_MANAGEMENT.USER,
        label: "User"
      }
    ]
  },
  {
    icon: sidebarAssets.Partners,
    href: NAVIGATION_ROUTES.PARTNERS,
    label: "Partner Setup"
  },
  {
    icon: sidebarAssets.MasterData,
    label: "Accounting",
    isNotLink: true,
    childNav: [
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.ACCOUNTING.LEDGER_SETUP,
        label: "Ledger Setup"
      },
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.ACCOUNTING.VOUCHER_ENTRY,
        label: "Voucher Entry"
      }
    ]
  }

  // {
  //   icon: FaIcons,
  //   href: NAVIGATION_ROUTES.EXAMPLE,
  //   label: "Example"
  // }
] as ComponentProps<typeof NavItem>[];
