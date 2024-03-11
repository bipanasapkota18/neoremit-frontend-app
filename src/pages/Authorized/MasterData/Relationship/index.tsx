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
import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import {
  useDeleteRelationship,
  useGetAllRelationShip,
  useGetRelationshipById,
  useUpdateRelationship
} from "@neo/services/MasterData/service-relationship";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { svgAssets } from "../../../../assets/images/svgs/index";
import { IRelationshipResponse } from "../../../../services/MasterData/service-relationship";
import AddRelationship from "./AddRelationship";

const Relationship = () => {
  const {
    isOpen: isOpenAddRelationshipModal,
    onOpen: onOpenAddRelationshipModal,
    onClose: onCloseAddRelationshipModal
  } = useDisclosure();
  const {
    isOpen: isOpenRelationshipDeleteModal,
    onOpen: onOpenRelationshipDeleteModal,
    onClose: onCloseRelationshipDeleteModal
  } = useDisclosure();
  const {
    isOpen: isOpenRelationshipStatusUpdateModal,
    onOpen: onOpenRelationshipStatusUpdateModal,
    onClose: onCloseRelationshipStatusUpdateModal
  } = useDisclosure();
  const { pathname } = useLocation();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");

  const [editId, setEditId] = useState(null as number | null);
  const [changeId, setChangeId] = useState(null as number | null);
  const [active, setActive] = useState(false);
  const [searchText, setSearchText] = useState<string>("" as string);
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const { data: editData } = useGetRelationshipById(changeId);
  const {
    mutateAsync: mutateUpdateRelationship,
    isLoading: isStatusUPdateLoading
  } = useUpdateRelationship();
  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeleteRelationship();
  const { data: tableData, isLoading: isRelationLoading } =
    useGetAllRelationShip();

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (data: any) => {
        return data?.row?.index + 1;
      }
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
            isChecked={data?.row?.original?.isActive}
            onChange={() => {
              setActive(data?.row?.original?.isActive);
              setChangeId(data?.row?.original?.id);
              onOpenRelationshipStatusUpdateModal();
            }}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<IRelationshipResponse, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id || null);
                onOpenAddRelationshipModal();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setChangeId(cell?.row?.original?.id || null);
                onOpenRelationshipDeleteModal();
              }}
              icon={<svgAssets.DeleteButton />}
              label="Delete"
            />
          </HStack>
        );
      }
    }
  ];
  const activePath = breadcrumbTitle(pathname);
  const handleDelete = () => {
    mutateDelete(changeId);
    setChangeId(null);
    onCloseRelationshipDeleteModal();
  };
  const handleStatusChange = () => {
    if (changeId !== null) {
      mutateUpdateRelationship({
        id: changeId,
        data: {
          code: editData?.data?.data?.code ?? "",
          name: editData?.data?.data?.name ?? "",

          isActive: !active
        }
      });
    }
    setChangeId(null);
    onCloseRelationshipStatusUpdateModal();
  };

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
                  onSearch={setSearchText}
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
              onClick={() => {
                onOpenAddRelationshipModal();
              }}
            >
              Add Relationship
            </Button>
          </HStack>
          <DataTable
            pagination={{
              manual: false,
              pageParams: pageParams,
              onChangePagination: setPageParams
            }}
            data={tableData ?? []}
            isLoading={isRelationLoading}
            columns={columns}
            filter={{
              globalFilter: searchText,
              setGlobalFilter: setSearchText
            }}
          />
        </CardBody>
      </Card>
      <AddRelationship
        editId={editId ?? null}
        setEditId={setEditId}
        isOpen={isOpenAddRelationshipModal}
        onClose={() => {
          setEditId(null);
          onCloseAddRelationshipModal();
        }}
      />
      <ConfirmationModal
        isDeleting={isDeleteLoading}
        onDelete={handleDelete}
        confirmationText="Are you sure you want to delete this Relationship?"
        isOpen={isOpenRelationshipDeleteModal}
        onClose={() => {
          setChangeId(null);
          onCloseRelationshipDeleteModal();
        }}
      />
      <ConfirmationModal
        isDeleting={isStatusUPdateLoading}
        onDelete={handleStatusChange}
        confirmationText={`Are you sure you want to ${active ? "Disable" : "Enable"} this relationship?`}
        isOpen={isOpenRelationshipStatusUpdateModal}
        onClose={() => {
          setChangeId(null);
          onCloseRelationshipStatusUpdateModal();
        }}
      />
    </Flex>
  );
};

export default Relationship;
