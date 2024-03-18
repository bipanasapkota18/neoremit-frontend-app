import {
  Badge,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Switch,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import BreadCrumb from "@neo/components/BreadCrumb";
import FilterButton from "@neo/components/Button/FilterButton";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import {
  IDocumentResponse,
  useDeleteDocument,
  useGetAllDocument,
  useGetDocumentById,
  useUpdateDocument
} from "@neo/services/MasterData/service-document-setup";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { svgAssets } from "../../../../assets/images/svgs/index";
import AddDocument from "./AddDocument";

const Document = () => {
  const {
    isOpen: isOpenDocumentAddModal,
    onOpen: onOpenDocumentAddModal,
    onClose: onCloseDocumentAddModal
  } = useDisclosure();

  const {
    isOpen: isOpenDocumentDeleteModal,
    onOpen: onOpenDocumentDeleteModal,
    onClose: onCloseDocumentDeleteModal
  } = useDisclosure();
  const {
    isOpen: isOpenDocumentStatusUpdateModal,
    onOpen: onOpenDocumentStatusUpdateModal,
    onClose: onCloseDocumentStatusUpdateModal
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
  const {
    mutateAsync: mutateUpdateDocument,
    isLoading: isStatusUPdateLoading
  } = useUpdateDocument();
  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeleteDocument();
  const { data: documentData } = useGetAllDocument();
  const { data: editData } = useGetDocumentById(changeId);
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (data: any) => {
        return data.row.index + 1;
      }
    },
    {
      header: "Document Name",
      accessorKey: "documentName",
      size: 50
    },

    {
      header: "Allow Extension",
      accessorKey: "allowedExtensions",
      size: 100,
      cell: (cell: CellContext<IDocumentResponse, any>) => {
        return cell.row.original.allowedExtensions.map((item, index) => {
          return (
            <Badge key={index} padding="8px 24px" mx={2} borderRadius={"16px"}>
              {item}
            </Badge>
          );
        });
      }
    },
    {
      header: "Document Size( in MB)",
      accessorKey: "documentSize"
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (data: any) => {
        return (
          <Switch
            name="status"
            size="lg"
            isChecked={data?.row?.original?.isActive}
            onChange={() => {
              setActive(data?.row?.original?.isActive);
              setChangeId(data?.row?.original?.id);
              onOpenDocumentStatusUpdateModal();
            }}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<IDocumentResponse, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id || null);
                onOpenDocumentAddModal();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setChangeId(cell?.row?.original?.id || null);
                onOpenDocumentDeleteModal();
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
    onCloseDocumentDeleteModal();
  };
  const handleStatusChange = async () => {
    if (changeId !== null) {
      await mutateUpdateDocument({
        id: changeId,
        data: {
          documentName: editData?.data?.data?.documentName ?? "",
          allowedExtensions: editData?.data?.data?.allowedExtensions ?? [],
          documentCode: editData?.data?.data?.documentCode ?? "",
          documentSize:
            editData?.data?.data?.documentSize ?? ("" as unknown as number),

          isActive: !active
        }
      });
    }
    setChangeId(null);
    onCloseDocumentStatusUpdateModal();
  };
  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Document Setup" options={activePath} />
      <Card
        borderRadius={"16px"}
        boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
      >
        <CardBody>
          <HStack justifyContent={"space-around"}>
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
              onClick={onOpenDocumentAddModal}
            >
              Add Document
            </Button>
          </HStack>
          <DataTable
            pagination={{
              manual: false,
              pageParams: pageParams,
              onChangePagination: setPageParams
            }}
            data={Array.isArray(documentData) ? documentData : []}
            columns={columns}
            filter={{
              globalFilter: searchText,
              setGlobalFilter: setSearchText
            }}
          />
        </CardBody>
      </Card>

      <AddDocument
        data={documentData}
        editId={editId ?? null}
        setEditId={setEditId}
        isOpen={isOpenDocumentAddModal}
        onClose={() => {
          setEditId(null);
          onCloseDocumentAddModal();
        }}
      />
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this file from the system. This cannot be Undone."
        isOpen={isOpenDocumentDeleteModal}
        onClose={() => {
          setChangeId(null);
          onCloseDocumentDeleteModal();
        }}
      />
      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isStatusUPdateLoading}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} this document?`}
        isOpen={isOpenDocumentStatusUpdateModal}
        onClose={() => {
          setChangeId(null);
          onCloseDocumentStatusUpdateModal();
        }}
      />
    </Flex>
  );
};

export default Document;
