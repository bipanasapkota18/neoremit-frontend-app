import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Switch,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import BreadCrumb from "@neo/components/BreadCrumb";
import FilterButton from "@neo/components/Button/FilterButton";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import { NAVIGATION_ROUTES } from "@neo/pages/App/navigationRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import AddCountrySetup from "./AddCountry";

const Country = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onEditCountry = () => {
    //
  };
  const onAddState = () => {
    navigate(NAVIGATION_ROUTES.MASTER_DATA.STATE_SETUP);
  };
  const onDeleteCountry = () => {
    //
  };
  const tableData = [
    {
      sn: 1,
      name: "Nepali Rupee",
      code: "NPR",
      symbol: "Rs",
      status: "Active"
    },
    {
      sn: 2,
      name: "US Dollar",
      code: "USD",
      symbol: "$",
      status: "Active"
    },
    {
      sn: 3,
      name: "Euro",
      code: "EUR",
      symbol: "€",
      status: "Active"
    },
    {
      sn: 4,
      name: "British Pound",
      code: "GBP",
      symbol: "£",
      status: "Active"
    },
    {
      sn: 5,
      name: "Australian Dollar",
      code: "AUD",
      symbol: "A$",
      status: "InActive"
    }
  ];
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn"
    },
    {
      header: "Flag",
      accessorKey: "flag"
    },
    {
      header: "Country Name",
      accessorKey: "countryName",
      size: 50
    },
    {
      header: "Currency",
      accessorKey: "currency"
    },
    {
      header: "Country Short Name",
      accessorKey: "code",
      size: 20
    },
    {
      header: "ISO Number",
      accessorKey: "isoNumber",
      size: 20
    },
    {
      header: "Status",
      accessorKey: "status",
      size: 50,
      cell: (data: any) => {
        return (
          <Switch
            size="lg"
            isChecked={data?.row?.original?.status === "Active"}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",

      cell: () => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={onAddState}
              icon={<svgAssets.StateAddIcon />}
              label="Add State"
            />
            <TableActionButton
              onClickAction={onEditCountry}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={onDeleteCountry}
              icon={<svgAssets.DeleteButton />}
              label="Delete"
            />
          </HStack>
        );
      }
    }
  ];
  const activePath = breadcrumbTitle(pathname);

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Country Setup" options={activePath} />
      <Card
        borderRadius={"16px"}
        boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
      >
        <CardBody>
          <HStack justifyContent={"space-between"}>
            <HStack
              display="flex"
              padding="24px 20px"
              alignItems="center"
              gap="16px"
              alignSelf="stretch"
            >
              {isDesktop ? (
                <SearchInput
                  width={"450px"}
                  label="Search"
                  name="search"
                  type="text"
                />
              ) : (
                ""
              )}
              <FilterButton
                onClick={() => {
                  //
                }}
              />
            </HStack>
            <Button
              minW={"max-content"}
              leftIcon={<svgAssets.AddButton />}
              onClick={onOpen}
            >
              Add Country
            </Button>
          </HStack>
          <DataTable
            pagination={{
              manual: false
            }}
            data={tableData}
            columns={columns}
          />
        </CardBody>
      </Card>

      <AddCountrySetup
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      />
    </Flex>
  );
};

export default Country;
