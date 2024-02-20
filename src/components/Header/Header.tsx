import { HStack, Stack } from "@chakra-ui/react";

import * as React from "react";

import { colorScheme } from "@neo/theme/colorScheme";
import { LeftHeader } from "./Header.Left";
import { RightHeader } from "./Header.Right";

export type HeaderAnchor = null | Element | ((element: Element) => Element);

interface HeaderProps {
  handleDrawerToggle: () => void;
  width: number;
  isDrawerOpen: boolean;
}

const mobileMenuId = "primary-search-account-menu-mobile";

const Header = ({ handleDrawerToggle, width, isDrawerOpen }: HeaderProps) => {
  // const { initData } = useStoreInitData();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<HeaderAnchor>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  return (
    <HStack bg={colorScheme.white} pr={14} py={3} ml={isDrawerOpen ? 0 : 1.25}>
      <LeftHeader handleDrawerToggle={handleDrawerToggle} width={width} />
      <Stack
        direction={"row"}
        sx={{ flexGrow: 1 }}
        px={3}
        justifyContent="flex-end"
        alignItems="center"
      ></Stack>
      <RightHeader
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        mobileMenuId={mobileMenuId}
        handleMobileMenuClose={handleMobileMenuClose}
      />
    </HStack>
  );
};

export default Header;
