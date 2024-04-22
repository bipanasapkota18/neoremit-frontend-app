import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Switch,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import BreadCrumb from "@neo/components/BreadCrumb";
import FilterButton from "@neo/components/Button/FilterButton";
import { DataTable } from "@neo/components/DataTable";
import SearchInput from "@neo/components/Form/SearchInput";
import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import {
  useBlockUnblocktoggle,
  useGetAllUsers
} from "@neo/services/MasterData/service-user-management";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import CreateUserModal from "./CreateUser";

const CreateUser = () => {
  const { data: userData } = useGetAllUsers();

  const {
    isOpen: isOpenUserAddModal,
    onOpen: onOpenUserAddModal,
    onClose: onCloseUserAddModal
  } = useDisclosure();
  const {
    isOpen: isOpenUserEditModal,
    onOpen: onOpenUserEditModal,
    onClose: onCloseUserEditModal
  } = useDisclosure();

  const { mutateAsync: mutateStatusUpdateBlockUnblock } =
    useBlockUnblocktoggle();
  const [active, setActive] = useState(false);
  const [changeId, setChangeId] = useState(null as number | null);
  const [isDekstop] = useMediaQuery("(min-width:1000px)");
  const [searchText, setSearchText] = useState<string>("" as string);
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (data: any) => {
        return data?.row?.index + 1;
      }
    },
    {
      header: "Full Name",
      accessorKey: "fullName"
    },

    {
      header: "Email",
      accessorKey: "email"
    },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber"
    },

    {
      header: "Role",
      accessorKey: "role"
    },

    {
      header: "Block/Unblock",
      accessorKey: "blockUnblock",
      cell: (data: any) => {
        return (
          <Switch
            name="isblocked"
            size="lg"
            isChecked={data?.row?.original?.isUnlocked}
            onChange={() => {
              setActive(!active);
              setChangeId(data?.row?.original?.id);
              onOpenUserEditModal();
            }}
          />
        );
      }
    }
  ];

  const handleCreateUserClick = () => {
    onOpenUserAddModal();
  };
  const { pathname } = useLocation();
  const activePath = breadcrumbTitle(pathname);

  const handlestatuschange = async () => {
    try {
      await mutateStatusUpdateBlockUnblock(changeId);
      setChangeId(null);
      onCloseUserEditModal();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="User" options={activePath} />
      <Card borderRadius={"16px"} boxShadow="0px 4px 18px 0px rgba (0,0,0,0,3)">
        <CardBody>
          <HStack justifyContent="space-between">
            <HStack
              display="flex"
              padding="24px 20px"
              alignItems="center"
              gap="16px"
              alignSelf="stretch"
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
              minW={"max-content"}
              cursor={"pointer"}
              leftIcon={<svgAssets.AddButton />}
              onClick={handleCreateUserClick}
            >
              Create User
            </Button>
          </HStack>

          <DataTable
            filter={{
              globalFilter: searchText,
              setGlobalFilter: setSearchText
            }}
            pagination={{
              pageParams: pageParams,
              onChangePagination: setPageParams
            }}
            data={userData ?? []}
            columns={columns}
          />
        </CardBody>
      </Card>
      <CreateUserModal
        onClose={onCloseUserAddModal}
        isOpen={isOpenUserAddModal}
      />

      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Block" : "Unblock"}`}
        title={"Are You Sure"}
        onApprove={handlestatuschange}
        message={`Are you sure you want to ${active ? "Block" : "Unblock"} this user?`}
        isOpen={isOpenUserEditModal}
        onClose={onCloseUserEditModal}
      />
    </Flex>
  );
};

export default CreateUser;
