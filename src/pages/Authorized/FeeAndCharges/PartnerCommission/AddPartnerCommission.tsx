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
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";
import { svgAssets } from "@neo/assets/images/svgs";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import Select from "@neo/components/Form/SelectComponent";
import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import { useGetCountryList } from "@neo/services/MasterData/service-country";
import { useGetCurrencyList } from "@neo/services/MasterData/service-currency";
import {
  FeeAndChargesDetail,
  IFeeAndChargeResponse
} from "@neo/services/service-fees-and-charges";
import {
  useAddPartnerCommission,
  useDeletePartnerCommissionDetails,
  useGetPartnerCommissionById,
  useUpdatePartnerCommission
} from "@neo/services/service-partner-commission";
import { useGetAllPartners } from "@neo/services/service-partner-setup";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { CellContext } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AddPartnerCommissionDetails from "./AddPartnerCommissionDetails";

const defaultValues = {
  partnerId: null as ISelectOptions<number> | null,
  payoutCountryId: null as ISelectOptions<number> | null,
  commissionCurrencyId: null as ISelectOptions<number> | null,
  partnerCommissionPaymentRequestList: []
};

export interface IArrayValues {
  addId: number;
  paymentMethod: any;
  type: string;
  fromAmount: number;
  toAmount: number;
  commission: number;
}
interface AddPartnerCommissionProps {
  onClose: () => void;
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
}

const AddPartnerCommission = ({
  onClose,
  editId,
  setEditId
}: AddPartnerCommissionProps) => {
  const schema = yup.object().shape({
    partnerId: yup.object().required("Select a Partner").nullable(),
    payoutCountryId: yup.object().required("Select a country").nullable(),
    commissionCurrencyId: yup.object().required("Select a curency").nullable()
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });
  const [tableData, setTableData] = useState<IArrayValues[]>([]);
  const { mutateAsync: mutatePartnerCommission, isLoading: isAddLoading } =
    useAddPartnerCommission();
  const {
    mutateAsync: mutateUpdatePartnerCommission,
    isLoading: isUpdateLoading
  } = useUpdatePartnerCommission();
  const { mutateAsync: mutateDeleteFeeAndCharges, isLoading: isDeleteLoading } =
    useDeletePartnerCommissionDetails();
  const {
    isOpen: isOpenAddDetailModal,
    onOpen: onOpenAddDetailModal,
    onClose: onModalClose
  } = useDisclosure();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const [editDetailId, setEditDetailId] = useState<number | null>(null);

  const { data: partnerData } = useGetAllPartners();
  const partnerOptions = formatSelectOptions({
    data: partnerData?.filter((item: any) => item.status),
    valueKey: "id",
    labelKey: "companyName"
  });

  const { data: currencyList } = useGetCurrencyList();
  const currencyOptions = formatSelectOptions({
    data: currencyList?.filter((item: any) => item.isActive),
    valueKey: "id",
    labelKey: "name"
  });

  const { data: partnerCommissionData, isLoading: isGetFeeAndChargesLoading } =
    useGetPartnerCommissionById(editId);
  const { data: countryList } = useGetCountryList();

  const countryOptions = formatSelectOptions({
    data: countryList?.data?.data,
    valueKey: "id",
    labelKey: "name"
  });
  const {
    isOpen: isOpenFeeAndChargeDeleteModal,
    onOpen: onOpenFeeAndChargeDeleteModal,
    onClose: onCloseFeeAndChargeDeleteModal
  } = useDisclosure();

  useEffect(() => {
    if (editId) {
      reset({
        partnerId: {
          value: partnerCommissionData?.partner?.id,
          label: partnerCommissionData?.partner?.companyName
        },
        payoutCountryId: {
          value: partnerCommissionData?.payoutCountry?.id,
          label: partnerCommissionData?.payoutCountry?.name
        },
        commissionCurrencyId: {
          value: partnerCommissionData?.commissionCurrency?.id,
          label: partnerCommissionData?.commissionCurrency?.name
        }
      });
    }
  }, [partnerCommissionData]);

  const columns = useMemo(
    () => [
      {
        header: "S.N",
        accessorKey: "sn",
        cell: (cell: CellContext<FeeAndChargesDetail, any>) => {
          return cell?.row?.index + 1;
        }
      },
      {
        header: "Payment Method",
        accessorKey:
          tableData?.length !== 0 ? "paymentMethod.label" : "paymentMethod",
        size: 100
      },
      {
        header: "From",
        accessorKey: "fromAmount"
      },
      {
        header: "To",
        accessorKey: "toAmount"
      },
      {
        header: "Commission",
        accessorKey: "commission"
      },
      {
        header: "Action",
        accessorKey: "action",

        cell: (cell: CellContext<IFeeAndChargeResponse, any>) => {
          return (
            <HStack>
              <TableActionButton
                onClickAction={() => {
                  if (tableData.length > 0) {
                    setEditDetailId(cell?.row?.original?.addId ?? null);
                  } else {
                    setEditDetailId(cell?.row?.original?.id);
                  }
                  onOpenAddDetailModal();
                }}
                icon={<svgAssets.EditButton />}
                label="Edit"
              />
              <TableActionButton
                onClickAction={() => {
                  if (tableData.length > 0) {
                    setEditDetailId(cell?.row?.original?.addId ?? null);
                  } else {
                    setEditDetailId(cell?.row?.original?.id);
                  }
                  onOpenFeeAndChargeDeleteModal();
                }}
                icon={<svgAssets.DeleteButton />}
                label="Delete"
              />
            </HStack>
          );
        }
      }
    ],
    [tableData]
  );
  const handleDelete = async () => {
    try {
      if (tableData.length > 0) {
        const newTableData = tableData?.filter(
          data => data.addId !== editDetailId
        );
        setTableData(newTableData);
      } else {
        await mutateDeleteFeeAndCharges(editDetailId);
      }
      setEditDetailId(null);
      onCloseFeeAndChargeDeleteModal();
    } catch (e) {
      console.error(e);
    }
  };
  const handleSaveFeeandCharges = async (data: typeof defaultValues) => {
    if (editId) {
      await mutateUpdatePartnerCommission({
        id: editId,
        data: {
          partnerId: data?.partnerId?.value ?? null,
          commissionCurrencyId: data?.commissionCurrencyId?.value ?? null,
          payoutCountryId: data?.payoutCountryId?.value ?? null
        }
      });
    } else {
      const finalTable = tableData.map(item => ({
        fromAmount: item.fromAmount,
        toAmount: item.toAmount,
        commission: item.commission,
        paymentMethod: item?.paymentMethod?.label.toUpperCase() ?? null,
        type: item.type
      }));

      await mutatePartnerCommission({
        ...data,
        partnerId: data.partnerId?.value ?? null,
        commissionCurrencyId: data.commissionCurrencyId?.value ?? null,
        payoutCountryId: data.payoutCountryId?.value ?? null,
        partnerCommissionPaymentRequestList: finalTable ?? []
      });
      // await mutatePartnerCommission({
      //   ...data,
      //   countryId: data.countryId?.value ?? "",
      //   currencyId: countryData?.find(
      //     (country: CountriesList) => data.countryId?.label === country?.name
      //   )?.currency?.id,
      //   feeAndChargesDetails: []
      // });
    }
    onClose();
    reset();
    setEditId(null);
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <Card>
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
              Commission Details
            </Heading>
            <Box padding={"24px"} gap={"20px"} width={"100%"}>
              <form>
                <SimpleGrid columns={{ sm: 1, md: 1, lg: 3 }} spacing={10}>
                  <GridItem colSpan={1}>
                    <Select
                      name="partnerId"
                      placeholder="-Select Partner-"
                      control={control}
                      options={partnerOptions ?? []}
                      required
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Select
                      name="payoutCountryId"
                      placeholder="Country"
                      control={control}
                      options={countryOptions ?? []}
                      required
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Select
                      control={control}
                      name="commissionCurrencyId"
                      placeholder="Currency"
                      required
                      options={currencyOptions}
                    />
                  </GridItem>
                </SimpleGrid>
              </form>
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
            Partner Commission Details
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
                      type="text"
                    />
                  ) : (
                    ""
                  )}
                </HStack>
                <Button
                  minW={"max-content"}
                  leftIcon={<svgAssets.AddButton />}
                  onClick={() => {
                    onOpenAddDetailModal();
                  }}
                >
                  Add Partner Commssion Details
                </Button>
              </HStack>

              <DataTable
                isLoading={isGetFeeAndChargesLoading}
                pagination={{
                  manual: false
                }}
                data={
                  tableData?.length > 0
                    ? tableData
                    : partnerCommissionData?.paymentDetails ?? []
                }
                columns={columns}
              />
            </CardBody>
          </Card>

          <Flex
            justifyContent={"flex-end"}
            padding={"16px"}
            gap={"16px"}
            width={"100%"}
          >
            <form onSubmit={handleSubmit(handleSaveFeeandCharges)}>
              <Button
                padding={"16px 32px"}
                fontWeight={600}
                color={"#E53E3E"}
                _hover={{ bg: "#FFF5F5" }}
                bg={"#FFF5F5"}
                _active={{ bg: "#FFF5F5" }}
                fontSize={"17px"}
                onClick={() => {
                  setEditId(null);
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                padding={"16px 32px"}
                fontWeight={600}
                type="submit"
                isLoading={isAddLoading || isUpdateLoading}
              >
                Save
              </Button>
            </form>
          </Flex>
        </CardBody>
      </Card>

      <AddPartnerCommissionDetails
        tableData={tableData}
        EditDetailId={editDetailId}
        setEditDetailId={setEditDetailId}
        setTableData={setTableData}
        data={partnerCommissionData}
        isOpen={isOpenAddDetailModal}
        onClose={() => {
          setEditDetailId(null);
          onModalClose();
        }}
      />
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this data from the system. This cannot be Undone."
        isOpen={isOpenFeeAndChargeDeleteModal}
        onClose={onCloseFeeAndChargeDeleteModal}
      />
    </Flex>
  );
};

export default AddPartnerCommission;
