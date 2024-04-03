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
import BreadCrumb from "@neo/components/BreadCrumb";
import Editor from "@neo/components/Editor";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
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
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import ADTabbedPanel from "./ADTabbedPanel";

const defaultValues = {
  discountName: "",
  description: "",
  // discountCode: "",
  countryMasterId: null as ISelectOptions<number> | null,
  payoutMethodIds: null as ISelectOptions<number>[] | null,
  firstNTransactionPerCustomer: {
    noOfTransactions: null as number | null,
    capAmount: null as number | null,
    deductionFrom: null as ISelectOptions<string> | null,
    discountType: null as ISelectOptions<string> | null,
    discountAmount: null as number | null
  },
  firstNTransaction: {
    noOfTransactions: null as number | null,
    capAmount: null as number | null,
    deductionFrom: null as ISelectOptions<string> | null,
    validFrom: null as string | null,
    validTill: null as string | null,
    discountType: null as ISelectOptions<string> | null,
    discountAmount: null as number | null
  }

  // deductionFrom: null as ISelectOptions<string> | null,
};
interface AddPromoCodeProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  onClose: () => void;
  data: IAutomaticDiscountResponse[] | undefined;
  refetchData: () => void;
}

const AddAutomaticDiscount = ({
  onClose,
  editId,
  data: editData,
  setEditId
  // refetchData
}: AddPromoCodeProps) => {
  const selectedAutomaticDiscount = useMemo(
    () =>
      editData?.find(automaticDiscount => {
        return automaticDiscount.id === editId;
      }),
    [editData, editId]
  );

  console.log(editData);
  const { data: countryData } = useGetCountryList();

  const countryOptions = formatSelectOptions({
    data: countryData,
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
    // discountCode: yup.string().required("Please enter promo code code"),

    firstNTransactionPerCustomer: yup.object().shape({
      noOfTransactions: yup
        .number()
        .typeError("Please enter number of transactions")
        .min(1, "Number of transactions cannot be less than 1")
        .required("Please enter number of transactions"),
      capAmount: yup
        .number()
        .typeError("Please enter cap amount")
        .min(1, "Cap Amount cannot be less than 1")
        .required("Please enter cap amount"),
      deductionFrom: yup.mixed().required("Select Deduction From").nullable(),
      discountType: yup.mixed().required("Select Discount Type").nullable(),
      discountAmount: yup
        .number()
        .typeError("Please enter discount amount")
        .min(1, "Discount Amount cannot be less than 1")
        .required("Please enter discount amount")
    }),
    firstNTransaction: yup.object().shape({
      noOfTransactions: yup
        .number()
        .typeError("Please enter number of transactions")
        .min(1, "Number of transactions cannot be less than 1")
        .required("Please enter number of transactions"),
      capAmount: yup
        .number()
        .typeError("Please enter cap amount")
        .min(1, "Cap Amount cannot be less than 1")
        .required("Please enter cap amount"),
      deductionFrom: yup.mixed().required("Select Deduction From").nullable(),
      discountType: yup.mixed().required("Select Discount Type").nullable(),
      discountAmount: yup
        .number()
        .typeError("Please enter discount amount")
        .min(1, "Discount Amount cannot be less than 1")
        .required("Please enter discount amount"),
      validFrom: yup
        .date()
        .typeError("Please enter  from date")
        .min(new Date(), "Please choose future date")
        .required("Please enter  from date"),
      validTill: yup
        .date()
        .typeError("Please enter  from date")
        .min(new Date(), "Please choose future date")
        .required("Please enter  from date")
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

  const { pathname } = useLocation();

  const activePath = breadcrumbTitle(pathname);

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
        },
        firstNTransaction: {
          noOfTransactions:
            selectedAutomaticDiscount?.firstNTransaction?.noOfTransactions,
          capAmount: selectedAutomaticDiscount?.firstNTransaction?.capAmount,
          deductionFrom: {
            value: selectedAutomaticDiscount?.firstNTransaction?.deductionFrom,
            label: selectedAutomaticDiscount?.firstNTransaction?.deductionFrom
          },
          discountType: {
            value: selectedAutomaticDiscount?.firstNTransaction?.discountType,
            label: selectedAutomaticDiscount?.firstNTransaction?.discountType
          },
          discountAmount:
            selectedAutomaticDiscount?.firstNTransaction?.discountAmount,
          validFrom: selectedAutomaticDiscount?.firstNTransaction?.validFrom,
          validTill: selectedAutomaticDiscount?.firstNTransaction?.validTill
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
      },
      firstNTransaction: {
        ...data.firstNTransaction,
        noOfTransactions: data?.firstNTransaction?.noOfTransactions ?? null,
        deductionFrom: data?.firstNTransaction?.deductionFrom?.value,
        discountType: data?.firstNTransaction?.discountType?.value
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
      <BreadCrumb currentPage="Automatic Discount Setup" options={activePath} />
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
            <HStack>
              <Editor control={control} name="description" />
            </HStack>
            <HStack
              alignItems={"flex-start"}
              flexDirection={"column"}
              width={"100%"}
            >
              <Heading fontSize={"17px"} fontWeight={700} color={"#2D3748"}>
                Allow automatic discount on
              </Heading>
            </HStack>
            <ADTabbedPanel control={control} />
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
