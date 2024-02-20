import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Switch,
  useDisclosure
} from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import BreadCrumb from "@neo/components/BreadCrumb";
import FilterButton from "@neo/components/Button/FilterButton";
import { DataTable } from "@neo/components/DataTable";
import ActionButtons from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import Modal from "@neo/components/Modal";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import { useLocation } from "react-router-dom";
import AddCurrency from "./AddCurrency";

const Currency = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const onEditCurrency = () => {
    //
  };
  const onDeleteCurrency = () => {
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
      header: "Name",
      accessorKey: "name"
    },
    {
      header: "Code",
      accessorKey: "code"
    },
    {
      header: "Symbol",
      accessorKey: "symbol"
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (data: any) => {
        return (
          <Switch
            size="lg"
            colorScheme="facebook"
            isChecked={data?.row?.original?.status === "Active"}
            // disabled
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: () => {
        return (
          <ActionButtons
            onClickDelete={onDeleteCurrency}
            onClickEdit={onEditCurrency}
          />
        );
      }
    }
  ];
  const activePath = breadcrumbTitle(pathname);

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Currency" options={activePath} />
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
              <SearchInput label="Search" name="search" type="text" />
              <FilterButton
                onClick={() => {
                  //
                }}
              />
            </HStack>
            <Button
              marginRight="auto"
              marginLeft={"auto"}
              width={{ sm: "50%", md: "80%", lg: "20%" }}
              leftIcon={<svgAssets.AddButton />}
              onClick={onOpen}
            >
              Add Currency
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        submitButtonText="Add"
        cancelButtonText="Cancel"
        title="Add Currency"
      >
        <AddCurrency />
      </Modal>
    </Flex>
  );
};

export default Currency;
