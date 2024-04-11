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
  IPurposeResponse,
  useDeletePurpose,
  useGetAllPurpose,
  useTogglePurposeStatus
} from "@neo/services/MasterData/service-purposeofpayment";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddPurpose from "./AddPurpose";

const PurposeOfPayment = () => {
  const {
    isOpen: isOpenPurposeAddModal,
    onOpen: onOpenPurposeAddModal,
    onClose: onClosePurposeAddModal
  } = useDisclosure();
  const {
    isOpen: isOpenPurposeDeleteModal,
    onOpen: onOpenPurposeDeleteModal,
    onClose: onClosePurposeDeleteModal
  } = useDisclosure();
  const {
    isOpen: isOpenPurposeStatusUpdateModal,
    onOpen: onOpenPurposeStatusUpdateModal,
    onClose: onClosePurposeStatusUpdateModal
  } = useDisclosure();
  const { pathname } = useLocation();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const [searchText, setSearchText] = useState<string>("" as string);
  const [editId, setEditId] = useState(null as number | null);
  const [changeId, setChangeId] = useState(null as number | null);
  const [active, setActive] = useState(false);

  const [tableData, setTableData] = useState<IPurposeResponse[] | undefined>();
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const { data: purposeData, mutateAsync, isLoading } = useGetAllPurpose();
  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeletePurpose();
  const {
    isLoading: isToggling,
    refetch,
    isFetching
  } = useTogglePurposeStatus(changeId);
  useEffect(() => {
    if (Array.isArray(purposeData?.data?.data)) {
      setTableData(purposeData?.data?.data);
    }
  }, [purposeData]);
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
      header: "Purpose Name",
      accessorKey: "name",
      size: 100
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (cell: CellContext<IPurposeResponse, any>) => {
        return (
          <Switch
            size="lg"
            isChecked={cell?.row?.original?.isActive}
            onChange={() => {
              setChangeId(cell?.row?.original?.id);
              setActive(cell?.row?.original?.isActive);
              onOpenPurposeStatusUpdateModal();
            }}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<IPurposeResponse, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id);
                onOpenPurposeAddModal();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setChangeId(cell?.row?.original?.id);
                onOpenPurposeDeleteModal();
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
    onClosePurposeDeleteModal();
    refetchData();
  };
  const handleStatusChange = async () => {
    try {
      await refetch();
      setChangeId(null);
      refetchData();
      onClosePurposeStatusUpdateModal();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Purpose Of Payment" options={activePath} />
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
              onClick={onOpenPurposeAddModal}
            >
              Add Purpose Of Payment
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
            data={tableData ?? []}
            columns={columns}
          />
        </CardBody>
      </Card>

      <AddPurpose
        refetchData={refetchData}
        editId={editId}
        setEditId={setEditId}
        data={tableData ?? []}
        isOpen={isOpenPurposeAddModal}
        onClose={() => {
          onClosePurposeAddModal();
        }}
      />
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this data from the system. This cannot be Undone."
        isOpen={isOpenPurposeDeleteModal}
        onClose={onClosePurposeDeleteModal}
      />
      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isToggling || isFetching}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} this purpose of payment?`}
        isOpen={isOpenPurposeStatusUpdateModal}
        onClose={onClosePurposeStatusUpdateModal}
      />
    </Flex>
  );
};

export default PurposeOfPayment;
