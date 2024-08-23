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
  IOccupationResponse,
  useDeleteOccupation,
  useGetAllOccupation,
  useToggleOccupationStatus
} from "@neo/services/MasterData/service-occupation";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AddOccupation from "./AddOccupationModal";

const Occupation = () => {
  const {
    isOpen: isOpenOccupationAddModal,
    onOpen: onOpenOccupationAddModal,
    onClose: onCloseOccupationAddModal
  } = useDisclosure();
  const {
    isOpen: isOpenOccupationDeleteModal,
    onOpen: onOpenOccupationDeleteModal,
    onClose: onCloseOccupationDeleteModal
  } = useDisclosure();
  const {
    isOpen: isOpenOccupationStatusUpdateModal,
    onOpen: onOpenOccupationStatusUpdateModal,
    onClose: onCloseOccupationStatusUpdateModal
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
  const { data: occupationData, isLoading } = useGetAllOccupation();
  const {
    isLoading: isToggling,
    refetch,
    isFetching
  } = useToggleOccupationStatus(changeId);
  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeleteOccupation();

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
      header: "Occupation",
      accessorKey: "name",
      size: 100
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (cell: CellContext<IOccupationResponse, any>) => {
        return (
          <Switch
            size="lg"
            isChecked={cell?.row?.original?.isActive}
            onChange={() => {
              setChangeId(cell?.row?.original?.id);
              setActive(cell?.row?.original?.isActive);
              onOpenOccupationStatusUpdateModal();
            }}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<IOccupationResponse, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id);
                onOpenOccupationAddModal();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setChangeId(cell?.row?.original?.id);
                onOpenOccupationDeleteModal();
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
    onCloseOccupationDeleteModal();
  };
  const handleStatusChange = async () => {
    try {
      await refetch();
      setChangeId(null);
      onCloseOccupationStatusUpdateModal();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Occupation" options={activePath} />
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
              onClick={onOpenOccupationAddModal}
            >
              Add Occupation
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
            data={occupationData ?? []}
            columns={columns}
          />
        </CardBody>
      </Card>

      <AddOccupation
        editId={editId}
        setEditId={setEditId}
        data={occupationData ?? []}
        isOpen={isOpenOccupationAddModal}
        onClose={() => {
          onCloseOccupationAddModal();
        }}
      />
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this data from the system. This cannot be Undone."
        isOpen={isOpenOccupationDeleteModal}
        onClose={onCloseOccupationDeleteModal}
      />
      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isFetching || isToggling}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} this occupation?`}
        isOpen={isOpenOccupationStatusUpdateModal}
        onClose={onCloseOccupationStatusUpdateModal}
      />
    </Flex>
  );
};

export default Occupation;
