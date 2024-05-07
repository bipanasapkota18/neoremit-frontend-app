import {
  Badge,
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
import TextInput from "@neo/components/Form/TextInput";
import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import {
  CountriesList,
  useGetAllCountries
} from "@neo/services/MasterData/service-country";
import {
  FeeAndChargesDetail,
  IFeeAndChargeResponse,
  useAddFeesAndCharges,
  useFeeAndChargesDetailDelete,
  useGetFeeAndChargesbyId,
  useUpdateFeesAndCharges
} from "@neo/services/service-fees-and-charges";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { CellContext } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AddFeeAndChargesDetails from "./AddFeeAndChargesDetails";

const defaultValues = {
  feeName: "",
  countryId: null as ISelectOptions<number> | null,
  currencyId: null as ISelectOptions<number> | null
};

export interface IArrayValues {
  addId: number;
  payoutMethods: any;
  feeAndChargeType: string;
  fromAmount: number;
  toAmount: number;
  fee: number;
}
interface AddFeeandChargesProps {
  onClose: () => void;
  editId: number | null;
  data: IFeeAndChargeResponse[] | undefined;
  setEditId: Dispatch<SetStateAction<number | null>>;
}

const AddFeeandCharges = ({
  onClose,
  editId,
  data: editData,
  setEditId
}: AddFeeandChargesProps) => {
  const schema = yup.object().shape({
    feeName: yup.string().required("Fee Name is required"),
    countryId: yup.object().required("Country is required").nullable()
  });
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });
  const [tableData, setTableData] = useState<IArrayValues[]>([]);
  const { mutateAsync: mutateAddFeeandCharges } = useAddFeesAndCharges();
  const { mutateAsync: mutateUpdateFeeandCharges } = useUpdateFeesAndCharges();
  const { mutateAsync: mutateDeleteFeeAndCharges, isLoading: isDeleteLoading } =
    useFeeAndChargesDetailDelete();
  const {
    isOpen: isOpenAddDetailModal,
    onOpen: onOpenAddDetailModal,
    onClose: onModalClose
  } = useDisclosure();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const [editDetailId, setEditDetailId] = useState<number | null>(null);
  const { data: feeAndChargeDetails, isLoading: isGetFeeAndChargesLoading } =
    useGetFeeAndChargesbyId(editId);
  const { data: countryList, mutateAsync } = useGetAllCountries();
  useEffect(() => {
    mutateAsync({
      pageParams: {
        page: 0,
        size: countryList?.data?.data?.totalItems ?? 20
      },
      filterParams: {}
    });
  }, []);
  const countryOptions = formatSelectOptions({
    data: countryList?.data?.data?.countriesList,
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
      const selectedFee = editData?.find(data => data.id === editId);

      const selectedCountry = countryList?.data?.data?.countriesList?.find(
        (country: any) => {
          return selectedFee?.country?.name === country?.name;
        }
      )?.name;
      reset({
        feeName: selectedFee?.feeName,
        countryId: {
          value: selectedFee?.country?.id,
          label: selectedCountry
        }
      });
    }
  }, [editId, editData, countryList?.data?.data?.countriesList]);

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
        accessorKey: "payoutMethods",
        size: 100,
        cell: (data: CellContext<FeeAndChargesDetail, any>) => {
          return data?.row?.original?.payoutMethods?.map(
            (item: any, index: number) => {
              return (
                <Badge
                  key={index}
                  padding="8px 24px"
                  mx={2}
                  borderRadius={"16px"}
                >
                  {tableData?.length > 0 ? item?.label : item?.name}
                </Badge>
              );
            }
          );
        }
      },
      {
        header: "Fee and Charge Type",
        accessorKey: "feeAndChargeType"
      },
      {
        header: "Fee",
        accessorKey: "fee"
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
      const selectedFee = editData?.find(data => data.id === editId);
      await mutateUpdateFeeandCharges({
        id: editId,
        ...data,
        countryId: selectedFee?.country?.id ?? "",
        currencyId: selectedFee?.currencyDetailResponseDto?.id ?? "",
        feeAndChargesDetails:
          feeAndChargeDetails?.data?.data?.feeAndChargesDetails ?? []
      });
    } else {
      const finalTable = tableData.map(item => ({
        fromAmount: item.fromAmount,
        toAmount: item.toAmount,
        feeAndChargeType: item.feeAndChargeType,
        fee: item.fee,
        payoutMethods:
          item?.payoutMethods?.map(
            (item: ISelectOptions<number>) => item.value
          ) ?? []
      }));
      await mutateAddFeeandCharges({
        ...data,
        countryId: data.countryId?.value ?? "",
        currencyId: countryList?.data?.data?.countriesList?.find(
          (country: CountriesList) => data.countryId?.label === country?.name
        )?.currency?.id,
        feeAndChargesDetails: finalTable
      });
      // await mutateAddFeeandCharges({
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
      <form onSubmit={handleSubmit(handleSaveFeeandCharges)}>
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
                Fee Details
              </Heading>
              <Box padding={"24px"} gap={"20px"} width={"100%"}>
                <SimpleGrid columns={{ sm: 1, md: 1, lg: 3 }} spacing={10}>
                  <GridItem colSpan={1}>
                    <TextInput
                      control={control}
                      name="feeName"
                      label="Enter Fee Name"
                      type="text"
                      required
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Select
                      name="countryId"
                      placeholder="Country"
                      control={control}
                      options={countryOptions ?? []}
                      required
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <TextInput
                      control={control}
                      name="currencyId"
                      label="Currency"
                      type="text"
                      isRequired
                      isReadOnly
                      value={
                        watch("countryId")
                          ? countryList?.data?.data?.countriesList?.find(
                              (country: CountriesList) => {
                                return (
                                  watch("countryId")?.label === country?.name
                                );
                              }
                            )?.currency?.name
                          : ""
                      }
                    />
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
              Fees and Charges Details
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
                    Add Fee and Charges Details
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
                      : feeAndChargeDetails?.data?.data?.feeAndChargesDetails ??
                        []
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
                // onClick={}
                type="submit"
              >
                Save
              </Button>
            </Flex>
          </CardBody>
        </Card>

        <AddFeeAndChargesDetails
          tableData={tableData}
          EditDetailId={editDetailId}
          setEditDetailId={setEditDetailId}
          setTableData={setTableData}
          data={feeAndChargeDetails?.data?.data}
          isOpen={isOpenAddDetailModal}
          onClose={() => {
            setEditDetailId(null);
            onModalClose();
          }}
        />
      </form>
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

export default AddFeeandCharges;
