import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  HStack,
  Icon,
  Text,
  useMediaQuery
} from "@chakra-ui/react";
import { colorScheme } from "@neo/theme/colorScheme";
import { useNavigate } from "react-router-dom";
import { sidebarAssets } from "../../assets/images/svgs/Sidebar/index";
import GoBack from "../Button/GoBack";

const BreadCrumb = ({
  options,
  currentPage,
  customOnClick
}: BreadCrumbProps) => {
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  return (
    <Flex justifyContent="space-between" alignItems={"center"}>
      <HStack>
        <GoBack
          isIcon
          onClick={() => {
            customOnClick?.trigger ? customOnClick?.func() : navigate(-1);
          }}
        />
        <Text
          fontSize={isDesktop ? "24px" : "20px"}
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
              mr={"3px"}
              color={
                option.label === "Home"
                  ? colorScheme.search_icon
                  : colorScheme.primary_400
              }
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
    icon?: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
      }
    >;
    options?: unknown[];
  }>;
  customOnClick?: { trigger: boolean; func: () => void };
  currentPage: string;
};
