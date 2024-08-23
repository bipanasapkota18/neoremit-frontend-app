import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  Switch,
  Text,
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
import { NAVIGATION_ROUTES } from "@neo/pages/App/navigationRoutes";
import {
  CountriesList,
  useDeleteCountry,
  useGetAllCountries,
  useToggleStatus
} from "@neo/services/MasterData/service-country";
import { baseURL } from "@neo/services/service-axios";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Country = () => {
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
  const [filterCount, setFilterCount] = useState(0);
  const [tableData, setTableData] = useState<CountriesList[] | undefined>();
  const [searchText, setSearchText] = useState<string>("" as string);
  // const [editId, setEditId] = useState(null as number | null);
  const [changeId, setChangeId] = useState(null as number | null);
  const [active, setActive] = useState(false);
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activePath = breadcrumbTitle(pathname);

  const {
    mutateAsync: mutateCountry,
    data: countryData,
    isLoading
  } = useGetAllCountries();

  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeleteCountry();

  const {
    isLoading: isToggling,
    refetch,
    isFetching
  } = useToggleStatus(changeId);

  useEffect(() => {
    mutateCountry({
      pageParams: { page: pageParams.pageIndex, size: pageParams.pageSize },
      filterParams: { searchParam: searchText }
    });
  }, [pageParams.pageIndex, pageParams.pageSize, searchText]);

  const refetchData = () => {
    mutateCountry({
      pageParams: { page: pageParams.pageIndex, size: pageParams.pageSize },
      filterParams: { searchParam: searchText }
    });
  };

  useEffect(() => {
    setTableData(countryData?.data?.data?.countriesList ?? []);
    setFilterCount(countryData?.data?.data?.totalItems ?? 0);
  }, [countryData]);

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
      accessorKey: "flagIcon",
      size: 50,
      cell: (cell: any) => {
        const memoizedImage = useMemo(() => {
          return (
            <Image
              boxSize={"50px"}
              borderRadius="full"
              fallbackStrategy={"onError"}
              src={
                cell?.row?.original?.flagIcon != null
                  ? `${baseURL}/document-service/master/flag-icon?fileId=${cell?.row?.original?.flagIcon}`
                  : imageAssets.noImage
              }
            />
          );
        }, [cell?.row?.original?.flagIcon]);
        return memoizedImage;
      }
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
              onClickAction={() => {
                navigate(
                  NAVIGATION_ROUTES.COUNTRY +
                    `?countryId=${cell?.row?.original?.id}`
                );
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

  const handleDelete = async () => {
    await mutateDelete(changeId);
    setChangeId(null);
    onCloseCountryDeleteModal();
    refetchData();
  };

  const handleStatusChange = async () => {
    try {
      await refetch();
      setChangeId(null);
      refetchData();
      onCloseCountryStatusUpdateModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Country Setup" options={activePath} />
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
                  type="text"
                  onSearch={setSearchText}
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
              onClick={() => {
                navigate(NAVIGATION_ROUTES.COUNTRY + `?isNewCountry=${true}`);
              }}
            >
              Add Country
            </Button>
          </HStack>
          <DataTable
            // filter={{
            //   globalFilter: searchText,
            //   setGlobalFilter: setSearchText
            // }}
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

      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this data from the system. This cannot be Undone."
        isOpen={isOpenCountryDeleteModal}
        onClose={onCloseCountryDeleteModal}
      />
      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isToggling || isFetching}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} this Country?`}
        isOpen={isOpenCountryStatusUpdateModal}
        onClose={onCloseCountryStatusUpdateModal}
      />
    </Flex>
  );
};

export default Country;
