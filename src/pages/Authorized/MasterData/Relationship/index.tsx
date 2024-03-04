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
import BreadCrumb from "@neo/components/BreadCrumb";
import FilterButton from "@neo/components/Button/FilterButton";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import { useLocation } from "react-router-dom";
import { svgAssets } from "../../../../assets/images/svgs/index";
import AddRelationship from "./AddRelationship";

const Relationship = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");

  const onEditRelationship = () => {
    //
  };
  const onDeleteRelationship = () => {
    //
  };
  const tableData = [
    {
      sn: 1,
      name: "Brother",

      status: "Active"
    },
    {
      sn: 2,
      name: "Sister",

      status: "Active"
    },
    {
      sn: 3,
      name: "Father",

      status: "Active"
    },
    {
      sn: 4,
      name: "Mother",
      status: "Active"
    },
    {
      sn: 5,
      name: "Cousin",
      status: "InActive"
    },
    {
      sn: 6,
      name: "Brother",

      status: "Active"
    },
    {
      sn: 7,
      name: "Sister",

      status: "Active"
    },
    {
      sn: 8,
      name: "Father",

      status: "Active"
    },
    {
      sn: 9,
      name: "Mother",

      status: "Active"
    },
    {
      sn: 10,
      name: "Cousin",

      status: "InActive"
    },
    {
      sn: 11,
      name: "Brother",

      status: "Active"
    },
    {
      sn: 12,
      name: "Sister",

      status: "Active"
    },
    {
      sn: 13,
      name: "Father",

      status: "Active"
    },
    {
      sn: 14,
      name: "Mother",

      status: "Active"
    },
    {
      sn: 15,
      name: "Cousin",

      status: "InActive"
    }
  ];
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn"
    },
    {
      header: "Relationship Name",
      accessorKey: "name",
      size: 100
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
              onClickAction={onEditRelationship}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={onDeleteRelationship}
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
      <BreadCrumb currentPage="Relationship" options={activePath} />
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
              Add Relationship
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

      <AddRelationship isOpen={isOpen} onClose={() => onClose()} />
    </Flex>
  );
};

export default Relationship;
