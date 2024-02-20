import {
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";
import { imageAssets } from "@neo/assets/images";
import { svgAssets } from "@neo/assets/images/svgs";
import { NAVIGATION_ROUTES } from "@neo/pages/App/navigationRoutes";
import { colorScheme } from "@neo/theme/colorScheme";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import { navLinks } from "./navLinks";

interface SidebarProps {
  width: number;
  isCollapsed: boolean;
  animate: string;
  onEnterSidebar: () => void;
  onExitSidebar: () => void;
  isHovered: boolean;
  labelSideData?: string | number;
}

export const parentNavRoutes = {
  collapse: "/collapse"
};

export default function Sidebar({
  width,
  isCollapsed,
  animate,
  onEnterSidebar,
  onExitSidebar,
  isHovered
}: SidebarProps) {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");
  const [activeCollapse, setActiveCollapse] = useState("");

  // const { initData } = useStoreInitData();

  // parentNavList includes the collapsable sidebar elements so that when reloading we can check for and highlight the parent of selected link
  const parentNavList = [{ nav: "Collaple", url: parentNavRoutes.collapse }];

  // This useEffect sets the active sidebar link whether it is a normal link or a collapsable link or it is a child of collapsable link
  // activeCollapse checks if the url contains the parentNavList item eg http://example.com/clients/add -> here the url inclides /clients so clients is selected
  // active link selects the label from an object inside navLinks where the current window url includes the href from that object
  // if else is used to fix issue swhel reloading
  useEffect(() => {
    const url = window.location.href;
    setActiveCollapse(
      parentNavList?.find(item => url.includes(item.url))?.nav ?? ""
    );
    if (window.location.pathname == "/") {
      setActiveLink(
        navLinks?.find(item => url.includes(item.href))?.label ?? ""
      );
    } else {
      setActiveLink(
        navLinks?.find(item => item.href != "/" && url.includes(item.href))
          ?.label ?? ""
      );
    }
  }, []);

  const labelData = [{ navName: "Example", value: 10 }];

  const pendingSidebarLabels = (barName: string) => {
    const navLabelValue = labelData?.find(item => item.navName == barName);
    if (navLabelValue) {
      return navLabelValue.value ?? null;
    }
  };
  const handleLogout = () => {
    //
  };
  return (
    <Flex
      pos="fixed"
      top={0}
      h="100%"
      w={width + "px"}
      maxW={width + "px"}
      bg="white"
      transition={animate}
      zIndex={isHovered ? 11 : 10}
    >
      <VStack
        w="100%"
        as="nav"
        gap={3}
        transition="all 0.25s ease-in-out"
        onMouseEnter={onEnterSidebar}
        onMouseLeave={onExitSidebar}
      >
        <Image
          maxW="50%"
          h="50px"
          alt={"neo-logo"}
          src={imageAssets.Logo}
          objectFit="contain"
          m="auto"
          mt={4}
          mb={7}
          cursor={"pointer"}
          onClick={() => navigate("/")}
        />
        <VStack
          w="100%"
          css={{
            scrollbarGutter: "stable",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "0.6rem",
              position: "absolute",
              transitionDuration: "all 2s"
            },
            "&::-webkit-scrollbar-track": {
              position: "absolute",
              background: colorScheme.white,
              opacity: 0.1
            },
            "&::-webkit-scrollbar-thumb": {
              background: colorScheme.primary_100,
              borderRadius: 20
            }
          }}
        >
          {navLinks.map(nav => {
            return (
              <NavItem
                {...nav}
                labelSideData={pendingSidebarLabels(nav.label ?? "") ?? null}
                key={nav.href}
                collapsed={isCollapsed && !isHovered}
                animate={animate}
                active={{
                  activeLink,
                  setActiveLink,
                  activeCollapse,
                  setActiveCollapse
                }}
              />
            );
          })}
          <Button
            as={NavLink}
            to={NAVIGATION_ROUTES.LOGIN}
            onClick={handleLogout}
            background={colorScheme.white}
            _hover={{ background: colorScheme.danger_100 }}
            borderRadius={0}
            size={"lg"}
          >
            <HStack justifyContent="space-between">
              <HStack alignItems="center" flex={1}>
                <Icon as={svgAssets.Logout} fontSize="xl" mb={1} />
                <HStack
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  w={"100%"}
                >
                  <Text
                    color={colorScheme.danger_500}
                    fontSize="md"
                    fontWeight="medium"
                    whiteSpace="nowrap"
                    transition={animate}
                  >
                    LOGOUT
                  </Text>
                </HStack>
              </HStack>
            </HStack>
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
}
