import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Switch,
  useBoolean,
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
import AddFeeandCharges from "./AddFeeandCharges";

const FeeAndCharges = () => {
  const [flag, setFlag] = useBoolean();
  const { pathname } = useLocation();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");

  const onEditFeeAndCharges = () => {
    //
  };
  const onDeleteFeeAndCharges = () => {
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
      header: "Fee Name",
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
      size: 20,
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
              onClickAction={onEditFeeAndCharges}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={onDeleteFeeAndCharges}
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
      <BreadCrumb
        currentPage={flag ? "Fee and Charges Setup" : "Fee and Charges"}
        options={activePath}
      />
      <Card
        borderRadius={"16px"}
        boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
      >
        <CardBody>
          {flag ? (
            <AddFeeandCharges
              onClose={() => {
                setFlag.off();
              }}
            />
          ) : (
            <>
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
                  onClick={setFlag.on}
                >
                  Add Fees and Charges
                </Button>
              </HStack>
              <DataTable
                pagination={{
                  manual: false
                }}
                data={tableData}
                columns={columns}
              />{" "}
            </>
          )}
        </CardBody>
      </Card>
    </Flex>
  );
};

export default FeeAndCharges;
