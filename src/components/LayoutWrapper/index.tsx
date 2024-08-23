import { Box, Flex, Image } from "@chakra-ui/react";
import AppBar from "@neo/components/Header/AppBar";
import Header from "@neo/components/Header/Header";
import Sidebar from "@neo/components/SideBar";
import useWindowSize from "@neo/hooks/useWindowResize";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

import { imageAssets } from "@neo/assets/images";
import { colorScheme } from "@neo/theme/colorScheme";
import ErrorBoundary from "../ErrorBoundry";

const sidebarAnimate = "all .25s ease";
const largeSidebarWidth = 290;
const smallSidebarWidth = 64;

const LayoutWrapper: React.FC = () => {
  const { width } = useWindowSize();

  const [open, setOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const sidebarWidth = useMemo(
    () => (open ? largeSidebarWidth : smallSidebarWidth),
    [open]
  );

  const handleDrawerToggle = () => {
    setOpen(oldState => !oldState);
    setIsHovered(false);
  };

  const onEnterSidebar = () => {
    if (!open) {
      setIsHovered(true);
    }
  };
  const onExitSidebar = () => {
    if (isHovered) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    if (width < 850) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    setIsHovered(false);
  }, [width]);

  return (
    <ErrorBoundary>
      <Flex>
        <Sidebar
          width={isHovered ? largeSidebarWidth : sidebarWidth}
          isCollapsed={!open}
          animate={sidebarAnimate}
          onEnterSidebar={onEnterSidebar}
          onExitSidebar={onExitSidebar}
          isHovered={isHovered}
        />
        <Box
          flexGrow={1}
          ml={sidebarWidth + "px"}
          transition={sidebarAnimate}
          backgroundColor={"#FFFFFF"}
          zIndex={0}
          overflowX="hidden"
        >
          <AppBar zIndex={1} flex={1} position="sticky" mb={0}>
            <Header
              width={open ? largeSidebarWidth : sidebarWidth}
              handleDrawerToggle={handleDrawerToggle}
              isDrawerOpen={open}
            />
          </AppBar>
          <Suspense
            fallback={
              <Flex
                justifyContent={"center"}
                alignItems="center"
                height={"90vh"}
              >
                <Image maxHeight={"50vh"} src={imageAssets.Loader} />
              </Flex>
            }
          >
            <Box
              minHeight={"80vh"}
              px={8}
              py={8}
              bg={colorScheme.admin_background}
              borderRadius={"30px"}
            >
              <Outlet />
            </Box>
          </Suspense>
        </Box>
      </Flex>
    </ErrorBoundary>
  );
};

export default LayoutWrapper;
