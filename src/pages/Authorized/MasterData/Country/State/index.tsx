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
import { useSearchParams } from "react-router-dom";
import { IStepProps } from "../CountryDetails/AddCountry";
import AddState from "./AddState";

const State = ({ stepProps }: IStepProps) => {
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
  const [tableData, setTableData] = useState<StatesList[] | undefined>();
  const [searchText, setSearchText] = useState<string>("" as string);
  const [editId, setEditId] = useState(null as number | null);
  const [changeId, setChangeId] = useState(null as number | null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const isNewCountry = searchParams?.get("isNewCountry") ?? false;

  const {
    mutateAsync,
    isLoading: isGetStateLoading,
    data: stateData
  } = useGetAllState();

  useEffect(() => {
    setTableData(stateData?.data?.data?.statesList ?? []);
    setFilterCount(stateData?.data?.data?.totalItems ?? 0);
  }, [stateData]);

  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeleteState();

  useEffect(() => {
    mutateAsync({
      pageParams: { page: pageParams.pageIndex, size: pageParams.pageSize },
      filterParams: {
        countryId: Number(searchParams.get("countryId"))
      }
    });
  }, [pageParams.pageIndex, pageParams.pageSize]);

  const refetchData = () => {
    mutateAsync({
      pageParams: { page: pageParams.pageIndex, size: pageParams.pageSize },
      filterParams: {
        countryId: Number(searchParams.get("countryId"))
      }
    });
  };

  const handleDelete = async () => {
    await mutateDelete(changeId);
    setChangeId(null);
    onCloseStateDeleteModal();
    refetchData();
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
      header: "State Name",
      accessorKey: "name",
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
                setChangeId(cell?.row?.original?.id);
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
      <Card borderRadius={"32px"}>
        <CardBody>
          <Heading
            fontSize="17px"
            fontStyle="normal"
            fontWeight={700}
            lineHeight="normal"
            color={"#2D3748"}
            p={4}
          >
            State Setup
          </Heading>
          <Card borderTop={"1px solid #EDF2F7"}>
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
                  Add State
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
              <HStack justifyContent={"space-between"}>
                <Button
                  variant="filter"
                  mr={1}
                  onClick={() => stepProps.prevStep()}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    isNewCountry
                      ? setSearchParams({
                          countryId: searchParams.get("countryId") + "",
                          hasState: searchParams.get("hasState") + "",
                          isNewCountry: isNewCountry
                        })
                      : setSearchParams({
                          countryId: searchParams.get("countryId") + "",
                          hasState: searchParams.get("hasState") + ""
                        });
                    stepProps.nextStep();
                  }}
                >
                  Save and Proceed
                </Button>
              </HStack>
            </CardBody>
          </Card>
        </CardBody>
      </Card>

      <AddState
        refetchData={refetchData}
        countryId={Number(searchParams.get("countryId"))}
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

export default State;
