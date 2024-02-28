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
import ActionButtons from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import Modal from "@neo/components/Modal";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import { useLocation } from "react-router-dom";
import AddPurpose from "./AddPurpose";

const PurposeOfPayment = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");

  const onEditPurposeOfPayment = () => {
    //
  };
  const onDeletePurposeOfPayment = () => {
    //
  };
  const tableData = [
    {
      sn: 1,
      name: "Nepali Rupee",

      status: "Active"
    },
    {
      sn: 2,
      name: "US Dollar",

      status: "Active"
    },
    {
      sn: 3,
      name: "Euro",

      status: "Active"
    },
    {
      sn: 4,
      name: "British Pound",

      status: "Active"
    },
    {
      sn: 5,
      name: "Australian Dollar",

      status: "InActive"
    }
  ];
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn"
    },
    {
      header: "Purpose Name",
      accessorKey: "name"
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
          <ActionButtons
            onClickDelete={onDeletePurposeOfPayment}
            onClickEdit={onEditPurposeOfPayment}
          />
        );
      }
    }
  ];
  const activePath = breadcrumbTitle(pathname);

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Purpose Of Payment" options={activePath} />
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
              marginRight="auto"
              marginLeft={"auto"}
              overflow={"hidden"}
              width={{ sm: "100%", md: "100%", lg: "90%" }}
              leftIcon={<svgAssets.AddButton />}
              onClick={onOpen}
            >
              Add Purpose Of Payment
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
        title="Add Purpose of Payment"
      >
        <AddPurpose />
      </Modal>
    </Flex>
  );
};

export default PurposeOfPayment;
