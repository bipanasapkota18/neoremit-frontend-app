import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Switch,
  useBoolean,
  useMediaQuery
} from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import BreadCrumb from "@neo/components/BreadCrumb";
import FilterButton from "@neo/components/Button/FilterButton";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import {
  IFeeAndChargeResponse,
  useGetAllFeesAndCharges
} from "@neo/services/service-fees-and-charges";
import { CellContext } from "@tanstack/react-table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AddFeeandCharges from "./AddFeeandCharges";

const FeeAndCharges = () => {
  const [flag, setFlag] = useBoolean();
  const { pathname } = useLocation();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const [changeId, setChangeId] = useState(null as number | null);
  const [active, setActive] = useState(false);
  const [searchText, setSearchText] = useState<string>("" as string);
  const [editId, setEditId] = useState(null as number | null);
  const { data: feeAndChargesData, isLoading: isDataLoading } =
    useGetAllFeesAndCharges();
  const onDeleteFeeAndCharges = () => {
    //
  };

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (cell: CellContext<IFeeAndChargeResponse, any>) => {
        return cell?.row?.index + 1;
      }
    },
    {
      header: "Fee Name",
      accessorKey: "feeName",
      size: 40
    },
    {
      header: "Country",
      accessorKey: "country",
      size: 30,
      cell: (data: CellContext<IFeeAndChargeResponse, any>) => {
        return data.row.original?.country?.name;
      }
    },
    {
      header: "Currency",
      accessorKey: "currency",
      size: 20,
      cell: (data: CellContext<IFeeAndChargeResponse, any>) => {
        return data.row.original?.currencyDetailResponseDto?.name;
      }
    },
    {
      header: "Status",
      accessorKey: "status",
      size: 20,
      cell: (data: any) => {
        return <Switch size="lg" isChecked={data?.row?.original?.isActive} />;
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (cell: CellContext<IFeeAndChargeResponse, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditId(cell?.row?.original?.id);
                setFlag.on();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={onDeleteFeeAndCharges}
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
      <BreadCrumb
        currentPage={flag ? "Fee and Charges Setup" : "Fee and Charges"}
        options={activePath}
      />
      <Card
        borderRadius={"16px"}
        boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
      >
        <CardBody>
          {flag ? (
            <AddFeeandCharges
              editId={editId}
              setEditId={setEditId}
              data={feeAndChargesData}
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
                  Add Fees and Charges
                </Button>
              </HStack>
              <DataTable
                isLoading={isDataLoading}
                pagination={{
                  manual: false
                }}
                filter={{
                  globalFilter: searchText,
                  setGlobalFilter: setSearchText
                }}
                data={feeAndChargesData ?? []}
                columns={columns}
              />
            </>
          )}
        </CardBody>
      </Card>
      {/* <ConfirmationModal
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
      <ConfirmationModal
        variant={"edit"}
        buttonText={`${active ? "Disable" : "Enable"}`}
        title={"Are You Sure?"}
        isLoading={isStatusUPdateLoading}
        onApprove={handleStatusChange}
        message={`Are you sure you want to ${active ? "Disable" : "Enable"} this payout method?`}
        isOpen={isOpenPayoutMethodStatusUpdateModal}
        onClose={() => {
          setChangeId(null);
          onClosePayoutMethodStatusUpdateModal();
        }}
      /> */}
    </Flex>
  );
};

export default FeeAndCharges;
