import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
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
  ILedgerHeadResponse,
  useDeleteLedgerHead,
  useGetAlLedgerlList
} from "@neo/services/MasterData/service-ledge-setup";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AddLedgerHeadModal from "./AddLedger";
const Accounting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editId, setEditId] = useState(null as number | null);
  const [changeId, setChangeId] = useState(null as number | null);
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const { data: ledgerList } = useGetAlLedgerlList();

  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeleteLedgerHead();

  const {
    isOpen: isOpenLedgerHeadDeleteModal,
    onOpen: onOpenLedgerHeadDeleteModal,
    onClose: onCloseLedgerHeadDeleteModal
  } = useDisclosure();

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (data: any) => {
        return data?.row?.index + 1;
      }
    },
    {
      header: "Ledger Head Name",
      accessorKey: "name"
    },
    {
      header: "Ledger Short Code",
      accessorKey: "shotCode"
    },
    {
      header: "Description",
      accessorKey: "description"
    },
    {
      header: "Partner Ledger",
      accessorKey: "isPartnerLedger",
      cell: (data: any) => {
        return data.row.original.isPartnerLedger ? "Yes" : "No";
      }
    },
    {
      header: "Currency",
      accessorKey: "currency.name"
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<ILedgerHeadResponse, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id);
                onOpen();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setChangeId(cell?.row?.original?.id);
                onOpenLedgerHeadDeleteModal();
              }}
              icon={<svgAssets.DeleteButton />}
              label="Delete"
            />
          </HStack>
        );
      }
    }
  ];
  const { pathname } = useLocation();
  const activePath = breadcrumbTitle(pathname);
  const [isDekstop] = useMediaQuery("(min-width:1000px)");
  const [searchText, setSearchText] = useState<string>("" as string);
  const handleDelete = async () => {
    await mutateDelete(changeId);
    setChangeId(null);
    onCloseLedgerHeadDeleteModal();

    onClose;
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Ledger Head Setup" options={activePath} />
      <Card borderRadius={"16px"} boxShadow="0px 4px 18px 0px rgba (0,0,0,0,3)">
        <CardBody>
          <HStack justifyContent={"space-between"}>
            <HStack
              display="flex"
              alignItems={"Center"}
              padding="24px 20px"
              gap={"16px"}
              alignSelf={"stretch"}
            >
              {isDekstop ? (
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
              <FilterButton onClick={() => {}} />
            </HStack>
            <Button
              cursor={"pointer"}
              leftIcon={<svgAssets.AddButton />}
              minW={"max-content"}
              onClick={onOpen}
            >
              Add Ledger Head
            </Button>
          </HStack>

          <DataTable
            pagination={{
              manual: false,
              pageParams: pageParams,
              onChangePagination: setPageParams
            }}
            filter={{
              globalFilter: searchText,
              setGlobalFilter: setSearchText
            }}
            data={ledgerList ?? []}
            columns={columns}
          />
        </CardBody>
      </Card>
      <AddLedgerHeadModal
        isOpen={isOpen}
        onClose={onClose}
        editId={editId}
        data={ledgerList}
        setEditId={setEditId}
      />
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You  Sure"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove data file from the system. This cannot be Undone."
        isOpen={isOpenLedgerHeadDeleteModal}
        onClose={() => {
          setChangeId(null);
          onCloseLedgerHeadDeleteModal();
        }}
      />
    </Flex>
  );
};

export default Accounting;
