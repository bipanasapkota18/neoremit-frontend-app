import {
  Badge,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
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
import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import { useDeletePayoutMethod } from "@neo/services/MasterData/service-payout-method";
import {
  IRoleResponse,
  useGetAllRoles
} from "@neo/services/MasterData/service-role";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AddRole from "./AddRoleModal";

const PayoutMethod = () => {
  const [flag, setFlag] = useBoolean();
  const { pathname } = useLocation();
  const {
    isOpen: isOpenPayoutMethodDeleteModal,
    onOpen: onOpenPayoutMethodDeleteModal,
    onClose: onClosePayoutMethodDeleteModal
  } = useDisclosure();

  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const [editId, setEditId] = useState(null as number | null);
  const [changeId, setChangeId] = useState(null as number | null);
  const [searchText, setSearchText] = useState<string>("" as string);
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const { data: roleData, isLoading: isPayoutMethodLoading } = useGetAllRoles();
  console.log(roleData);
  const { mutateAsync: mutateDelete, isLoading: isDeleteLoading } =
    useDeletePayoutMethod();

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (data: any) => {
        return data.row.index + 1;
      }
    },

    {
      header: "Role Name",
      accessorKey: "roleName",
      size: 20
    },
    {
      header: "Permissions",
      accessorKey: "moduleList",
      cell: (cell: CellContext<IRoleResponse, any>) => {
        return cell.row.original.moduleList.map((item, index) => {
          return (
            <Badge key={index} padding="8px 24px" mx={2} borderRadius={"16px"}>
              {item?.moduleName}
            </Badge>
          );
        });
      },
      size: 100
    },
    {
      header: "Status",
      accessorKey: "status",
      size: 20
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<IRoleResponse, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.roleId || null);
                setFlag.on();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setChangeId(cell?.row?.original?.roleId || null);
                onOpenPayoutMethodDeleteModal();
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
    onClosePayoutMethodDeleteModal();
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Roles" options={activePath} />
      <Card
        borderRadius={"16px"}
        boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
      >
        <CardBody>
          {flag ? (
            <AddRole
              data={roleData}
              editId={editId ?? null}
              setEditId={setEditId}
              onClose={() => {
                setFlag.off();
              }}
            />
          ) : (
            <>
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
                  onClick={setFlag.on}
                >
                  Add Role
                </Button>
              </HStack>
              <DataTable
                pagination={{
                  manual: false,
                  pageParams: pageParams,
                  onChangePagination: setPageParams
                }}
                data={roleData ?? []}
                columns={columns}
                filter={{
                  globalFilter: searchText,
                  setGlobalFilter: setSearchText
                }}
                isLoading={isPayoutMethodLoading}
              />{" "}
            </>
          )}
        </CardBody>
      </Card>
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this file from the system. This cannot be Undone."
        isOpen={isOpenPayoutMethodDeleteModal}
        onClose={() => {
          setChangeId(null);
          onClosePayoutMethodDeleteModal();
        }}
      />
    </Flex>
  );
};

export default PayoutMethod;
