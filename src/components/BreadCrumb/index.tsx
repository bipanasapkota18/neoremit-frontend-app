import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  HStack,
  Icon,
  Text
} from "@chakra-ui/react";
import { colorScheme } from "@neo/theme/colorScheme";
import { Link } from "react-router-dom";
import { sidebarAssets } from "../../assets/images/svgs/Sidebar/index";
import GoBack from "../Button/GoBack";

const BreadCrumb = ({ options, currentPage }: BreadCrumbProps) => {
  return (
    <Flex justifyContent="space-between">
      <HStack>
        <GoBack isIcon onClick={() => console.log("first")} />
        <Text
          fontSize="24px"
          fontStyle="normal"
          fontWeight={700}
          lineHeight="normal"
          color={colorScheme.gray_700}
        >
          {currentPage}
        </Text>
      </HStack>
      <Breadcrumb
        fontSize="14px"
        fontStyle="normal"
        fontWeight={400}
        lineHeight="22px"
        gap={"16px"}
        separator={<sidebarAssets.Ellipse />}
      >
        {options?.map(option => (
          <BreadcrumbItem key={option.label}>
            {option.icon && (
              <Icon width={"20px"} height={"20px"} as={option.icon} />
            )}
            <BreadcrumbLink
              as={Link}
              mr={"3px"}
              color={
                option.label === "Home"
                  ? colorScheme.search_icon
                  : colorScheme.primary_400
              }
              to={option.href || "#"}
            >
              {option.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Flex>
  );
};

export default BreadCrumb;
type BreadCrumbProps = {
  options: Array<{
    label: string;
    href?: string;
    icon?: React.ComponentType<{ width: string; height: string }>;
    options?: unknown[];
  }>;

  currentPage: string;
};
