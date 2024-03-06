/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box,
  chakra,
  Collapse,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { sidebarAssets } from "@neo/assets/images/svgs/Sidebar";
import { colorScheme } from "@neo/theme/colorScheme";
import { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  icon?: any;
  href: string;
  code?: string;
  label: string;
  animate: string;
  collapsed?: boolean;
  isNotLink?: boolean;
  accessor: string[];
  childNav?: NavItemProps[];
  isChild?: boolean;
  parentNav?: string;
  labelSideData?: number | null;
  active?: {
    activeLink: string;
    setActiveLink: Dispatch<SetStateAction<string>>;
    activeCollapse: string;
    setActiveCollapse: Dispatch<SetStateAction<string>>;
  };
}

const notActiveLink = {
  background: colorScheme.white,
  "& p": {
    color: colorScheme.sideBar_text
  },
  "& div": {
    "& > svg > path": {
      fillOpacity: "gray.500"
    },
    "& > div > svg > path": {
      stroke: "none"
    }
  },
  "& > div:first-of-type": {
    visibility: "hidden"
  },
  "&:hover": {
    background: colorScheme.primary_400,
    color: colorScheme.white,
    "& p": {
      color: colorScheme.white
    },
    "svg > *": {
      filter: "brightness(10)"
    },
    "& > div:first-of-type": {
      visibility: "visible"
    }
  }
};

export default function NavItem({
  icon,
  href,
  label,
  labelSideData,
  animate,
  collapsed,
  isNotLink,
  childNav,
  parentNav,
  isChild,
  active
}: NavItemProps) {
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const Link = chakra(NavLink);

  useEffect(() => {
    if (label != active?.activeCollapse && active?.activeCollapse != "") {
      onClose();
    } else if (isNotLink && label == active?.activeCollapse) onOpen();
  }, [active?.activeCollapse]);

  const handleNavLinkClick = (e: React.MouseEvent) => {
    if (isNotLink) {
      e.preventDefault();
      onToggle();
    } else {
      if (isChild) {
        active?.setActiveCollapse(parentNav ?? "");
      } else {
        active?.setActiveCollapse("");
      }
      active?.setActiveLink(label);
    }
  };

  const isLinkActive =
    isNotLink &&
    ((isOpen && active?.activeCollapse !== label) ||
      (!isOpen && active?.activeCollapse !== label));

  return (
    <Fragment>
      <Link
        as={NavLink}
        end={!isNotLink}
        to={isNotLink ? "#" : href}
        onClick={handleNavLinkClick}
        __css={
          active?.activeLink == label &&
          (window.location.pathname == "/"
            ? false
            : window.location.href.includes(href))
            ? {
                background: colorScheme.primary_300,
                "& p": {
                  color: colorScheme.search_icon
                },
                "svg > *": {
                  filter: "brightness(10)"
                },
                "& > div:first-of-type": {
                  visibility: "visible",
                  background: colorScheme.primary_400,
                  width: 2
                }
              }
            : {
                "&:hover": {
                  background: colorScheme.sidebar_hover,
                  color: colorScheme.search_icon,
                  "& p": {
                    color: colorScheme.search_icon
                  },
                  "svg > *": {
                    filter: "brightness(1.5)"
                  }
                }
              }
        }
        _activeLink={
          isLinkActive
            ? notActiveLink
            : {
                background: colorScheme.sidebar_selected,

                "& p": {
                  color: colorScheme.white
                },
                "svg > *": {
                  filter: "brightness(10)"
                },
                "& > div:first-of-type": {
                  visibility: "visible",
                  width: 1,
                  background: colorScheme.primary_100
                }
              }
        }
        pos="relative"
        px={5}
        py={4}
        w="100%"
        _hover={{
          textDecoration: "none"
        }}
      >
        <Box
          visibility="hidden"
          pos="absolute"
          h="100%"
          w={1}
          top={0}
          right={0}
          // bg={colorScheme.purple_100}
          borderTopLeftRadius={10}
          borderBottomLeftRadius={10}
        />

        <HStack justifyContent="space-between">
          <HStack alignItems="center" flex={1}>
            {icon && <Icon as={icon} fontSize="xl" mb={1} />}
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"100%"}
            >
              <Text
                // color={colorScheme.sideBar_text}
                fontSize="12px"
                fontWeight={800}
                letterSpacing={"0.12px"}
                whiteSpace="nowrap"
                visibility={collapsed ? "hidden" : "visible"}
                transition={animate}
              >
                {label.toUpperCase()}
              </Text>
              {labelSideData && (
                <Box
                  sx={{
                    w: "30px",
                    h: "25px",
                    textAlign: "center",
                    background: colorScheme.white,
                    color: colorScheme.sideBar_text,
                    fontWeight: "bold",
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {labelSideData}
                </Box>
              )}
            </HStack>
          </HStack>
          {isNotLink && (
            <Icon
              as={sidebarAssets.SidebarDropdown}
              width={"24px"}
              height={"24px"}
              transform={isOpen ? "" : "rotate(-90deg)"}
            />
          )}
        </HStack>
      </Link>
      <Collapse
        animate
        in={isOpen && !collapsed}
        style={{
          width: "inherit",
          overflow: "visible",

          margin: "0px"
        }}
      >
        <VStack w="95%" m="auto">
          {childNav?.map((child, index) => (
            <NavItem
              {...child}
              key={`child-nav${index}`}
              isChild
              active={active}
              parentNav={label}
            />
          ))}
        </VStack>
      </Collapse>
    </Fragment>
  );
}
