import { HStack } from "@chakra-ui/react";

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
    <HStack
      bg={colorScheme.white}
      gap={8}
      pr={14}
      py={3}
      ml={isDrawerOpen ? 0 : 1.25}
      alignItems={"center"}
    >
      <LeftHeader handleDrawerToggle={handleDrawerToggle} width={width} />
      <HStack marginLeft={"auto"}></HStack>
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
