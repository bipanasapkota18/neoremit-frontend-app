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
import { useLocation } from "react-router-dom";
import AddPayoutPartner from "./AddPayoutPartner";

const PayoutPartner = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");

  const onEditPayoutPartner = () => {
    //
  };
  const onDeletePayoutPartner = () => {
    //
  };
  const tableData = [
    {
      sn: 1,
      name: "Nepali Rupee",
      country: "Nepal",
      payoutMethod: "Bank",
      status: "Active"
    },
    {
      sn: 2,
      name: "US Dollar",
      country: "Nepal",
      payoutMethod: "Bank",
      status: "Active"
    },
    {
      sn: 3,
      name: "Euro",
      country: "Nepal",
      payoutMethod: "Bank",
      status: "Active"
    },
    {
      sn: 4,
      name: "British Pound",
      country: "Nepal",
      payoutMethod: "Bank",
      status: "Active"
    },
    {
      sn: 5,
      name: "Australian Dollar",
      country: "Nepal",
      payoutMethod: "Bank",
      status: "InActive"
    }
  ];
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn"
    },
    {
      header: "Partner Name",
      accessorKey: "name",
      size: 40
    },
    {
      header: "Country",
      accessorKey: "country",
      size: 30
    },
    {
      header: "Payout Method",
      accessorKey: "payoutMethod",
      size: 20
    },
    {
      header: "Status",
      accessorKey: "status",
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
              onClickAction={onEditPayoutPartner}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={onDeletePayoutPartner}
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
      <BreadCrumb currentPage="Payout Partner" options={activePath} />
      <Card
        borderRadius={"16px"}
        boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
      >
        <CardBody>
          <HStack>
            <HStack
              display="flex"
              padding="24px 20px"
              width={"100%"}
              alignItems="center"
              gap="16px"
              alignSelf="stretch"
            >
              {isDesktop ? (
                <SearchInput label="Search" name="search" type="text" />
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
              Add Payout Of Partner
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

      <AddPayoutPartner
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      />
    </Flex>
  );
};

export default PayoutPartner;
