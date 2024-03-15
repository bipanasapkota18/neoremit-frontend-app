import {
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
  IPayoutMethodResponse,
  useDeletePayoutMethod,
  useGetAllPayoutMethod,
  useGetPayOutMethodById,
  useUpdatePayoutMethod
} from "@neo/services/MasterData/service-payout-method";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AddPayoutMethod from "./AddPayoutMethod";

const PayoutMethod = () => {
  const [flag, setFlag] = useBoolean();
  const { pathname } = useLocation();
  const {
    isOpen: isOpenPayoutMethodDeleteModal,
    onOpen: onOpenPayoutMethodDeleteModal,
    onClose: onClosePayoutMethodDeleteModal
  } = useDisclosure();
  const {
    isOpen: isOpenPayoutMethodStatusUpdateModal,
    onOpen: onOpenPayoutMethodStatusUpdateModal,
    onClose: onClosePayoutMethodStatusUpdateModal
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
  const { data: payoutMethodData, isLoading: isPayoutMethodLoading } =
    useGetAllPayoutMethod();
  const { data: editData } = useGetPayOutMethodById(changeId);
  const {
    mutateAsync: mutateUpdatePayoutMethod,
    isLoading: isStatusUPdateLoading
  } = useUpdatePayoutMethod();
  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeletePayoutMethod();

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (data: any) => {
        return data.row.index + 1;
      }
    },

    {
      header: "Payout Method",
      accessorKey: "name",
      size: 100
    },
    {
      header: "Status",
      accessorKey: "status",
      size: 20,
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
              onOpenPayoutMethodStatusUpdateModal();
            }}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<IPayoutMethodResponse, any>) => {
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
                onOpenPayoutMethodDeleteModal();
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
    onClosePayoutMethodDeleteModal();
  };
  const handleStatusChange = async () => {
    if (changeId !== null) {
      await mutateUpdatePayoutMethod({
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
    onClosePayoutMethodStatusUpdateModal();
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Payout Method" options={activePath} />
      <Card
        borderRadius={"16px"}
        boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
      >
        <CardBody>
          {flag ? (
            <AddPayoutMethod
              data={payoutMethodData}
              editId={editId ?? null}
              setEditId={setEditId}
              onClose={() => {
                setFlag.off();
              }}
            />
          ) : (
            <>
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
                  onClick={setFlag.on}
                >
                  Add Payout Of Method
                </Button>
              </HStack>
              <DataTable
                pagination={{
                  manual: false,
                  pageParams: pageParams,
                  onChangePagination: setPageParams
                }}
                data={payoutMethodData ?? []}
                columns={columns}
                filter={{
                  globalFilter: searchText,
                  setGlobalFilter: setSearchText
                }}
                isLoading={isPayoutMethodLoading}
              />{" "}
            </>
          )}
        </CardBody>
      </Card>
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this file from the system. This cannot be Undone."
        isOpen={isOpenPayoutMethodDeleteModal}
        onClose={() => {
          setChangeId(null);
          onClosePayoutMethodDeleteModal();
        }}
      />
      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isStatusUPdateLoading}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} this payout method?`}
        isOpen={isOpenPayoutMethodStatusUpdateModal}
        onClose={() => {
          setChangeId(null);
          onClosePayoutMethodStatusUpdateModal();
        }}
      />
    </Flex>
  );
};

export default PayoutMethod;
