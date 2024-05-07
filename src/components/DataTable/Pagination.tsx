import {
  Box,
  Center,
  IconButton,
  Stack,
  Text,
  Tooltip
} from "@chakra-ui/react";
import { colorScheme } from "@neo/theme/colorScheme";
import { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight
} from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface IPagination {
  isBackendPaginated?: boolean;
  pageIndex?: number;
  table: Table<any>;
  pageCount?: number;
}

function Pagination({ isBackendPaginated, pageIndex, table }: IPagination) {
  const totalPage = useMemo(() => {
    return table.getPageCount();
  }, [table.getPageCount()]);

  const currentPage = useMemo(() => {
    return isBackendPaginated
      ? (pageIndex ?? 0) + 1
      : table.getState().pagination.pageIndex + 1;
  }, [isBackendPaginated, pageIndex, table.getState().pagination.pageIndex]);

  const PageNumberWrapper = (item: number, totalPage: number) => {
    return (
      <Center
        h={"28px"}
        w={"60px"}
        bg={colorScheme.gray_50}
        // borderRadius={20}
        color={colorScheme.gray_700}
        cursor={"default"}
        fontSize={"md"}
        userSelect="none"
        border={"1px solid"}
        borderColor={"#E2E8F0"}
        borderRadius="8px"
      >
        <Text mt={0.5}>
          {item} of {totalPage}
        </Text>
      </Center>
    );
    // ) : (
    //   <Center
    //     h={9}
    //     w={9}
    //     _hover={{ bg: colorScheme.purple_400, color: "white" }}
    //     borderRadius={20}
    //     cursor="pointer"
    //     userSelect="none"
    //     onClick={() => {
    //       table.setPageIndex(item - 1);
    //     }}
    //   >
    //     {item}
    //   </Center>
    // );
  };

  return (
    <Box
      display={"flex"}
      justifyContent="flex-end"
      alignItems={"center"}
      height={"50px"}
    >
      <Box marginX={"16px"}>
        <Stack direction={"row"} alignItems="center" columnGap={0}>
          <IconButton
            variant={"outline"}
            aria-label="First Page"
            borderRadius="10px"
            onClick={() => table.setPageIndex(0)}
            size="xs"
            fontSize={"lg"}
            border={"none"}
            disabled={!table.getCanPreviousPage()}
            icon={<HiOutlineChevronDoubleLeft />}
          />
          <IconButton
            variant={"outline"}
            aria-label="Previous Page"
            borderRadius="10px"
            onClick={() => table.previousPage()}
            size="xs"
            fontSize={"lg"}
            border={"none"}
            disabled={!table.getCanPreviousPage()}
            icon={<IoIosArrowBack />}
          />
          {PageNumberWrapper(currentPage, totalPage)}
          {/* {currentPage != 1 && PageNumberWrapper(currentPage - 1)}
          {currentPage < totalPage && PageNumberWrapper(currentPage + 1)}
          {totalPage < currentPage - 1 &&
            totalPage - 1 > 0 &&
            PageNumberWrapper(totalPage - 1)} */}

          <IconButton
            aria-label="Next Page"
            variant={"outline"}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            size="xs"
            fontSize={"lg"}
            border="none"
            icon={<IoIosArrowForward />}
          />
          <Tooltip
            borderRadius={"4px"}
            hasArrow
            label={`Last Page: ${totalPage}`}
            placement="top"
          >
            <IconButton
              aria-label="Last Page"
              variant={"outline"}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              size="xs"
              fontSize={"lg"}
              border="none"
              icon={<HiOutlineChevronDoubleRight />}
            />
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  );
}

export default Pagination;
