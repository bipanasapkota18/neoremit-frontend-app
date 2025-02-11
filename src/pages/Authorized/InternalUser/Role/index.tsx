import {
  Badge,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Switch,
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
import {
  IRoleResponse,
  useGetAllRoles,
  useToggleRoleStatus
} from "@neo/services/MasterData/service-role";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AddRole from "./AddRoleModal";

const PayoutMethod = () => {
  const [flag, setFlag] = useBoolean();
  const { pathname } = useLocation();

  const {
    isOpen: isOpenRoleStatusToggleModal,
    onOpen: onOpenRoleStatusToggleModal,
    onClose: onCloseRoleStatusToggleModal
  } = useDisclosure();

  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const [editId, setEditId] = useState(null as number | null);
  const [active, setActive] = useState(false);
  const [changeId, setChangeId] = useState(null as number | null);
  const [searchText, setSearchText] = useState<string>("" as string);
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const { data: roleData, isLoading: isPayoutMethodLoading } = useGetAllRoles();
  const { refetch, isLoading: isToggling } = useToggleRoleStatus(changeId);

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
        return cell?.row?.original?.moduleList
          ?.slice(0, 5)
          .map((item, index) => {
            return (
              <Badge
                key={index}
                padding="8px 24px"
                mr={2}
                borderRadius={"16px"}
              >
                {item?.moduleName}
              </Badge>
            );
          })
          .concat(
            cell?.row?.original?.moduleList?.length > 5 ? (
              <Badge
                key="ellipsis"
                padding="8px 24px"
                mx={2}
                borderRadius={"16px"}
              >
                + {cell?.row?.original?.moduleList?.length - 5} more
              </Badge>
            ) : (
              []
            )
          );
      },
      size: 100
    },
    {
      header: "Hierarchy",
      accessorKey: "roleHierarchy"
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (data: any) => {
        return (
          <Switch
            name="status"
            size="lg"
            colorScheme="facebook"
            isChecked={data?.row?.original?.active}
            onChange={() => {
              setActive(data?.row?.original?.active);
              setChangeId(data?.row?.original?.roleId);
              onOpenRoleStatusToggleModal();
            }}
          />
        );
      }
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
          </HStack>
        );
      }
    }
  ];
  const activePath = breadcrumbTitle(pathname);

  const handleStatusChange = async () => {
    try {
      await refetch();
      setChangeId(null);
      onCloseRoleStatusToggleModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb
        currentPage="Roles"
        options={activePath}
        customOnClick={{
          trigger: !!editId || flag,
          func: () => {
            setEditId(null);
            setFlag.off();
          }
        }}
      />
      <Card>
        <CardBody>
          {flag ? (
            <AddRole
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
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isToggling}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} this role?`}
        isOpen={isOpenRoleStatusToggleModal}
        onClose={() => {
          setChangeId(null);
          onCloseRoleStatusToggleModal();
        }}
      />
    </Flex>
  );
};

export default PayoutMethod;
