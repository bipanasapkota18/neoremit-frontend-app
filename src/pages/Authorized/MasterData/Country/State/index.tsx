import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import BreadCrumb from "@neo/components/BreadCrumb";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import {
  StatesList,
  useDeleteState,
  useGetAllState
} from "@neo/services/MasterData/service-state";
import { colorScheme } from "@neo/theme/colorScheme";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddState from "./AddState";

const State = () => {
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

  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const { pathname, state } = useLocation();
  const selectedCountry = state?.countryData?.find(
    (country: any) => country.id === state?.countryId
  );
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
  const activePath = breadcrumbTitle(pathname);

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="State Setup" options={activePath} />
      <Card
        borderRadius={"16px"}
        boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
      >
        <CardBody>
          <HStack
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
          >
            <Heading
              fontSize="17px"
              fontStyle="normal"
              fontWeight={700}
              lineHeight="normal"
              color={"#2D3748"}
            >
              Country Details
            </Heading>
            <Box
              padding={"24px"}
              gap={"20px"}
              bgColor={colorScheme.gray_50}
              width={"100%"}
            >
              <SimpleGrid columns={{ base: 1, sm: 1, md: 3 }} spacing={10}>
                <GridItem colSpan={1}>
                  <VStack alignItems={"flex-start"} gap={"24px"}>
                    <HStack width={"100%"} spacing={3}>
                      <Text
                        color={colorScheme.search_icon}
                        fontSize="14px"
                        fontWeight={400}
                        display={"flex"}
                        w={"38%"}
                      >
                        Country Name
                        <Text marginLeft={"auto"} as={"span"}>
                          :
                        </Text>
                      </Text>
                      <Text
                        fontSize="14px"
                        color={colorScheme.gray_700}
                        fontWeight={600}
                      >
                        {selectedCountry?.name}
                      </Text>
                    </HStack>
                    <HStack width={"100%"} spacing={3}>
                      <Text
                        color={colorScheme.search_icon}
                        fontSize="14px"
                        fontWeight={400}
                        display={"flex"}
                        w={"38%"}
                      >
                        Country Short Name
                        <Text marginLeft={"auto"} as={"span"}>
                          :
                        </Text>
                      </Text>
                      <Text
                        marginRight={"auto"}
                        fontSize="14px"
                        color={colorScheme.gray_700}
                        fontWeight={600}
                      >
                        {selectedCountry?.shortName}
                      </Text>
                    </HStack>
                  </VStack>
                </GridItem>
                <GridItem colSpan={1}>
                  <VStack alignItems={"flex-start"} gap={"24px"}>
                    <HStack width={"100%"} spacing={3}>
                      <Text
                        color={colorScheme.search_icon}
                        fontSize="14px"
                        fontWeight={400}
                        display={"flex"}
                        w={"38%"}
                      >
                        ISO Number
                        <Text marginLeft={"auto"} as={"span"}>
                          :
                        </Text>
                      </Text>
                      <Text
                        fontSize="14px"
                        color={colorScheme.gray_700}
                        fontWeight={600}
                      >
                        {selectedCountry?.isoNumber}
                      </Text>
                    </HStack>
                    <HStack width={"100%"} spacing={3}>
                      <Text
                        color={colorScheme.search_icon}
                        fontSize="14px"
                        fontWeight={400}
                        display={"flex"}
                        w={"38%"}
                      >
                        Country Code
                        <Text marginLeft={"auto"} as={"span"}>
                          :
                        </Text>
                      </Text>
                      <Text
                        fontSize="14px"
                        color={colorScheme.gray_700}
                        fontWeight={600}
                      >
                        {selectedCountry?.code}
                      </Text>
                    </HStack>
                  </VStack>
                </GridItem>
                <GridItem colSpan={1}>
                  <VStack alignItems={"flex-start"} gap={"24px"}>
                    <HStack width={"100%"} spacing={3}>
                      <Text
                        color={colorScheme.search_icon}
                        fontSize="14px"
                        fontWeight={400}
                        display={"flex"}
                        w={"38%"}
                      >
                        Phone Code
                        <Text marginLeft={"auto"} as={"span"}>
                          :
                        </Text>
                      </Text>
                      <Text
                        fontSize="14px"
                        color={colorScheme.gray_700}
                        fontWeight={600}
                      >
                        {selectedCountry?.phoneCode}
                      </Text>
                    </HStack>
                    <HStack width={"100%"} spacing={3}>
                      <Text
                        color={colorScheme.search_icon}
                        fontSize="14px"
                        fontWeight={400}
                        display={"flex"}
                        w={"38%"}
                      >
                        Currency
                        <Text marginLeft={"auto"} as={"span"}>
                          :
                        </Text>
                      </Text>
                      <Text
                        fontSize="14px"
                        color={colorScheme.gray_700}
                        fontWeight={600}
                      >
                        {selectedCountry?.currency?.name}
                      </Text>
                    </HStack>
                  </VStack>
                </GridItem>
              </SimpleGrid>
            </Box>
          </HStack>

          <Heading
            fontSize="17px"
            fontStyle="normal"
            fontWeight={700}
            lineHeight="normal"
            color={"#2D3748"}
            p={4}
          >
            State Details
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
            </CardBody>
          </Card>
        </CardBody>
      </Card>

      <AddState
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

export default State;
