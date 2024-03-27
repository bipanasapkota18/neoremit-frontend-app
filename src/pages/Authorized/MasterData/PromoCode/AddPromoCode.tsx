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
import BreadCrumb from "@neo/components/BreadCrumb";
import Editor from "@neo/components/Editor";
import CustomRadioGroup from "@neo/components/Form/Radio/RadioGroup";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import { useGetCountryList } from "@neo/services/MasterData/service-country";
import { useGetAllPayoutMethod } from "@neo/services/MasterData/service-payout-method";
import { PromoCodeList } from "@neo/services/MasterData/service-promo-code";
import { colorScheme } from "@neo/theme/colorScheme";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const defaultValues = {
  name: "",
  description: "",
  code: "",
  deductionFrom: null as ISelectOptions<string> | null,
  doesExpire: "Yes",
  hasUsageLimit: "Yes",
  countryIds: null as ISelectOptions<number> | null,
  payoutMethodIds: null as ISelectOptions<number>[] | null,
  marginDiscountType: null as ISelectOptions<string> | null,
  transactionFeeDiscountType: null as ISelectOptions<string> | null,
  usageLimit: null as number | null,
  marginDiscountValue: null as number | null,
  transactionFeeDiscountValue: null as number | null,
  capAmount: null as number | null,
  validFrom: "",
  validTo: ""
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
  setEditId
  // refetchData
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

  // const { mutateAsync: useMutateAddPromoCode, isLoading: isAddLoading } =
  //   useAddPromoCode();

  // const { mutateAsync: useMutateUpdatePromoCode, isLoading: isUpdateLoading } =
  //   useUpdatePromoCode();

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: defaultValues
    // resolver: yupResolver(promocodeSchema)
  });

  const disCountTypeArray = [
    { value: "FLAT", label: "Flat" },
    { value: "PERCENTAGE", label: "Percentage" }
  ];

  const deductionFromArray = [
    { value: "BOTH", label: "Both" },
    { value: "MARGIN", label: "Margin" },
    { value: "TRANSACTION FEE", label: "Transaction Fee" }
  ];
  const country_options = formatSelectOptions({
    data: countryData,
    valueKey: "id",
    labelKey: "name"
  });

  const payout_method_options = formatSelectOptions({
    data: payoutMethodData,
    valueKey: "id",
    labelKey: "name"
  });

  const discount_type_options = formatSelectOptions({
    data: disCountTypeArray,
    valueKey: "value",
    labelKey: "label"
  });

  const deduction_from_options = formatSelectOptions({
    data: deductionFromArray,
    valueKey: "value",
    labelKey: "label"
  });

  const { pathname } = useLocation();

  const activePath = breadcrumbTitle(pathname);

  useEffect(() => {
    if (editId) {
      reset({
        name: selectedPromoCode?.name,
        code: selectedPromoCode?.code,
        description: selectedPromoCode?.description
      });
    }
  }, [editData, editId]);

  const onAddPromoCode = async (data: typeof defaultValues) => {
    console.log(data);
    // const preparedData = {
    //   ...data,
    //   countryIds: data?.countryIds?.value,
    //   payoutMethodIds:
    //     data?.payoutMethodIds?.map((item: any) => item.value) ?? null,
    //   deductionFrom: data?.deductionFrom?.value ?? null,
    //   marginDiscountType: data?.marginDiscountType?.value ?? null,
    //   transactionFeeDiscountType:
    //     data?.transactionFeeDiscountType?.value ?? null,
    //   marginDiscountValue: Number(data?.marginDiscountValue),
    //   transactionFeeDiscountValue: Number(data?.transactionFeeDiscountValue),
    //   usageLimit: Number(data?.usageLimit),
    //   capAmount: Number(data?.capAmount),
    //   doesExpire: data?.doesExpire === "Yes" ? true : false,
    //   hasUsageLimit: data?.hasUsageLimit === "Yes" ? true : false,
    //   validFrom: data?.validFrom ?? "",
    //   validTo: data?.validTo ?? ""
    // };
    // if (editId) {
    //   await useMutateUpdatePromoCode({
    //     id: editId,
    //     data: preparedData
    //   });
    // } else {
    //   await useMutateAddPromoCode(preparedData);
    // }
  };

  const handleCloseModal = () => {
    setEditId(null);
    reset(defaultValues);
    onClose();
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Promo Code Setup" options={activePath} />
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
                  isRequired
                />
              </GridItem>
              <GridItem colSpan={1}>
                <TextInput
                  type="text"
                  control={control}
                  name="name"
                  label="Enter Promo Name"
                  isRequired
                />
              </GridItem>
              <GridItem colSpan={1}>
                <TextInput
                  type="date"
                  control={control}
                  name="validFrom"
                  label="Valid From"
                  isRequired
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
                    isRequired
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
                    type="text"
                    control={control}
                    name="usageLimit"
                    label="Usage Limit"
                    isRequired
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
                  // label="Deduction From"
                  options={country_options ?? []}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <TextInput
                  type="text"
                  control={control}
                  name="capAmount"
                  label="Enter Cap Amount"
                  isRequired
                />
              </GridItem>
              <GridItem colSpan={1}>
                <Select
                  placeholder="-Deduction From-"
                  control={control}
                  name="deductionFrom"
                  // label="Deduction From"
                  options={deduction_from_options ?? []}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <Select
                  control={control}
                  placeholder="-Select Payout Method-"
                  name="payoutMethodIds"
                  // label="Deduction From"
                  options={payout_method_options ?? []}
                  isMulti
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
                        // label="Deduction From"
                        options={[
                          { value: "Margin", label: "Margin" },
                          {
                            value: "Transaction Fee",
                            label: "Transaction Fee"
                          }
                        ]}
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <TextInput
                        type="text"
                        control={control}
                        name="marginDiscountValue"
                        label="Enter Discount Amount"
                        isRequired
                      />
                    </GridItem>
                  </SimpleGrid>
                </>
                <>
                  <Text>On the Basis of Margin</Text>
                  <SimpleGrid gap={"20px"} columns={3}>
                    <GridItem colSpan={1}>
                      <Select
                        control={control}
                        placeholder="-Discount Type-"
                        name="transactionFeeDiscountType"
                        // label="Deduction From"
                        options={[
                          { value: "Margin", label: "Margin" },
                          {
                            value: "Transaction Fee",
                            label: "Transaction Fee"
                          }
                        ]}
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <TextInput
                        type="text"
                        control={control}
                        name="transactionFeeDiscountValue"
                        label="Enter Discount Amount"
                        isRequired
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
                      // label="Deduction From"
                      options={discount_type_options ?? []}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <TextInput
                      type="text"
                      control={control}
                      name="marginDiscountValue"
                      label="Enter Discount Amount"
                      isRequired
                    />
                  </GridItem>
                </SimpleGrid>
              </>
            )}
            {watch("deductionFrom")?.value == "TRANSACTION FEE" && (
              <>
                <Text>On the Basis of Transaction Fee</Text>
                <SimpleGrid gap={"20px"} columns={3}>
                  <GridItem colSpan={1}>
                    <Select
                      control={control}
                      placeholder="-Discount Type-"
                      name="transactionFeeDiscountType"
                      // label="Deduction From"
                      options={discount_type_options ?? []}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <TextInput
                      type="text"
                      control={control}
                      name="transactionFeeDiscountValue"
                      label="Enter Discount Amount"
                      isRequired
                    />
                  </GridItem>
                </SimpleGrid>
              </>
            )}
            {/* <SimpleGrid
              gap={"20px"}
              hidden={
                watch("deductionFrom")
                  ?.map((item: any) => item.value)
                  ?.includes("Margin") &&
                watch("deductionFrom")
                  ?.map((item: any) => item.value)
                  ?.includes("Transaction Fee")
              }
              columns={3}
            >
              <GridItem colSpan={1}>
                <Select
                  control={control}
                  placeholder="-Discount Type-"
                  name="discountType"
                  // label="Deduction From"
                  options={[
                    { value: "Margin", label: "Margin" },
                    { value: "Transaction Fee", label: "Transaction Fee" }
                  ]}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <TextInput
                  type="text"
                  control={control}
                  name="discountAmount"
                  label="Enter Discount Amount"
                  isRequired
                />
              </GridItem>
            </SimpleGrid> */}

            <HStack>
              <Editor control={control} name="description" />
            </HStack>
          </Box>
          <HStack justifyContent={"flex-end"}>
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
              // isLoading={isUpdateLoading || isAddLoading}
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
