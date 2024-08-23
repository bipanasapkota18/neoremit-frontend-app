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
  IPartnerCommissionResponse,
  useDeletePartnerCommission,
  useGetAllPartnerCommissionData,
  useTogglePartnerCommissionStatus
} from "@neo/services/service-partner-commission";
import { CellContext } from "@tanstack/react-table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AddPartnerCommission from "./AddPartnerCommission";

const PartnerCommission = () => {
  const [flag, setFlag] = useBoolean();
  const { pathname } = useLocation();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const [changeId, setChangeId] = useState(null as number | null);
  const [active, setActive] = useState(false);
  const [searchText, setSearchText] = useState<string>("" as string);
  const [editId, setEditId] = useState(null as number | null);

  const {
    isOpen: isOpenFeeAndChargeDeleteModal,
    onOpen: onOpenFeeAndChargeDeleteModal,
    onClose: onCloseFeeAndChargeDeleteModal
  } = useDisclosure();
  const {
    isOpen: isOpenFeeAndChargeToggleModal,
    onOpen: onOpenFeeAndChargeToggleModal,
    onClose: onCloseFeeAndChargeToggleModal
  } = useDisclosure();

  const { data: partnerCommissionData, isLoading: isDataLoading } =
    useGetAllPartnerCommissionData();
  const {
    mutateAsync: mutateDeletePartnerCommission,
    isLoading: isDeleteLoading
  } = useDeletePartnerCommission();

  const {
    mutateAsync: mutatePartnerCommissionStatus,
    isLoading: isStatusUPdateLoading
  } = useTogglePartnerCommissionStatus();

  const handleDelete = async () => {
    try {
      await mutateDeletePartnerCommission(editId);
      setEditId(null);
      onCloseFeeAndChargeDeleteModal();
    } catch (e) {
      console.error(e);
    }
  };

  const handleStatusChange = async () => {
    try {
      await mutatePartnerCommissionStatus(changeId);
      setChangeId(null);
      onCloseFeeAndChargeToggleModal();
    } catch (e) {
      console.error(e);
    }
  };

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (cell: CellContext<IPartnerCommissionResponse, any>) => {
        return cell?.row?.index + 1;
      }
    },
    {
      header: "Partner Name",
      accessorKey: "partner",
      size: 40
    },
    {
      header: "Country",
      accessorKey: "payoutCountryId",
      size: 30,
      cell: (data: CellContext<IPartnerCommissionResponse, any>) => {
        return data.row.original?.payoutCountryId?.name;
      }
    },
    {
      header: "Currency",
      accessorKey: "commissionCurrencyId",
      size: 20,
      cell: (data: CellContext<IPartnerCommissionResponse, any>) => {
        return data.row.original?.commissionCurrencyId?.name;
      }
    },
    {
      header: "Status",
      accessorKey: "status",
      size: 20,
      cell: (data: CellContext<IPartnerCommissionResponse, any>) => {
        return (
          <Switch
            size="lg"
            isChecked={data?.row?.original?.status}
            onChange={() => {
              setActive(data?.row?.original?.status);
              setChangeId(data?.row?.original?.id);
              onOpenFeeAndChargeToggleModal();
            }}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<IPartnerCommissionResponse, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id);
                setFlag.on();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id);
                onOpenFeeAndChargeDeleteModal();
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
      <BreadCrumb
        customOnClick={{
          trigger: !!editId || flag,
          func: () => {
            setEditId(null);
            setFlag.off();
          }
        }}
        currentPage={
          flag ? "Payout Partner Commission Setup" : "Payout Partner Commission"
        }
        options={activePath}
      />
      <Card>
        <CardBody>
          {flag ? (
            <AddPartnerCommission
              editId={editId}
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
                    <>
                      <SearchInput
                        width={"450px"}
                        label="Search"
                        name="search"
                        onSearch={setSearchText}
                        type="text"
                      />
                      <FilterButton
                        onClick={() => {
                          //
                        }}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </HStack>
                <Button
                  minW={"max-content"}
                  leftIcon={<svgAssets.AddButton />}
                  onClick={setFlag.on}
                >
                  Add Partner Commission
                </Button>
              </HStack>
              <DataTable
                isLoading={isDataLoading}
                pagination={{
                  manual: false
                }}
                filter={{
                  globalFilter: searchText,
                  setGlobalFilter: setSearchText
                }}
                data={partnerCommissionData ?? []}
                columns={columns}
              />
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
        message="Deleting will permanently remove this data from the system. This cannot be Undone."
        isOpen={isOpenFeeAndChargeDeleteModal}
        onClose={onCloseFeeAndChargeDeleteModal}
      />

      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isStatusUPdateLoading}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} partner commssion?`}
        isOpen={isOpenFeeAndChargeToggleModal}
        onClose={() => {
          setChangeId(null);
          onCloseFeeAndChargeToggleModal();
        }}
      />
    </Flex>
  );
};

export default PartnerCommission;
