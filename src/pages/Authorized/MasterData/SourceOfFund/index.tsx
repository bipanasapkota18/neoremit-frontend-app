import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Switch,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import BreadCrumb from "@neo/components/BreadCrumb";
import FilterButton from "@neo/components/Button/FilterButton";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import Modal from "@neo/components/Modal";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import { useLocation } from "react-router-dom";
import { svgAssets } from "../../../../assets/images/svgs/index";
import AddSourceOfFund from "./AddSourceOfFund";

const SourceOfFund = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const onEditSourceOfFund = () => {
    //
  };
  const onDeleteSourceOfFund = () => {
    //
  };
  const tableData = [
    {
      sn: 1,
      sourceOfFund: "Brother",

      status: "Active"
    },
    {
      sn: 2,
      sourceOfFund: "Sister",

      status: "Active"
    },
    {
      sn: 3,
      sourceOfFund: "Father",

      status: "Active"
    },
    {
      sn: 4,
      sourceOfFund: "Mother",
      status: "Active"
    },
    {
      sn: 5,
      sourceOfFund: "Cousin",
      status: "InActive"
    },
    {
      sn: 6,
      sourceOfFund: "Brother",

      status: "Active"
    },
    {
      sn: 7,
      sourceOfFund: "Sister",

      status: "Active"
    },
    {
      sn: 8,
      sourceOfFund: "Father",
      status: "Active"
    },
    {
      sn: 9,
      sourceOfFund: "Mother",

      status: "Active"
    }
  ];
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn"
    },
    {
      header: "Source of fund",
      accessorKey: "sourceOfFund",
      size: 100,
      cell: (data: any) => {
        return <Text>{data?.row?.original?.sourceOfFund}</Text>;
      }
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (data: any) => {
        return (
          <Switch
            name="status"
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
          <HStack>
            <TableActionButton
              onClickAction={onEditSourceOfFund}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={onDeleteSourceOfFund}
              icon={<svgAssets.DeleteButton />}
              label="Edit"
            />
          </HStack>
        );
      }
    }
  ];
  const activePath = breadcrumbTitle(pathname);
  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="SourceOfFund" options={activePath} />
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
              // marginRight="auto"
              // marginLeft={"auto"}
              // width={{ sm: "50%", md: "80%", lg: "20%" }}
              minW={"max-content"}
              leftIcon={<svgAssets.AddButton />}
              onClick={onOpen}
            >
              Add Source of Fund
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
        title="Add SourceOfFund"
      >
        <AddSourceOfFund />
      </Modal>
    </Flex>
  );
};

export default SourceOfFund;
