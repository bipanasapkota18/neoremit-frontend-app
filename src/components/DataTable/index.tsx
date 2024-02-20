import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { LoadingIllustration } from "@neo/components/Common/Illustrations/LoadingIllustration";
import { ResultNotFound } from "@neo/components/Common/Illustrations/ResultNotFound";
import { colorScheme } from "@neo/theme/colorScheme";
import { useIsMounted } from "@neo/utility/helper";
import {
  ColumnDef,
  ColumnOrderState,
  FilterFn,
  GroupingState,
  PaginationState,
  SortingState,
  Updater,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from "react";
import { AiOutlinePushpin } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import Pagination from "./Pagination";

export type DataTableProps = {
  data: Record<string, any>[];
  columns: ColumnDef<any, any>[];
  isLoading?: boolean;
  pinColumnAccess?: boolean;
  showFooter?: boolean;
  totalDataLabel?: string;
  pagination?: {
    manual?: boolean;
    pageCount?: number;
    pageParams?: {
      pageIndex: number;
      pageSize: number;
    };
    onChangePagination?: (paginationData: Updater<PaginationState>) => void;
  };
  filter?: {
    globalFilter: string;
    setGlobalFilter: Dispatch<SetStateAction<string>>;
  };
  sortingColumn?: string;
  setTable?: (table: any) => void;
  modalProps?: {
    sticky: boolean;
    height: string;
  };
  footerLeftElement?: ReactElement;
  setFilteredRows?: Dispatch<SetStateAction<any>>;
};
const filterFunction: FilterFn<any> = (row, columnId, value) => {
  const rowValue = String(row.original[columnId]).toLowerCase();
  const filterValue = value.toLowerCase();
  return rowValue.startsWith(filterValue);
};

export function DataTable({
  data,
  columns,
  pagination,
  isLoading,
  setTable,
  // totalDataLabel,
  filter,
  pinColumnAccess,
  showFooter,
  sortingColumn,
  modalProps,
  setFilteredRows
}: DataTableProps) {
  const isMounted = useIsMounted();
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [stickyColumn, setStickyColumn] = useState<null | number>(null);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  useEffect(() => {
    if (sortingColumn) {
      setSorting([{ id: sortingColumn, desc: false }]);
    }
  }, [sortingColumn]);

  const totalPage = Math.ceil(
    (pagination?.pageCount ?? 0) / (pagination?.pageParams?.pageSize ?? 20)
  );

  const paginationParams = useMemo(
    () =>
      pagination?.manual
        ? {
            manualPagination: true,
            pageCount: totalPage ?? -1,
            onPaginationChange: pagination?.onChangePagination
          }
        : {
            getPaginationRowModel: getPaginationRowModel()
          },
    [pagination]
  );
  const table = isMounted.current
    ? useReactTable({
        columns,
        data,
        state: pagination?.manual
          ? {
              globalFilter: filter?.globalFilter?.trim(),
              grouping,
              sorting,
              columnOrder,
              pagination: {
                pageIndex: pagination.pageParams?.pageIndex ?? 0,
                pageSize: pagination.pageParams?.pageSize ?? 20
              }
            }
          : {
              globalFilter: filter?.globalFilter?.trim(),
              grouping,
              sorting,
              columnOrder
            },

        getFilteredRowModel: getFilteredRowModel(),
        onGroupingChange: setGrouping,
        getGroupedRowModel: getGroupedRowModel(),
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: filter?.setGlobalFilter,
        globalFilterFn: filterFunction,
        ...paginationParams
      })
    : useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        ...paginationParams
      });

  useEffect(() => {
    setTable?.(table);
    table.setPageSize(pagination?.pageParams?.pageSize ?? 20);
  }, [table]);
  useEffect(() => {
    localStorage.getItem("pinIndex")
      ? localStorage.removeItem("pinIndex")
      : null;
  }, []);
  useEffect(() => {
    setFilteredRows &&
      setFilteredRows(
        table?.getFilteredRowModel()?.rows?.map(item => item.original)
      );
  }, [filter?.globalFilter]);

  useEffect(() => {
    table.getHeaderGroups().map(headerGroup =>
      headerGroup.headers.map(({ index }) => {
        columns[index]?.enablePinning &&
          setStickyColumn(
            localStorage.getItem("pinIndex")
              ? Number(localStorage.getItem("pinIndex"))
              : index + 1
          );
      })
    );
  }, [columns, data, table]);

  return (
    <>
      <Box
        overflowX={isLoading ? "hidden" : "scroll"}
        pb={2}
        css={{
          scrollbarGutter: "stable",
          "&::-webkit-scrollbar": {
            width: "0.2rem",
            height: "0.6rem",
            position: "absolute"
          },
          "&::-webkit-scrollbar-track": {
            position: "absolute",
            background: "#fff",
            opacity: 0.1
          },
          "&::-webkit-scrollbar-thumb": {
            background: colorScheme.purple_100,
            borderRadius: 20
          }
        }}
        sx={
          modalProps?.sticky
            ? {
                maxH: modalProps.height,
                overflow: "auto",
                th: {
                  position: "sticky",
                  top: 0
                },
                table: {
                  borderCollapse: "collapse"
                }
              }
            : {}
        }
        borderRadius={8}
      >
        <Table bg="white">
          <Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Tr
                key={headerGroup.id}
                css={{
                  [`th:nth-of-type(${stickyColumn})`]: {
                    position: "sticky",
                    left: "-1px",
                    right: "-1px",
                    zIndex: 10,
                    boxShadow: "inset 1px 0 0 white,inset -1px 0 0 white"
                  }
                }}
              >
                {headerGroup.headers.map((header, index) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      textTransform="capitalize"
                      whiteSpace="nowrap"
                      style={{
                        width: `${columns[index]?.size}%` ?? header.getSize(),
                        textAlign:
                          header.id == "Actions" ||
                          header.id == "Action" ||
                          header.colSpan > 1
                            ? "center"
                            : "left"
                      }}
                    >
                      <HStack justifyContent={"space-between"}>
                        <Text flex={1}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </Text>
                        {pinColumnAccess && header.id != "S.N." && (
                          <IconButton
                            variant="outline"
                            px={1}
                            py={1}
                            size={"small"}
                            aria-label="Minify sidebar"
                            color="inherit"
                            onClick={() => {
                              if (stickyColumn == index + 1) {
                                setStickyColumn(null);
                                localStorage.removeItem("pinIndex");
                              } else {
                                setStickyColumn(index + 1);
                                localStorage.setItem(
                                  "pinIndex",
                                  `${index + 1}`
                                );
                              }
                            }}
                            ml={4}
                            bg={
                              stickyColumn == index + 1
                                ? "white"
                                : "transparent"
                            }
                          >
                            <AiOutlinePushpin />
                          </IconButton>
                        )}
                      </HStack>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map(row => (
              <Tr
                key={row.id}
                css={{
                  [`td:nth-of-type(${stickyColumn})`]: {
                    position: "sticky",
                    left: "-1px",
                    right: "-1px",
                    zIndex: 10,
                    boxShadow: "inset 1px 0 0 #edf2f7,inset -1px 0 0 #edf2f7"
                  },
                  [`td:nth-of-type(${stickyColumn}) , td:not(:last-child)`]: {
                    boxShadow: "inset 1px 0 0 #edf2f7"
                  }
                }}
              >
                {row.getVisibleCells().map(cell => {
                  const value =
                    typeof cell?.getContext().getValue() == "string"
                      ? (cell?.getContext().getValue() as string)
                      : "";
                  return (
                    <Td
                      key={cell.id}
                      pl={4}
                      sx={{
                        whiteSpace: value?.length > 120 ? "initial" : "nowrap"
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
          {showFooter ? (
            <Tfoot>
              {table.getFooterGroups().map(footerGroup => (
                <Tr key={footerGroup.id}>
                  {footerGroup.headers.map(header => (
                    <Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Tfoot>
          ) : (
            ""
          )}
        </Table>
        {data?.length < 1 &&
          (isLoading ? <LoadingIllustration /> : <ResultNotFound />)}
      </Box>
      <HStack marginY={3}>
        {pagination ? (
          <HStack
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            width={"100%"}
            // float={"right"}
            mt={3}
          >
            <Flex justifyContent={"flex-start"}>
              <FormControl display={"flex"}>
                <FormLabel
                  marginInlineStart={"5% !important"}
                  marginStart={"5% !important"}
                  fontSize={"14px"}
                  fontWeight={500}
                  minWidth={"fit-content"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  Rows per page:
                </FormLabel>
                <Select
                  borderRadius={"8px"}
                  icon={<MdArrowDropDown />}
                  padding="2px 8px 2px 12px"
                  align-items="center"
                  w={"100px"}
                  value={table.getState().pagination.pageSize}
                  onChange={e => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 15, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>

            <Pagination
              isBackendPaginated={pagination?.manual}
              table={table}
              pageIndex={pagination?.pageParams?.pageIndex}
              pageCount={pagination?.pageCount ?? data?.length}
            />
          </HStack>
        ) : (
          ""
        )}
      </HStack>
    </>
  );
}

export const customTableTotalData = (
  label: string,
  count?: number | string
) => {
  return (
    <>
      <Text fontWeight={"bold"}>
        {`${label}` + " : "}
        {count}
      </Text>
    </>
  );
};
