import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Switch,
  Text,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import BreadCrumb from "@neo/components/BreadCrumb";
import FilterButton from "@neo/components/Button/FilterButton";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";

import {
  IMaritalStatusResponse,
  useChangeMaritalStatusStatus,
  useDeleteMaritalStatus,
  useGetAllMaritalStatus
} from "@neo/services/MasterData/service-marital-status";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AddMaritalStatus from "./AddMaritalStatusModal";

const MaritalStatus = () => {
  const {
    isOpen: isOpenMaritalStatusAddModal,
    onOpen: onOpenMaritalStatusAddModal,
    onClose: onCloseMaritalStatusAddModal
  } = useDisclosure();
  const {
    isOpen: isOpenMaritalStatusDeleteModal,
    onOpen: onOpenMaritalStatusDeleteModal,
    onClose: onCloseMaritalStatusDeleteModal
  } = useDisclosure();
  const {
    isOpen: isOpenMaritalStatusStatusUpdateModal,
    onOpen: onOpenMaritalStatusStatusUpdateModal,
    onClose: onCloseMaritalStatusStatusUpdateModal
  } = useDisclosure();
  const { pathname } = useLocation();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const [searchText, setSearchText] = useState<string>("" as string);
  const [editId, setEditId] = useState(null as number | null);
  const [changeId, setChangeId] = useState(null as number | null);
  const [active, setActive] = useState(false);
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const { data: maritalStatusData, isLoading } = useGetAllMaritalStatus();
  const {
    isLoading: isToggling,
    refetch,
    isFetching
  } = useChangeMaritalStatusStatus(changeId);
  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeleteMaritalStatus();

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (data: any) => {
        return (
          <Text>
            {pageParams.pageIndex * pageParams.pageSize + data.row.index + 1}
          </Text>
        );
      }
    },
    {
      header: "Marital Status",
      accessorKey: "name",
      size: 100
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (cell: CellContext<IMaritalStatusResponse, any>) => {
        return (
          <Switch
            size="lg"
            isChecked={cell?.row?.original?.isActive}
            onChange={() => {
              setChangeId(cell?.row?.original?.id);
              setActive(cell?.row?.original?.isActive);
              onOpenMaritalStatusStatusUpdateModal();
            }}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<IMaritalStatusResponse, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id);
                onOpenMaritalStatusAddModal();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setChangeId(cell?.row?.original?.id);
                onOpenMaritalStatusDeleteModal();
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
  const handleDelete = async () => {
    await mutateDelete(changeId);
    setChangeId(null);
    onCloseMaritalStatusDeleteModal();
  };
  const handleStatusChange = async () => {
    try {
      await refetch();
      setChangeId(null);
      onCloseMaritalStatusStatusUpdateModal();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Marital Status" options={activePath} />
      <Card>
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
                  onSearch={setSearchText}
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
              onClick={onOpenMaritalStatusAddModal}
            >
              Add Marital Status
            </Button>
          </HStack>
          <DataTable
            isLoading={isLoading}
            filter={{
              globalFilter: searchText,
              setGlobalFilter: setSearchText
            }}
            pagination={{
              manual: false,
              pageParams: pageParams,
              onChangePagination: setPageParams
            }}
            data={maritalStatusData ?? []}
            columns={columns}
          />
        </CardBody>
      </Card>

      <AddMaritalStatus
        editId={editId}
        setEditId={setEditId}
        data={maritalStatusData ?? []}
        isOpen={isOpenMaritalStatusAddModal}
        onClose={() => {
          onCloseMaritalStatusAddModal();
        }}
      />
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove data file from the system. This cannot be Undone."
        isOpen={isOpenMaritalStatusDeleteModal}
        onClose={onCloseMaritalStatusDeleteModal}
      />
      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isFetching || isToggling}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} this MaritalStatus?`}
        isOpen={isOpenMaritalStatusStatusUpdateModal}
        onClose={onCloseMaritalStatusStatusUpdateModal}
      />
    </Flex>
  );
};

export default MaritalStatus;
