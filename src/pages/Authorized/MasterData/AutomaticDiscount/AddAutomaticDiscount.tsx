import {
  Box,
  Button,
  Card,
  Flex,
  GridItem,
  HStack,
  Heading,
  SimpleGrid
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Editor from "@neo/components/Editor";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import {
  IAutomaticDiscountResponse,
  useAddAutomaticDiscount,
  useUpdateAutomaticDiscount
} from "@neo/services/MasterData/service-automatic-discount";
import { useGetCountryList } from "@neo/services/MasterData/service-country";
import { useGetAllPayoutMethod } from "@neo/services/MasterData/service-payout-method";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const defaultValues = {
  discountName: "",
  description: "",
  countryMasterId: null as ISelectOptions<number> | null,
  payoutMethodIds: null as ISelectOptions<number>[] | null,
  firstNTransactionPerCustomer: {
    noOfTransactions: null as number | null,
    capAmount: null as number | null,
    deductionFrom: null as ISelectOptions<string> | null,
    discountType: null as ISelectOptions<string> | null,
    discountAmount: null as number | null
  }
};
interface AddPromoCodeProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  onClose: () => void;
  data: IAutomaticDiscountResponse[] | undefined;
  refetchData: () => void;
}

const deductionFromArray = [
  { value: "BOTH", label: "BOTH" },
  { value: "MARGIN", label: "MARGIN" },
  { value: "TRANSACTION_FEE", label: "TRANSACTION_FEE" }
];

const disCountTypeArray = [
  { value: "FLAT", label: "FLAT" },
  { value: "PERCENTAGE", label: "PERCENTAGE" }
];

const discount_type_options = formatSelectOptions<string>({
  data: disCountTypeArray,
  valueKey: "value",
  labelKey: "label"
});

const deduction_from_options = formatSelectOptions<string>({
  data: deductionFromArray,
  valueKey: "value",
  labelKey: "label"
});
const AddAutomaticDiscount = ({
  onClose,
  editId,
  data: editData,
  setEditId
}: AddPromoCodeProps) => {
  const selectedAutomaticDiscount = useMemo(
    () =>
      editData?.find(automaticDiscount => {
        return automaticDiscount.id === editId;
      }),
    [editData, editId]
  );

  const { data: countryData } = useGetCountryList();

  const countryOptions = formatSelectOptions({
    data: countryData?.data?.data,

    valueKey: "id",
    labelKey: "name"
  });
  const { data: payoutMethodData } = useGetAllPayoutMethod();

  const {
    mutateAsync: useMutateAddAutomaticDiscount,
    isLoading: isAddLoading
  } = useAddAutomaticDiscount();

  const {
    mutateAsync: useMutateUpdateAutomaticDiscount,
    isLoading: isUpdateLoading
  } = useUpdateAutomaticDiscount();

  const promocodeSchema = yup.object().shape({
    discountName: yup.string().required("Please enter promo code name"),

    firstNTransactionPerCustomer: yup.object().shape({
      noOfTransactions: yup
        .number()
        .typeError("Please enter number of transactions")
        .min(1, "Number of transactions cannot be less than 1")
        .required("Please enter number of transactions"),
      capAmount: yup
        .number()
        .typeError("Please enter cap amount")
        .min(0.1, "Cap Amount cannot be less than 0.1")
        .required("Please enter cap amount"),
      deductionFrom: yup.mixed().required("Select Deduction From").nullable(),
      discountType: yup.mixed().required("Select Discount Type").nullable(),
      discountAmount: yup
        .number()
        .typeError("Please enter discount amount")
        .min(0.1, "Discount Amount cannot be less than 0.1")
        .required("Please enter discount amount")
    }),
    payoutMethodIds: yup
      .array()
      .min(1, "Select at least one Payment Method")
      .required("Select at least one Payment Method")
      .of(yup.object())
      .nullable(),
    countryMasterId: yup.object().required("Select a Country").nullable(),
    description: yup.string().required("Please enter discount description")
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(promocodeSchema)
  });
  const payout_method_options = formatSelectOptions<number>({
    data: payoutMethodData,
    valueKey: "id",
    labelKey: "name"
  });

  useEffect(() => {
    if (editId) {
      reset({
        discountName: selectedAutomaticDiscount?.discountName,
        description: selectedAutomaticDiscount?.description,
        countryMasterId: {
          value: selectedAutomaticDiscount?.country?.id,
          label: selectedAutomaticDiscount?.country?.name
        },

        payoutMethodIds: selectedAutomaticDiscount?.payoutMethods.map(
          (payoutMethod: any) => {
            return {
              value: payoutMethod.id,
              label: payoutMethod.name
            };
          }
        ),
        firstNTransactionPerCustomer: {
          noOfTransactions:
            selectedAutomaticDiscount?.firstNTransactionPerCustomer
              ?.noOfTransactions,
          capAmount:
            selectedAutomaticDiscount?.firstNTransactionPerCustomer
              ?.capAmount ?? null,
          deductionFrom: {
            value:
              selectedAutomaticDiscount?.firstNTransactionPerCustomer
                ?.deductionFrom,
            label:
              selectedAutomaticDiscount?.firstNTransactionPerCustomer
                ?.deductionFrom
          },
          discountType: {
            value:
              selectedAutomaticDiscount?.firstNTransactionPerCustomer
                ?.discountType,
            label:
              selectedAutomaticDiscount?.firstNTransactionPerCustomer
                ?.discountType
          },
          discountAmount:
            selectedAutomaticDiscount?.firstNTransactionPerCustomer
              ?.discountAmount
        }
      });
    }
  }, [editData, editId]);

  const onAddAutomaticDiscount = async (data: typeof defaultValues) => {
    const preparedData = {
      ...data,
      countryMasterId: data.countryMasterId?.value,
      payoutMethodIds: data.payoutMethodIds?.map(
        (payoutMethod: ISelectOptions<number>) => {
          return payoutMethod.value;
        }
      ),
      firstNTransactionPerCustomer: {
        ...data.firstNTransactionPerCustomer,
        deductionFrom: data?.firstNTransactionPerCustomer?.deductionFrom?.value,
        discountType: data?.firstNTransactionPerCustomer?.discountType?.value
      }
    };
    if (editId) {
      await useMutateUpdateAutomaticDiscount({
        id: editId,
        data: preparedData
      });
    } else {
      await useMutateAddAutomaticDiscount(preparedData);
    }
    handleCloseModal();
  };
  const handleCloseModal = () => {
    setEditId(null);
    reset(defaultValues);
    onClose();
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <Card padding={"24px"}>
        <form onSubmit={handleSubmit(onAddAutomaticDiscount)}>
          <Box display="flex" gap={"20px"} flexDir={"column"}>
            <Heading fontSize={"17px"} fontWeight={700} color={"#2D3748"}>
              Discount Details
            </Heading>
            <SimpleGrid columns={3} columnGap={"20px"}>
              <GridItem colSpan={1}>
                <TextInput
                  type="text"
                  control={control}
                  name="discountName"
                  label="Enter Discount Name"
                  required
                />
              </GridItem>
              <GridItem colSpan={1}>
                <Select
                  placeholder="-Select Country-"
                  control={control}
                  name="countryMasterId"
                  required
                  options={countryOptions ?? []}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <Select
                  control={control}
                  placeholder="-Select Payout Method-"
                  name="payoutMethodIds"
                  required
                  options={payout_method_options ?? []}
                  isMulti
                />
              </GridItem>
            </SimpleGrid>
            <SimpleGrid columns={3} columnGap={"8px"} spacing={"8px"}>
              <GridItem colSpan={1}>
                <TextInput
                  type="number"
                  control={control}
                  name="firstNTransactionPerCustomer.noOfTransactions"
                  label="Number Of Transactions"
                  required
                />
              </GridItem>
              <GridItem colSpan={1}>
                <TextInput
                  type="number"
                  control={control}
                  name="firstNTransactionPerCustomer.capAmount"
                  label="Enter Cap Amount"
                  required
                />
              </GridItem>
              <GridItem colSpan={1}>
                <Select
                  placeholder="-Deduction From-"
                  control={control}
                  name="firstNTransactionPerCustomer.deductionFrom"
                  options={deduction_from_options ?? []}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <Select
                  control={control}
                  placeholder="-Discount Type-"
                  name="firstNTransactionPerCustomer.discountType"
                  options={discount_type_options ?? []}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <TextInput
                  type="number"
                  control={control}
                  name="firstNTransactionPerCustomer.discountAmount"
                  label="Enter Discount Amount"
                  required
                />
              </GridItem>
            </SimpleGrid>
            <HStack>
              <Editor control={control} name="description" />
            </HStack>
          </Box>
          <HStack mt={8} justifyContent={"flex-end"}>
            <Button
              padding={"16px 32px"}
              fontWeight={600}
              color={"#E53E3E"}
              _hover={{ bg: "#FFF5F5" }}
              bg={"#FFF5F5"}
              _active={{ bg: "#FFF5F5" }}
              fontSize={"17px"}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              isLoading={isUpdateLoading || isAddLoading}
              padding={"10px 40px"}
              fontWeight={700}
              type="submit"
            >
              Save
            </Button>
          </HStack>
        </form>
      </Card>
    </Flex>
  );
};

export default AddAutomaticDiscount;
