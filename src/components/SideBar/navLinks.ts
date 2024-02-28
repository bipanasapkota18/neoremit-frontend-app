import { sidebarAssets } from "@neo/assets/images/svgs/Sidebar";
import { NAVIGATION_ROUTES } from "@neo/pages/App/navigationRoutes";
import { ComponentProps } from "react";
import { FaIcons } from "react-icons/fa";
import NavItem from "./NavItem";

export const navLinks = [
  {
    icon: sidebarAssets.Dashboard,
    href: NAVIGATION_ROUTES.DASHBOARD,
    label: "Dashboard"
  },

  {
    icon: sidebarAssets.ProfileCircle,
    href: NAVIGATION_ROUTES.COLLAPSE,
    label: "User Management",
    isNotLink: true,
    childNav: [
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.USER_MANAGEMENT.ROLES,
        label: "Roles"
      },
      {
        icon: sidebarAssets.Ellipse,
        href: NAVIGATION_ROUTES.USER_MANAGEMENT.USER,
        label: "User"
      }
    ]
  },
  {
    icon: sidebarAssets.MasterData,
    href: NAVIGATION_ROUTES.COLLAPSE,
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
        icon: sidebarAssets.Currency,
        href: NAVIGATION_ROUTES.MASTER_DATA.DOCUMENT_SETUP,
        label: "Document Setup"
      }
    ]
  },
  {
    icon: sidebarAssets.Partners,
    href: NAVIGATION_ROUTES.PARTNERS,
    label: "Partners"
  },

  {
    icon: FaIcons,
    href: NAVIGATION_ROUTES.EXAMPLE,
    label: "Example"
  }
] as ComponentProps<typeof NavItem>[];
