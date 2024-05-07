import {
  Box,
  Button,
  Card,
  Flex,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Editor from "@neo/components/Editor";
import CustomRadioGroup from "@neo/components/Form/Radio/RadioGroup";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import { useGetCountryList } from "@neo/services/MasterData/service-country";
import { useGetAllPayoutMethod } from "@neo/services/MasterData/service-payout-method";
import {
  PromoCodeList,
  useAddPromoCode,
  useUpdatePromoCode
} from "@neo/services/MasterData/service-promo-code";
import { colorScheme } from "@neo/theme/colorScheme";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const defaultValues = {
  name: "",
  description: "",
  code: "",
  deductionFrom: null as ISelectOptions<string> | null,
  doesExpire: "Yes",
  hasUsageLimit: "Yes",
  countryIds: null as ISelectOptions<number>[] | null,
  payoutMethodIds: null as ISelectOptions<number>[] | null,
  marginDiscountType: null as ISelectOptions<string> | null,
  transactionFeeDiscountType: null as ISelectOptions<string> | null,
  usageLimit: null as number | null,
  marginDiscountValue: null as number | null,
  transactionFeeDiscountValue: null as number | null,
  capAmount: null as number | null,
  validFrom: null as string | null,
  validTo: null as string | null
};
interface AddPromoCodeProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  onClose: () => void;
  data: PromoCodeList[] | undefined;
  refetchData: () => void;
}
const radioOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" }
];
const AddPromoCode = ({
  onClose,
  editId,
  data: editData,
  setEditId,
  refetchData
}: AddPromoCodeProps) => {
  const selectedPromoCode = useMemo(
    () =>
      editData?.find(promoCode => {
        return promoCode.id === editId;
      }),
    [editData, editId]
  );

  const { data: countryData } = useGetCountryList();

  const { data: payoutMethodData } = useGetAllPayoutMethod();

  const { mutateAsync: useMutateAddPromoCode, isLoading: isAddLoading } =
    useAddPromoCode();

  const { mutateAsync: useMutateUpdatePromoCode, isLoading: isUpdateLoading } =
    useUpdatePromoCode();

  const promocodeSchema = yup.object().shape({
    name: yup.string().required("Please enter promo code name"),
    code: yup.string().required("Please enter promo code code"),
    validFrom: editId
      ? yup
          .date()
          .typeError("Please enter  from date")
          .required("Please enter  from date")
      : yup
          .date()
          .nullable()
          .required("Valid From Date is required")
          .test(
            "future-date",
            "Valid From date must be today or in the future",
            function (value) {
              if (!value) return false; // handle null or undefined case

              // Create today's date without the time component
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero

              // Create the input date without the time component
              const inputValue = new Date(value);
              inputValue.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero

              // Check if the input date is today or in the future
              return inputValue >= today;
            }
          ),
    doesExpire: yup.string(),
    validTo: yup
      .date()
      .typeError("Please enter to date")
      .when("doesExpire", {
        is: (value: string) => value === "Yes",
        then: yup
          .date()
          .typeError("Enter expiry date")
          .when("startDate", (validFrom, promocodeSchema) => {
            if (validFrom) {
              const dayAfter = new Date(validFrom.getTime() + 86400000);

              return promocodeSchema.min(
                dayAfter,
                "Expiry date has to be after start date"
              );
            }

            return promocodeSchema;
          })
      })
      .nullable(),
    hasUsageLimit: yup.string(),
    usageLimit: yup
      .number()
      .when("hasUsageLimit", {
        is: (value: string) => value === "Yes",
        then: yup
          .number()
          .typeError("Please enter usage limit")
          .min(1, "Usage Limit should not be less than 1")
          .required("Please enter usage limit")
      })
      .nullable(),
    capAmount: yup
      .number()
      .typeError("Please enter cap amount")
      .min(1, "Cap Amount cannot be less than 1")
      .required("Please enter cap amount"),
    deductionFrom: yup.mixed().required("Select Deduction From").nullable(),
    payoutMethodIds: yup
      .array()
      .min(1, "Select at least one Payment Method")
      .required("Select at least one Payment Method")
      .of(yup.object())
      .nullable(),
    countryIds: yup
      .array()
      .min(1, "Select at least one Country")
      .required("Select at least one Country")
      .of(yup.object())
      .nullable(),
    marginDiscountType: yup.mixed().when("deductionFrom", {
      is: (value: string) => value === "MARGIN" || value === "BOTH",
      then: yup.mixed().required("Select Margin Discount Type").nullable()
    }),
    marginDiscountValue: yup
      .number()
      .when("deductionFrom", {
        is: (value: string) => value === "MARGIN" || value === "BOTH",
        then: yup.string().required("Enter Margin Discount Value")
      })
      .nullable(),
    transactionFeeDiscountType: yup.mixed().when("deductionFrom", {
      is: (value: string) => value === "TRANSACTION_FEE" || value === "BOTH",
      then: yup.mixed().required("Select Margin Discount Type").nullable()
    }),
    transactionFeeDiscountValue: yup
      .number()
      .when("deductionFrom", {
        is: (value: string) => value === "TRANSACTION_FEE" || value === "BOTH",
        then: yup.string().required("Enter Margin Discount Value")
      })
      .nullable(),
    description: yup.string()
  });

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(promocodeSchema)
  });

  const disCountTypeArray = [
    { value: "FLAT", label: "FLAT" },
    { value: "PERCENTAGE", label: "PERCENTAGE" }
  ];
  const deductionFromArray = [
    { value: "BOTH", label: "BOTH" },
    { value: "MARGIN", label: "MARGIN" },
    { value: "TRANSACTION_FEE", label: "TRANSACTION_FEE" }
  ];
  const country_options = formatSelectOptions<number>({
    data: countryData?.data?.data,
    valueKey: "id",
    labelKey: "name"
  });

  const payout_method_options = formatSelectOptions<number>({
    data: payoutMethodData,
    valueKey: "id",
    labelKey: "name"
  });

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

  useEffect(() => {
    if (editId) {
      reset({
        name: selectedPromoCode?.name,
        code: selectedPromoCode?.code,
        validFrom: moment(selectedPromoCode?.validFrom).format("YYYY-MM-DD"),
        validTo: moment(selectedPromoCode?.validTo).format("YYYY-MM-DD"),
        doesExpire: selectedPromoCode?.doesExpire ? "Yes" : "No",
        hasUsageLimit: selectedPromoCode?.hasUsageLimit ? "Yes" : "No",
        countryIds: selectedPromoCode?.countryList?.map(country => {
          return { label: country.name, value: country.id };
        }),
        payoutMethodIds: selectedPromoCode?.payoutMethodList?.map(payout => {
          return { label: payout.name, value: payout.id };
        }),
        usageLimit: selectedPromoCode?.usageLimit,
        capAmount: selectedPromoCode?.capAmount,
        deductionFrom: {
          label: selectedPromoCode?.deductionFrom,
          value: selectedPromoCode?.deductionFrom
        },
        marginDiscountType: {
          label: selectedPromoCode?.marginDiscountType,
          value: selectedPromoCode?.marginDiscountType
        },
        marginDiscountValue: selectedPromoCode?.marginDiscountValue,
        transactionFeeDiscountType: {
          label: selectedPromoCode?.transactionFeeDiscountType,
          value: selectedPromoCode?.transactionFeeDiscountType
        },
        transactionFeeDiscountValue:
          selectedPromoCode?.transactionFeeDiscountValue,

        description: selectedPromoCode?.description
      });
    }
  }, [editData, editId]);

  const onAddPromoCode = async (data: typeof defaultValues) => {
    const preparedData = {
      ...data,
      countryIds: data?.countryIds?.map((item: any) => item.value) ?? null,
      payoutMethodIds:
        data?.payoutMethodIds?.map((item: any) => item.value) ?? null,
      deductionFrom: data?.deductionFrom?.value ?? "",
      marginDiscountType:
        watch("deductionFrom")?.value == "MARGIN" ||
        watch("deductionFrom")?.value == "BOTH"
          ? data?.marginDiscountType?.value
          : null,
      marginDiscountValue:
        watch("deductionFrom")?.value == "MARGIN" ||
        watch("deductionFrom")?.value == "BOTH"
          ? data?.marginDiscountValue
          : null,
      transactionFeeDiscountType:
        watch("deductionFrom")?.value == "TRANSACTION_FEE" ||
        watch("deductionFrom")?.value == "BOTH"
          ? data?.transactionFeeDiscountType?.value
          : null,
      transactionFeeDiscountValue:
        watch("deductionFrom")?.value == "TRANSACTION_FEE" ||
        watch("deductionFrom")?.value == "BOTH"
          ? data?.transactionFeeDiscountValue
          : null,
      usageLimit: data?.usageLimit ?? null,
      capAmount: data?.capAmount,
      doesExpire: data?.doesExpire === "Yes" ? true : false,
      hasUsageLimit: data?.hasUsageLimit === "Yes" ? true : false,
      validFrom: data?.validFrom,
      validTo: data?.validTo ?? null
    };
    if (editId) {
      await useMutateUpdatePromoCode({
        id: editId,
        data: preparedData
      });
    } else {
      await useMutateAddPromoCode(preparedData);
    }
    refetchData();
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
        <form onSubmit={handleSubmit(onAddPromoCode)}>
          <Box display="flex" gap={"20px"} flexDir={"column"}>
            <Heading fontSize={"17px"} fontWeight={700} color={"#2D3748"}>
              Promo Code Details
            </Heading>
            <SimpleGrid columns={3} columnGap={"20px"}>
              <GridItem colSpan={1}>
                <TextInput
                  type="text"
                  control={control}
                  name="code"
                  label="Enter Promo Code"
                  required
                />
              </GridItem>
              <GridItem colSpan={1}>
                <TextInput
                  type="text"
                  control={control}
                  name="name"
                  label="Enter Promo Name"
                  required
                />
              </GridItem>
              <GridItem colSpan={1}>
                <TextInput
                  type="date"
                  control={control}
                  name="validFrom"
                  label="Valid From"
                  required
                  max={watch("validTo") ?? new Date().getDate()}
                />
              </GridItem>
            </SimpleGrid>
            <HStack
              alignItems={"flex-start"}
              gap={"16px"}
              flexDirection={"column"}
            >
              <HStack
                flexDir={"column"}
                gap={"16px"}
                alignItems={"flex-start"}
                width={"100%"}
              >
                <HStack
                  gap={"12px"}
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                >
                  <Text
                    fontSize={"14px"}
                    fontWeight={500}
                    color={colorScheme?.primary_400}
                  >
                    Does your Promo Code Expire?
                  </Text>
                  <HStack alignItems={"flex-start"} gap={"32px"}>
                    <CustomRadioGroup
                      name="doesExpire"
                      control={control}
                      options={radioOptions}
                    />
                  </HStack>
                </HStack>
                {watch("doesExpire") === "Yes" && (
                  <TextInput
                    maxW={"32%"}
                    type="date"
                    control={control}
                    name="validTo"
                    label="Valid To"
                    required
                    min={watch("validFrom") ?? new Date().getDate()}
                  />
                )}
              </HStack>
              <HStack
                alignItems={"flex-start"}
                flexDirection={"column"}
                gap={"16px"}
                width={"100%"}
              >
                <HStack
                  gap={"12px"}
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                >
                  <Text
                    fontSize={"14px"}
                    fontWeight={500}
                    color={colorScheme?.primary_400}
                  >
                    Does your Promo Code have usage Limits?
                  </Text>
                  <HStack alignItems={"flex-start"} gap={"32px"}>
                    <CustomRadioGroup
                      name="hasUsageLimit"
                      control={control}
                      options={radioOptions}
                    />
                  </HStack>
                </HStack>

                {watch("hasUsageLimit") === "Yes" && (
                  <TextInput
                    maxW={"32%"}
                    type="number"
                    control={control}
                    name="usageLimit"
                    label="Usage Limit"
                    required
                  />
                )}
              </HStack>
            </HStack>

            <SimpleGrid columns={3} gap={"20px"}>
              <GridItem colSpan={1}>
                <Select
                  placeholder="-Select Country-"
                  control={control}
                  name="countryIds"
                  isMulti
                  options={country_options ?? []}
                  required
                />
              </GridItem>
              <GridItem colSpan={1}>
                <TextInput
                  type="number"
                  control={control}
                  name="capAmount"
                  label="Enter Cap Amount"
                  required
                />
              </GridItem>
              <GridItem colSpan={1}>
                <Select
                  placeholder="-Deduction From-"
                  control={control}
                  name="deductionFrom"
                  options={deduction_from_options ?? []}
                  required
                />
              </GridItem>
              <GridItem colSpan={1}>
                <Select
                  control={control}
                  placeholder="-Select Payout Method-"
                  name="payoutMethodIds"
                  options={payout_method_options ?? []}
                  isMulti
                  required
                />
              </GridItem>
            </SimpleGrid>

            {watch("deductionFrom")?.value == "BOTH" && (
              <Flex direction={"column"} gap={"16px"}>
                <>
                  <Text>On the Basis of Margin</Text>
                  <SimpleGrid gap={"20px"} columns={3}>
                    <GridItem colSpan={1}>
                      <Select
                        control={control}
                        placeholder="-Discount Type-"
                        name="marginDiscountType"
                        required
                        options={discount_type_options ?? []}
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <TextInput
                        type="number"
                        control={control}
                        name="marginDiscountValue"
                        label="Enter Discount Amount"
                        required
                      />
                    </GridItem>
                  </SimpleGrid>
                </>
                <>
                  <Text>On the Basis of Transaction Fee</Text>
                  <SimpleGrid gap={"20px"} columns={3}>
                    <GridItem colSpan={1}>
                      <Select
                        control={control}
                        placeholder="-Discount Type-"
                        name="transactionFeeDiscountType"
                        options={discount_type_options ?? []}
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <TextInput
                        type="number"
                        control={control}
                        name="transactionFeeDiscountValue"
                        label="Enter Discount Amount"
                        required
                      />
                    </GridItem>
                  </SimpleGrid>
                </>
              </Flex>
            )}
            {watch("deductionFrom")?.value == "MARGIN" && (
              <>
                <Text>On the Basis of Margin</Text>
                <SimpleGrid gap={"20px"} columns={3}>
                  <GridItem colSpan={1}>
                    <Select
                      control={control}
                      placeholder="-Discount Type-"
                      name="marginDiscountType"
                      options={discount_type_options ?? []}
                      required
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <TextInput
                      type="number"
                      control={control}
                      name="marginDiscountValue"
                      label="Enter Discount Amount"
                      required
                    />
                  </GridItem>
                </SimpleGrid>
              </>
            )}
            {watch("deductionFrom")?.value == "TRANSACTION_FEE" && (
              <>
                <Text>On the Basis of Transaction Fee</Text>
                <SimpleGrid gap={"20px"} columns={3}>
                  <GridItem colSpan={1}>
                    <Select
                      control={control}
                      placeholder="-Discount Type-"
                      name="transactionFeeDiscountType"
                      options={discount_type_options ?? []}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <TextInput
                      type="number"
                      control={control}
                      name="transactionFeeDiscountValue"
                      label="Enter Discount Amount"
                      required
                    />
                  </GridItem>
                </SimpleGrid>
              </>
            )}

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

export default AddPromoCode;
