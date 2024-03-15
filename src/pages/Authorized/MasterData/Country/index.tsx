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
import { NAVIGATION_ROUTES } from "@neo/pages/App/navigationRoutes";
import {
  CountriesList,
  useDeleteCountry,
  useGetAllCountries,
  useGetCountryById,
  useUpdateCountry
} from "@neo/services/MasterData/service-country";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddCountrySetup from "./AddCountry";

const Country = () => {
  const {
    isOpen: isCountryAddModalOpen,
    onOpen: onOpenCountryAddModal,
    onClose: onCloseCountryAddModal
  } = useDisclosure();
  const {
    isOpen: isOpenCountryDeleteModal,
    onOpen: onOpenCountryDeleteModal,
    onClose: onCloseCountryDeleteModal
  } = useDisclosure();
  const {
    isOpen: isOpenCountryStatusUpdateModal,
    onOpen: onOpenCountryStatusUpdateModal,
    onClose: onCloseCountryStatusUpdateModal
  } = useDisclosure();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const [filterCount, setFilterCount] = useState(0);
  const [tableData, setTableData] = useState<CountriesList[] | undefined>();
  const [searchText, setSearchText] = useState<string>("" as string);
  const [editId, setEditId] = useState(null as number | null);
  const [changeId, setChangeId] = useState(null as number | null);
  const [active, setActive] = useState(false);
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const { pathname } = useLocation();

  const {
    mutateAsync: addMutateCountry,
    data: countryData,
    isLoading
  } = useGetAllCountries();
  const { data: editData } = useGetCountryById(changeId);
  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeleteCountry();
  const { mutateAsync: mutateUpdate, isLoading: isUpdateLoading } =
    useUpdateCountry();
  useEffect(() => {
    addMutateCountry({
      pageParams: { page: pageParams.pageIndex, size: pageParams.pageSize },
      filterParams: {}
    });
  }, [pageParams.pageIndex, pageParams.pageSize]);

  const refetchData = () => {
    addMutateCountry({
      pageParams: { page: pageParams.pageIndex, size: pageParams.pageSize },
      filterParams: {}
    });
  };
  useEffect(() => {
    setTableData(countryData?.data?.data?.countriesList ?? []);
    setFilterCount(countryData?.data?.data?.totalItems ?? 0);
  }, [countryData]);

  const onAddState = () => {
    navigate(NAVIGATION_ROUTES.MASTER_DATA.STATE_SETUP);
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
      header: "Flag",
      accessorKey: "flagIcon"
    },
    {
      header: "Country Name",
      accessorKey: "name",
      size: 50
    },
    {
      header: "Currency",
      accessorKey: "currency",
      cell: (data: any) => {
        return <Text>{data?.row?.original?.currency?.name}</Text>;
      }
    },
    {
      header: "Country Short Name",
      accessorKey: "shortName",
      size: 20
    },
    {
      header: "ISO Number",
      accessorKey: "isoNumber",
      size: 20
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
              onOpenCountryStatusUpdateModal();
            }}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",

      cell: (cell: CellContext<CountriesList, any>) => {
        return (
          <HStack>
            <TableActionButton
              isDisabled={!cell?.row?.original?.hasState}
              onClickAction={onAddState}
              icon={<svgAssets.StateAddIcon />}
              label="Add State"
            />
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id);
                onOpenCountryAddModal();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setChangeId(cell?.row?.original?.id);
                onOpenCountryDeleteModal();
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
    onCloseCountryDeleteModal();
    refetchData();
  };
  const handleStatusChange = async () => {
    if (changeId !== null) {
      await mutateUpdate({
        id: changeId,
        data: {
          id: changeId,
          name: editData?.data?.data?.name ?? "",
          shortName: editData?.data?.data?.shortName ?? "",
          phoneCode: editData?.data?.data?.phoneCode ?? "",
          isoNumber: editData?.data?.data?.isoNumber ?? "",
          currencyId: editData?.data?.data?.currency?.id ?? null,
          hasState: editData?.data?.data?.hasState ?? true,
          flagIcon: editData?.data?.data?.flagIcon ?? "",
          canReceive: editData?.data?.data?.canReceive ?? true,
          canSend: editData?.data?.data?.canSend ?? true,
          isActive: !active
        }
      });
    }
    setChangeId(null);
    onCloseCountryStatusUpdateModal();
    refetchData();
  };
  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Country Setup" options={activePath} />
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
              onClick={onOpenCountryAddModal}
            >
              Add Country
            </Button>
          </HStack>
          <DataTable
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
            data={tableData ?? []}
            columns={columns}
          />
        </CardBody>
      </Card>

      <AddCountrySetup
        refetchData={refetchData}
        data={countryData?.data?.data?.countriesList}
        editId={editId}
        setEditId={setEditId}
        isOpen={isCountryAddModalOpen}
        onClose={onCloseCountryAddModal}
      />
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this file from the system. This cannot be Undone."
        isOpen={isOpenCountryDeleteModal}
        onClose={onCloseCountryDeleteModal}
      />
      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isUpdateLoading}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} this Country?`}
        isOpen={isOpenCountryStatusUpdateModal}
        onClose={onCloseCountryStatusUpdateModal}
      />
    </Flex>
  );
};

export default Country;
