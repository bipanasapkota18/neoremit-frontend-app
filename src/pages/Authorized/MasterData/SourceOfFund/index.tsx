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
import BreadCrumb from "@neo/components/BreadCrumb";
import FilterButton from "@neo/components/Button/FilterButton";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import {
  ISourceOfFundResponse,
  useDeleteSourceOfFund,
  useGetAllSourceOfFund,
  useToggleSourceStatus
} from "@neo/services/MasterData/service-source-of-fund";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { svgAssets } from "../../../../assets/images/svgs/index";
import AddSourceOfFund from "./AddSourceOfFund";

const SourceOfFund = () => {
  const {
    isOpen: isOpenAddSourceModal,
    onOpen: onOpenAddSourceModal,
    onClose: onCloseAddSourceModal
  } = useDisclosure();
  const {
    isOpen: isOpenSourceDeleteModal,
    onOpen: onOpenSourceDeleteModal,
    onClose: onCloseSourceDeleteModal
  } = useDisclosure();
  const {
    isOpen: isOpenSourceStatusUpdateModal,
    onOpen: onOpenSourceStatusUpdateModal,
    onClose: onCloseSourceStatusUpdateModal
  } = useDisclosure();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const [tableData, setTableData] = useState<
    ISourceOfFundResponse[] | undefined
  >();
  const [editId, setEditId] = useState(null as number | null);
  const [searchText, setSearchText] = useState<string>("" as string);
  const [changeId, setChangeId] = useState(null as number | null);
  const [active, setActive] = useState(false);
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const {
    data: sourceOfFundData,
    mutateAsync,
    isLoading
  } = useGetAllSourceOfFund();
  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeleteSourceOfFund();
  const {
    isLoading: isToggling,
    refetch,
    isFetching
  } = useToggleSourceStatus(changeId);
  useEffect(() => {
    setTableData(sourceOfFundData?.data?.data ?? []);
  }, [sourceOfFundData]);
  useEffect(() => {
    mutateAsync({
      pageParams: { page: pageParams.pageIndex, size: pageParams.pageSize },
      filterParams: {}
    });
  }, [pageParams.pageIndex, pageParams.pageSize]);
  const refetchData = () => {
    mutateAsync({
      pageParams: { page: pageParams.pageIndex, size: pageParams.pageSize },
      filterParams: {}
    });
  };
  const { pathname } = useLocation();
  const handleDelete = async () => {
    await mutateDelete(changeId);
    setChangeId(null);
    onCloseSourceDeleteModal();
    refetchData();
  };
  const handleStatusChange = async () => {
    try {
      await refetch();
      setChangeId(null);
      refetchData();
      onCloseSourceStatusUpdateModal();
    } catch (e) {
      console.error(e);
    }
  };

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (cell: CellContext<ISourceOfFundResponse, any>) => {
        return (
          <Text>
            {pageParams.pageIndex * pageParams.pageSize + cell.row.index + 1}
          </Text>
        );
      }
    },
    {
      header: "Source of fund",
      accessorKey: "name",
      size: 100
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (cell: CellContext<ISourceOfFundResponse, any>) => {
        return (
          <Switch
            name="status"
            size="lg"
            colorScheme="facebook"
            isChecked={cell?.row?.original?.isActive}
            onChange={() => {
              setActive(cell?.row?.original?.isActive);
              setChangeId(cell?.row?.original?.id);
              onOpenSourceStatusUpdateModal();
            }}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<ISourceOfFundResponse, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id);
                onOpenAddSourceModal();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setChangeId(cell?.row?.original?.id);
                onOpenSourceDeleteModal();
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
  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Source Of Fund" options={activePath} />
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
              onClick={onOpenAddSourceModal}
            >
              Add Source of Fund
            </Button>
          </HStack>
          <DataTable
            pagination={{
              manual: false,
              pageParams: pageParams,
              onChangePagination: setPageParams
            }}
            filter={{
              globalFilter: searchText,
              setGlobalFilter: setSearchText
            }}
            data={tableData ?? []}
            columns={columns}
            isLoading={isLoading}
          />
        </CardBody>
      </Card>

      <AddSourceOfFund
        data={tableData ?? []}
        refetchData={refetchData}
        editId={editId}
        setEditId={setEditId}
        isOpen={isOpenAddSourceModal}
        onClose={() => onCloseAddSourceModal()}
      />

      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this data from the system. This cannot be Undone."
        isOpen={isOpenSourceDeleteModal}
        onClose={onCloseSourceDeleteModal}
      />
      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isFetching || isToggling}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} this source of fund?`}
        isOpen={isOpenSourceStatusUpdateModal}
        onClose={onCloseSourceStatusUpdateModal}
      />
    </Flex>
  );
};

export default SourceOfFund;
