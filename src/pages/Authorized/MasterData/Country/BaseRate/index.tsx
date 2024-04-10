import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Text,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import {
  StatesList,
  useDeleteState,
  useGetAllState
} from "@neo/services/MasterData/service-state";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IStepProps } from "../CountryDetails/AddCountry";
import AddBaseRate from "./AddBaseRateModal";
// import AddState from "./AddState";

export interface IBaseRateData {
  id: number;
  country: string;
  baseRate: string;
}

const BaseRate = ({ stepProps }: IStepProps) => {
  const {
    isOpen: isOpenAddStateModal,
    onOpen: onOpenAddStateModal,
    onClose: onCloseAddStateModal
  } = useDisclosure();
  const {
    isOpen: isOpenStateDeleteModal,
    onOpen: onOpenStateDeleteModal,
    onClose: onCloseStateDeleteModal
  } = useDisclosure();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const [filterCount, setFilterCount] = useState(0);
  const [tableData, setTableData] = useState<IBaseRateData[] | undefined>();
  const [searchText, setSearchText] = useState<string>("" as string);
  const [editId, setEditId] = useState(null as number | null);
  const [changeId, setChangeId] = useState(null as number | null);

  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const { state } = useLocation();
  const selectedCountry = state?.countryData?.find(
    (country: any) => country.id === state?.countryId
  );
  const {
    mutateAsync,
    isLoading: isGetStateLoading
    // data: stateData
  } = useGetAllState();

  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeleteState();
  useEffect(() => {
    mutateAsync({
      pageParams: { page: pageParams.pageIndex, size: pageParams.pageSize },
      filterParams: { countryId: selectedCountry?.id }
    });
  }, [pageParams.pageIndex, pageParams.pageSize, selectedCountry]);
  const refetchData = () => {
    mutateAsync({
      pageParams: { page: pageParams.pageIndex, size: pageParams.pageSize },
      filterParams: { countryId: selectedCountry?.id }
    });
  };
  const handleDelete = async () => {
    await mutateDelete(changeId);
    setChangeId(null);
    onCloseStateDeleteModal();
    refetchData();
  };
  const baseRateData = [
    {
      id: 1,
      country: "Nepal",
      baseRate: " $1.00 = NRS 132.70"
    },
    {
      id: 2,
      country: "India",
      baseRate: " $1.00 = INR 83.30"
    },
    {
      id: 3,
      country: "Pakistan",
      baseRate: " $1.00 = Pakistan rs 277.87"
    }
  ];
  useEffect(() => {
    setTableData(baseRateData ?? []);
    setFilterCount(baseRateData.length ?? 0);
  }, [baseRateData]);
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
      header: "Country",
      accessorKey: "country",
      size: 50
    },
    {
      header: "Base Rate",
      accessorKey: "baseRate",
      size: 100
    },

    {
      header: "Action",
      accessorKey: "action",

      cell: (cell: CellContext<StatesList, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id);
                onOpenAddStateModal();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                // setChangeId(cell?.row?.original?.id);
                onOpenStateDeleteModal();
              }}
              icon={<svgAssets.DeleteButton />}
              label="Delete"
            />
          </HStack>
        );
      }
    }
  ];

  return (
    <Flex direction={"column"} gap={"16px"}>
      {/* <BreadCrumb currentPage="State Setup" options={activePath} /> */}
      <Card
        borderRadius={"32px"}
        boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
      >
        <CardBody>
          <Heading
            fontSize="17px"
            fontStyle="normal"
            fontWeight={700}
            lineHeight="normal"
            color={"#2D3748"}
            p={4}
          >
            Base Rate Setup
          </Heading>
          <Card borderRadius={"16px"} borderTop={"1px solid #EDF2F7"}>
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
                </HStack>
                <Button
                  minW={"max-content"}
                  leftIcon={<svgAssets.AddButton />}
                  onClick={onOpenAddStateModal}
                >
                  Add Base Rate
                </Button>
              </HStack>

              <DataTable
                pagination={{
                  manual: true,
                  pageCount: filterCount,
                  pageParams: pageParams,
                  onChangePagination: setPageParams
                }}
                filter={{
                  globalFilter: searchText,
                  setGlobalFilter: setSearchText
                }}
                isLoading={isGetStateLoading}
                data={tableData ?? []}
                columns={columns}
              />
              <HStack justifyContent={"flex-end"}>
                <Button
                  variant="outline"
                  mr={1}
                  borderColor="purple.400"
                  onClick={() => stepProps.prevStep()}
                >
                  Back
                </Button>
                <Button onClick={() => stepProps.nextStep()}>Next</Button>
              </HStack>
            </CardBody>
          </Card>
        </CardBody>
      </Card>

      <AddBaseRate
        refetchData={refetchData}
        countryId={selectedCountry?.id ?? null}
        editId={editId}
        setEditId={setEditId}
        data={tableData}
        isOpen={isOpenAddStateModal}
        onClose={() => {
          onCloseAddStateModal();
        }}
      />
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this file from the system. This cannot be Undone."
        isOpen={isOpenStateDeleteModal}
        onClose={onCloseStateDeleteModal}
      />
    </Flex>
  );
};

export default BaseRate;
