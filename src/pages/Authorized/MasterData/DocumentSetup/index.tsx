import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Switch,
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
import AddDocument from "./AddDocument";

const Document = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const onEditDocument = () => {
    //
  };
  const onDeleteDocument = () => {
    //
  };
  const tableData = [
    {
      sn: 1,
      name: "Brother",
      extension: ["pdf", "docx"],
      size: "2MB",
      status: "Active"
    },
    {
      sn: 2,
      name: "Sister",
      extension: "pdf",
      size: "2MB",
      status: "Active"
    },
    {
      sn: 3,
      name: "Father",
      extension: ["pdf", "docx"],
      size: "2MB",
      status: "Active"
    },
    {
      sn: 4,
      name: "Mother",
      extension: "pdf",
      size: "2MB",
      status: "Active"
    },
    {
      sn: 5,
      name: "Cousin",
      extension: "pdf",
      size: "2MB",
      status: "InActive"
    },
    {
      sn: 6,
      name: "Brother",
      extension: "pdf",
      size: "2MB",
      status: "Active"
    },
    {
      sn: 7,
      name: "Sister",
      extension: ["pdf", "docx"],
      size: "2MB",
      status: "Active"
    }
  ];
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn"
    },
    {
      header: "Document Name",
      accessorKey: "name"
    },

    {
      header: "Allow Extension",
      accessorKey: "extension"
    },
    {
      header: "Document Size( in MB)",
      accessorKey: "size"
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (data: any) => {
        return (
          <Switch
            name="status"
            size="lg"
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
              onClickAction={onEditDocument}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={onDeleteDocument}
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
      <BreadCrumb currentPage="Document Setup" options={activePath} />
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
              minW={"max-content"}
              leftIcon={<svgAssets.AddButton />}
              onClick={onOpen}
            >
              Add Document
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
        title="Add Document"
      >
        <AddDocument />
      </Modal>
    </Flex>
  );
};

export default Document;
