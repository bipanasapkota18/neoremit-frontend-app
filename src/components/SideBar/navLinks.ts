import { NAVIGATION_ROUTES } from "@/pages/App/navigationRoutes";
import { ComponentProps } from "react";
import { FaIcons } from "react-icons/fa";
import NavItem from "./NavItem";

export const navLinks = [
  {
    icon: FaIcons,
    href: NAVIGATION_ROUTES.HOME,
    label: "Home"
  },

  {
    icon: FaIcons,
    href: NAVIGATION_ROUTES.COLLAPSE,
    label: "Collapse",
    isNotLink: true,
    childNav: [
      {
        icon: FaIcons,
        href: NAVIGATION_ROUTES.DASHBOARD,
        label: "Dashboard"
      }
    ]
  },
  {
    icon: FaIcons,
    href: NAVIGATION_ROUTES.EXAMPLE,
    label: "Example"
  }
] as ComponentProps<typeof NavItem>[];
