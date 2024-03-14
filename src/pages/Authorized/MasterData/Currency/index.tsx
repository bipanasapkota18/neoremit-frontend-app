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
  CurrenciesList,
  useDeleteCurrency,
  useGetAllCurrency,
  useGetCurrencyById,
  useUpdateCurrency
} from "@neo/services/MasterData/service-currency";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddCurrency from "./AddCurrency";

const Currency = () => {
  const {
    isOpen: isOpenCurrencyAddModal,
    onOpen: onOpenCurrencyAddModal,
    onClose: onCloseCurrencyAddModal
  } = useDisclosure();
  const {
    isOpen: isOpenCurrencyDeleteModal,
    onOpen: onOpenCurrencyDeleteModal,
    onClose: onCloseCurrencyDeleteModal
  } = useDisclosure();
  const {
    isOpen: isOpenCurrencyStatusUpdateModal,
    onOpen: onOpenCurrencyStatusUpdateModal,
    onClose: onCloseCurrencyStatusUpdateModal
  } = useDisclosure();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const [filterCount, setFilterCount] = useState(0);
  const [tableData, setTableData] = useState<CurrenciesList[] | undefined>();
  const [searchText, setSearchText] = useState<string>("" as string);
  const [editId, setEditId] = useState(null as number | null);
  const [changeId, setChangeId] = useState(null as number | null);
  const [active, setActive] = useState(false);
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const { data: editData } = useGetCurrencyById(changeId);
  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeleteCurrency();
  const { data: currencyData, mutateAsync, isLoading } = useGetAllCurrency();
  const {
    mutateAsync: mutateUpdateCurrency,
    isLoading: isStatusUPdateLoading
  } = useUpdateCurrency();

  const { pathname } = useLocation();
  useEffect(() => {
    setTableData(currencyData?.data?.data?.currenciesList ?? []);
    setFilterCount(currencyData?.data?.data?.totalItems ?? 0);
  }, [currencyData]);
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
      header: "Name",
      accessorKey: "name",
      size: 50
    },
    {
      header: "Currency Short Name",
      accessorKey: "shortName",
      size: 20
    },
    {
      header: "Currency Symbol",
      accessorKey: "symbol",
      size: 20,
      cell: (data: any) => {
        return <Text fontWeight={800}>{data?.row?.original?.symbol}</Text>;
      }
    },
    {
      header: "Status",
      accessorKey: "isActive",
      size: 50,
      cell: (data: any) => {
        return (
          <Switch
            size="lg"
            isChecked={data?.row?.original?.isActive}
            onChange={() => {
              setChangeId(data?.row?.original?.id);
              setActive(data?.row?.original?.isActive);
              onOpenCurrencyStatusUpdateModal();
            }}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",

      cell: (cell: CellContext<CurrenciesList, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id);
                onOpenCurrencyAddModal();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setChangeId(cell?.row?.original?.id);
                onOpenCurrencyDeleteModal();
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
    onCloseCurrencyDeleteModal();
    refetchData();
  };
  const handleStatusChange = async () => {
    if (changeId !== null) {
      await mutateUpdateCurrency({
        id: changeId,
        data: {
          code: editData?.data?.data?.code ?? "",
          name: editData?.data?.data?.name ?? "",
          shortName: editData?.data?.data?.shortName ?? "",
          Symbol: editData?.data?.data?.symbol ?? "",
          isActive: !active
        }
      });
    }
    setChangeId(null);
    onCloseCurrencyStatusUpdateModal();
    refetchData();
  };
  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Currency" options={activePath} />
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
              onClick={onOpenCurrencyAddModal}
            >
              Add Currency
            </Button>
          </HStack>
          <DataTable
            data={tableData ?? []}
            filter={{
              globalFilter: searchText,
              setGlobalFilter: setSearchText
            }}
            isLoading={isLoading}
            pagination={{
              manual: true,
              pageCount: filterCount,
              pageParams: pageParams,
              onChangePagination: setPageParams
            }}
            columns={columns}
          />
        </CardBody>
      </Card>

      <AddCurrency
        refetchData={refetchData}
        data={currencyData?.data?.data?.currenciesList}
        editId={editId}
        setEditId={setEditId}
        isOpen={isOpenCurrencyAddModal}
        onClose={onCloseCurrencyAddModal}
      />
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this file from the system. This cannot be Undone."
        isOpen={isOpenCurrencyDeleteModal}
        onClose={onCloseCurrencyDeleteModal}
      />
      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isStatusUPdateLoading}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} this currency?`}
        isOpen={isOpenCurrencyStatusUpdateModal}
        onClose={onCloseCurrencyStatusUpdateModal}
      />
    </Flex>
  );
};

export default Currency;
