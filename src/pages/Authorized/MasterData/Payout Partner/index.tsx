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
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import {
  useDeletePayoutPartner,
  useGetAllPayoutPartners,
  useGetPayoutPartnerById,
  useUpdatePayoutPartner
} from "@neo/services/MasterData/service-payout-partner";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
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
  const {
    mutate: mutateUpdatePayoutPartner,
    isLoading: isStatusUPdateLoading
  } = useUpdatePayoutPartner();
  const { data: editData } = useGetPayoutPartnerById(editId);
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn"
    },
    {
      header: "Partner Name",
      accessorKey: "name",
      size: 40
    },
    {
      header: "Country",
      accessorKey: "country",
      size: 30
    },
    {
      header: "Payout Method",
      accessorKey: "payoutMethod",
      size: 20
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
    if (changeId !== null) {
      await mutateUpdatePayoutPartner({
        id: changeId,
        data: {
          code: editData?.data?.data?.code ?? "",
          name: editData?.data?.data?.name ?? "",
          description: editData?.data?.data?.description ?? "",
          isActive: !active
        }
      });
    }
    setChangeId(null);
    onClosePayoutPartnerStatusUpdateModal();
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
        isLoading={isDeleteLoading}
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
        isLoading={isStatusUPdateLoading}
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
