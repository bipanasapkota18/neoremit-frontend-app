import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  IconButton,
  Switch,
  Text,
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
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";

import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import { NAVIGATION_ROUTES } from "@neo/pages/App/navigationRoutes";
import {
  IPartnerResponse,
  useDeletePartner,
  useGetAllPartners,
  useTogglePartnerStatus
} from "@neo/services/service-partner-setup";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddPartner from "./AddPartner";

const PartnerSetup = () => {
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useBoolean();

  const navigate = useNavigate();
  const {
    isOpen: isOpenPartnerDeleteModal,
    onOpen: onOpenPartnerDeleteModal,
    onClose: onClosePartnerDeleteModal
  } = useDisclosure();
  const {
    isOpen: isOpenPartnerStatusUpdateModal,
    onOpen: onOpenPartnerStatusUpdateModal,
    onClose: onClosePartnerStatusUpdateModal
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
  const { data: PartnerData, isLoading } = useGetAllPartners();

  const { isLoading: isToggling, mutateAsync: mutateToggle } =
    useTogglePartnerStatus();
  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeletePartner();

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (cell: CellContext<IPartnerResponse, any>) => {
        return (
          <Text>
            {pageParams.pageIndex * pageParams.pageSize + cell?.row?.index + 1}
          </Text>
        );
      }
    },
    {
      header: "Company Name",
      accessorKey: "companyName"
    },
    {
      header: "Partner Type",
      accessorKey: "partnerType"
    },
    {
      header: "Country(HQ)",
      accessorKey: "countryHeadQuarter",
      cell: (cell: CellContext<IPartnerResponse, any>) => {
        return <Text>{cell?.row?.original?.countryHeadQuarter?.name}</Text>;
      }
    },
    {
      header: "Funding Currency",
      accessorKey: "fundingCurrency",
      cell: (cell: CellContext<IPartnerResponse, any>) => {
        return <Text>{cell?.row?.original?.fundingCurrency?.name}</Text>;
      }
    },
    {
      header: "Settlement Currency",
      accessorKey: "localCurrency",
      cell: (cell: CellContext<IPartnerResponse, any>) => {
        return <Text>{cell?.row?.original?.localCurrency?.name}</Text>;
      }
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (cell: CellContext<IPartnerResponse, any>) => {
        return (
          <Switch
            size="lg"
            isChecked={cell?.row?.original?.status}
            onChange={() => {
              setChangeId(cell?.row?.original?.id);
              setActive(cell?.row?.original?.status);
              onOpenPartnerStatusUpdateModal();
            }}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<IPartnerResponse, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id);
                setIsOpenAddEditModal.on();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <IconButton
              variant={"search"}
              aria-label="Add Partner Data Mapping"
              icon={<svgAssets.PartnerDataMappingIcon />}
              onClick={() => {
                navigate(NAVIGATION_ROUTES.PARTNER_DATA_MAPPING, {
                  state: { partnerId: cell?.row?.original?.id }
                });
              }}
            />

            <TableActionButton
              onClickAction={() => {
                setChangeId(cell?.row?.original?.id);
                onOpenPartnerDeleteModal();
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
    onClosePartnerDeleteModal();
  };

  const handleStatusChange = async () => {
    try {
      await mutateToggle(changeId);
      setChangeId(null);
      onClosePartnerStatusUpdateModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb
        customOnClick={{
          trigger: !!editId || isOpenAddEditModal,
          func: () => {
            setEditId(null);
            setIsOpenAddEditModal.off();
          }
        }}
        currentPage="Partner Setup"
        options={activePath}
      />
      {isOpenAddEditModal ? (
        <AddPartner
          editId={editId}
          setEditId={setEditId}
          onClose={() => {
            setIsOpenAddEditModal.off();
          }}
        />
      ) : (
        <>
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
                  onClick={setIsOpenAddEditModal.on}
                >
                  Add Partner
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
                data={PartnerData ?? []}
                columns={columns}
              />
            </CardBody>
          </Card>

          {/* <AddPartner
            editId={editId}
            setEditId={setEditId}
            data={PartnerData ?? []}
            isOpen={isOpenPartnerAddModal}
            onClose={() => {
              onClosePartnerAddModal();
            }}
          /> */}
          <ConfirmationModal
            variant={"delete"}
            buttonText={"Delete"}
            title={"Are You Sure?"}
            isLoading={isDeleteLoading}
            onApprove={handleDelete}
            message="Deleting will permanently remove this data from the system. This cannot be Undone."
            isOpen={isOpenPartnerDeleteModal}
            onClose={onClosePartnerDeleteModal}
          />
          <ConfirmationModal
            variant={"edit"}
            buttonText={`${active ? "Disable" : "Enable"}`}
            title={"Are You Sure?"}
            isLoading={isToggling}
            onApprove={handleStatusChange}
            message={`Are you sure you want to ${active ? "Disable" : "Enable"} this Partner?`}
            isOpen={isOpenPartnerStatusUpdateModal}
            onClose={onClosePartnerStatusUpdateModal}
          />
        </>
      )}
    </Flex>
  );
};

export default PartnerSetup;
