import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  Switch,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import { imageAssets } from "@neo/assets/images";
import { svgAssets } from "@neo/assets/images/svgs";
import BreadCrumb from "@neo/components/BreadCrumb";
import FilterButton from "@neo/components/Button/FilterButton";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import {
  IPayoutPartnerResponse,
  useDeletePayoutPartner,
  useGetAllPayoutPartners,
  useGetPayoutPartnerById,
  useToggleStatus
} from "@neo/services/MasterData/service-payout-partner";
import { baseURL } from "@neo/services/service-axios";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import AddPayoutPartner from "./AddPayoutPartner";

const PayoutPartner = () => {
  const {
    isOpen: isOpenAddPayoutPartnerModal,
    onOpen: onOpenAddPayoutPartnerModal,
    onClose: onCloseAddPayoutPartnerModal
  } = useDisclosure();
  const {
    isOpen: isOpenPayoutPartnerDeleteModal,
    onOpen: onOpenPayoutPartnerDeleteModal,
    onClose: onClosePayoutPartnerDeleteModal
  } = useDisclosure();
  const {
    isOpen: isOpenPayoutPartnerStatusUpdateModal,
    onOpen: onOpenPayoutPartnerStatusUpdateModal,
    onClose: onClosePayoutPartnerStatusUpdateModal
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
  const { data: payoutPartners, isLoading } = useGetAllPayoutPartners();
  const { mutate: mutateDelete, isLoading: isDeleteLoading } =
    useDeletePayoutPartner();

  const { isLoading: isSingleFetching } = useGetPayoutPartnerById(editId);
  const {
    isLoading: isToggling,
    refetch,
    isFetching
  } = useToggleStatus(changeId);
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (cell: CellContext<IPayoutPartnerResponse, any>) =>
        cell?.row?.index + 1
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: (cell: any) => {
        const memoizedImage = useMemo(() => {
          return (
            <Image
              boxSize={"50px"}
              borderRadius="full"
              fallbackStrategy={"onError"}
              src={
                cell?.row?.original?.flagIcon != null
                  ? `${baseURL}/document-service/master/payout/partner/image?fileId=${cell?.row?.original?.flagIcon}`
                  : imageAssets.noImage
              }
            />
          );
        }, [cell?.row?.original?.flagIcon]);
        return memoizedImage;
      }
    },
    {
      header: "Partner Name",
      accessorKey: "name",
      size: 40
    },
    {
      header: "Country",
      accessorKey: "country",
      size: 30,
      cell: (data: CellContext<IPayoutPartnerResponse, any>) => {
        return data?.row?.original?.country?.name;
      }
    },
    {
      header: "Payout Method",
      accessorKey: "payoutMethod",
      size: 20,
      cell: (data: CellContext<IPayoutPartnerResponse, any>) => {
        return data?.row?.original?.payoutMethod?.name;
      }
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (data: any) => {
        return (
          <Switch
            size="lg"
            name="status"
            colorScheme="facebook"
            isChecked={data?.row?.original?.isActive}
            onChange={() => {
              setActive(data?.row?.original?.isActive);
              setChangeId(data?.row?.original?.id);
              onOpenPayoutPartnerStatusUpdateModal();
            }}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<any, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id || null);
                onOpenAddPayoutPartnerModal();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setChangeId(cell?.row?.original?.id || null);
                onOpenPayoutPartnerDeleteModal();
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
    onClosePayoutPartnerDeleteModal();
  };
  const handleStatusChange = async () => {
    try {
      await refetch();
      setChangeId(null);
      onClosePayoutPartnerStatusUpdateModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Payout Partner" options={activePath} />
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
              onClick={onOpenAddPayoutPartnerModal}
            >
              Add Payout Partner
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
            data={payoutPartners ?? []}
            columns={columns}
            isLoading={isLoading}
          />
        </CardBody>
      </Card>

      <AddPayoutPartner
        data={payoutPartners}
        editId={editId ?? null}
        setEditId={setEditId}
        isOpen={isOpenAddPayoutPartnerModal}
        onClose={() => {
          onCloseAddPayoutPartnerModal();
        }}
      />
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading || isSingleFetching}
        onApprove={handleDelete}
        message="Deleting will permanently remove this file from the system. This cannot be Undone."
        isOpen={isOpenPayoutPartnerDeleteModal}
        onClose={() => {
          setChangeId(null);
          onClosePayoutPartnerDeleteModal();
        }}
      />
      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isToggling || isFetching}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} this payout partner?`}
        isOpen={isOpenPayoutPartnerStatusUpdateModal}
        onClose={() => {
          setChangeId(null);
          onClosePayoutPartnerStatusUpdateModal();
        }}
      />
    </Flex>
  );
};

export default PayoutPartner;
