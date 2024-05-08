import {
  Badge,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Switch,
  useBoolean,
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
  PromoCodeList,
  useDeletePromoCode,
  useGetAllPromoCode,
  useTogglePromoCodeStatus
} from "@neo/services/MasterData/service-promo-code";
import { CellContext, PaginationState } from "@tanstack/react-table";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddPromoCode from "./AddPromoCode";

const PromoCode = () => {
  const [flag, setFlag] = useBoolean();
  const { pathname } = useLocation();
  const {
    isOpen: isOpenPromoCodeDeleteModal,
    onOpen: onOpenPromoCodeDeleteModal,
    onClose: onClosePromoCodeDeleteModal
  } = useDisclosure();
  const {
    isOpen: isOpenPromoCodeStatusUpdateModal,
    onOpen: onOpenPromoCodeStatusUpdateModal,
    onClose: onClosePromoCodeStatusUpdateModal
  } = useDisclosure();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const [editId, setEditId] = useState(null as number | null);
  const [changeId, setChangeId] = useState(null as number | null);
  const [active, setActive] = useState(false);
  const [searchText, setSearchText] = useState<string>("" as string);
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [filterCount, setFilterCount] = useState(0);
  const [tableData, setTableData] = useState<PromoCodeList[] | undefined>();
  const {
    mutateAsync,
    data: promoCodeData,
    isLoading: isGetAllPromoCodeLoading
  } = useGetAllPromoCode();

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

  useEffect(() => {
    setTableData(promoCodeData?.data?.data?.promoCodeList ?? []);
    setFilterCount(promoCodeData?.data?.data?.totalItems ?? 0);
  }, [promoCodeData]);

  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeletePromoCode();
  const {
    isLoading: isToggling,
    refetch,
    isFetching
  } = useTogglePromoCodeStatus(changeId);
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (data: any) => {
        return data.row.index + 1;
      }
    },

    {
      header: "PromoCode",
      accessorKey: "code"
    },
    {
      header: "Promo Code Name",
      accessorKey: "name"
    },
    {
      header: "Country",
      accessorKey: "countryList",
      cell: (cell: CellContext<PromoCodeList, any>) => {
        return cell?.row?.original?.countryList?.map(
          (item: any, index: number) => {
            return (
              <Badge
                key={index}
                padding="8px 24px"
                mr={2}
                borderRadius={"16px"}
              >
                {item?.name}
              </Badge>
            );
          }
        );
      }
    },
    {
      header: "Payment Method",
      accessorKey: "paymentMethod",
      size: 20,
      cell: (cell: CellContext<PromoCodeList, any>) => {
        return cell?.row?.original?.payoutMethodList?.map(
          (item: any, index: number) => {
            return (
              <Badge
                key={index}
                padding="8px 24px"
                mr={2}
                borderRadius={"16px"}
              >
                {item?.name}
              </Badge>
            );
          }
        );
      }
    },
    {
      header: "Valid From",
      accessorKey: "validFrom",
      cell: (cell: CellContext<PromoCodeList, any>) => {
        return moment(cell?.row?.original?.validFrom).format("DD/MM/YYYY");
      }
    },
    {
      header: "Valid Till",
      accessorKey: "validTo",
      cell: (cell: CellContext<PromoCodeList, any>) => {
        return cell?.row?.original?.validTo != null
          ? moment(cell?.row?.original?.validTo).format("DD/MM/YYYY")
          : "";
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
            isChecked={data?.row?.original?.isActive}
            onChange={() => {
              setActive(data?.row?.original?.isActive);
              setChangeId(data?.row?.original?.id);
              onOpenPromoCodeStatusUpdateModal();
            }}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<PromoCodeList, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id || null);
                setFlag.on();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setChangeId(cell?.row?.original?.id || null);
                onOpenPromoCodeDeleteModal();
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
    refetchData();
    onClosePromoCodeDeleteModal();
  };

  const handleStatusChange = async () => {
    try {
      await refetch();
      setChangeId(null);
      refetchData();
      onClosePromoCodeStatusUpdateModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb
        flag={flag}
        setFlag={setFlag}
        currentPage={`Promo Code ${flag ? "Setup" : ""}`}
        options={activePath}
      />
      {flag ? (
        <AddPromoCode
          refetchData={refetchData}
          data={tableData ?? []}
          editId={editId ?? null}
          setEditId={setEditId}
          onClose={() => {
            setFlag.off();
          }}
        />
      ) : (
        <>
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
                  onClick={setFlag.on}
                >
                  Add Promo Code
                </Button>
              </HStack>
              <DataTable
                pagination={{
                  manual: false,
                  pageParams: pageParams,
                  pageCount: filterCount,
                  onChangePagination: setPageParams
                }}
                data={tableData ?? []}
                columns={columns}
                filter={{
                  globalFilter: searchText,
                  setGlobalFilter: setSearchText
                }}
                isLoading={isGetAllPromoCodeLoading}
              />{" "}
            </CardBody>
          </Card>
        </>
      )}
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this data from the system. This cannot be Undone."
        isOpen={isOpenPromoCodeDeleteModal}
        onClose={() => {
          setChangeId(null);
          onClosePromoCodeDeleteModal();
        }}
      />
      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isToggling || isFetching}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} this promo code?`}
        isOpen={isOpenPromoCodeStatusUpdateModal}
        onClose={() => {
          setChangeId(null);
          onClosePromoCodeStatusUpdateModal();
        }}
      />
    </Flex>
  );
};

export default PromoCode;
