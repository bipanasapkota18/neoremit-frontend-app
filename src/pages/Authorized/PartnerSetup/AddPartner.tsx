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
import CheckBox from "@neo/components/Form/Checkbox";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import { useGetCountryList } from "@neo/services/MasterData/service-country";
import { PromoCodeList } from "@neo/services/MasterData/service-promo-code";
import { useAddPartner } from "@neo/services/service-partner-setup";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import * as yup from "yup";

const defaultValues = {
  partnerType: null as ISelectOptions<string> | null,
  companyName: null,
  address: null,
  phoneNumber: null,
  emailAddress: null,
  timeZone: null as ISelectOptions<string> | null,
  operatingCountryIds: null as ISelectOptions<number>[] | null,
  partnerSettlementInfo: {
    partnerType: null as ISelectOptions<string> | null,
    companyName: null,
    operatingCountryIds: null as ISelectOptions<number>[] | null,
    acceptPinNo: false
  },
  partnerContactInfo: {
    contactName: null,
    designation: null,
    email: null
  }
};
interface AddPartnerProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  onClose: () => void;
  data: PromoCodeList[] | undefined;
}

const AddPartner = ({
  onClose,
  editId,
  // data: editData,
  setEditId
}: AddPartnerProps) => {
  // const selectedPromoCode = useMemo(
  //   () =>
  //     editData?.find(promoCode => {
  //       return promoCode.id === editId;
  //     }),
  //   [editData, editId]
  // );

  const { data: countryData } = useGetCountryList();

  const { mutateAsync: mutateAddPartner } = useAddPartner();

  // const { mutateAsync: useMutateUpdatePromoCode, isLoading: isUpdateLoading } =
  //   useUpdatePromoCode();

  const partnerSchema = yup.object().shape({
    partnerName: yup.string().required("Partner Name is required"),
    partnerType: yup.object().required("Partner Type is required").nullable(),
    companyName: yup.string().required("Company Name is required").nullable(),
    address: yup.string().required("Address is required").nullable(),
    phoneNumber: yup.string().required("Phone Number is required").nullable(),
    emailAddress: yup
      .string()
      .email("Enter a valid email address")
      .required("Email Address is required")
      .nullable(),
    timeZone: yup.object().required("Time Zone is required").nullable(),
    operatingCountryIds: yup
      .array()
      .min(1, "Enter at least one country")
      .required("Operating Country is required"),
    partnerSettlementInfo: yup.object().shape({
      partnerType: yup.object().required("Partner Type is required").nullable(),
      companyName: yup.string().required("Company Name is required").nullable(),
      operatingCountryIds: yup
        .array()
        .required("Operating Country is required")
        .min(1, "Enter at least one country")
        .nullable(),
      acceptPinNo: yup.boolean().required("Accept Pin No is required")
    }),
    partnerContactInfo: yup.object().shape({
      contactName: yup.string().required("Contact Name is required").nullable(),
      designation: yup.string().required("Designation is required").nullable(),
      email: yup
        .string()
        .email("Enter a valid email address")
        .required("Email Address is required")
        .nullable()
    })
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(partnerSchema)
  });

  const deductionFromArray = [
    { value: "SENDER", label: "Sender" },
    { value: "RECEIVER", label: "Receiver" },
    { value: "AGGREGATOR", label: "Aggregator" },
    { value: "WHITE_LABELED_PARTNER", label: "White Labeled Partner" }
  ];
  const country_options = formatSelectOptions<number>({
    data: countryData?.data?.data,
    valueKey: "id",
    labelKey: "name"
  });

  const partner_type_options = formatSelectOptions<string>({
    data: deductionFromArray,
    valueKey: "value",
    labelKey: "label"
  });

  const { pathname } = useLocation();

  const activePath = breadcrumbTitle(pathname);

  // useEffect(() => {
  //   if (editId) {
  //     reset({
  //       name: selectedPromoCode?.name,
  //       code: selectedPromoCode?.code,
  //       validFrom: moment(selectedPromoCode?.validFrom).format("YYYY-MM-DD"),
  //       validTo: moment(selectedPromoCode?.validTo).format("YYYY-MM-DD"),
  //       doesExpire: selectedPromoCode?.doesExpire ? "Yes" : "No",
  //       hasUsageLimit: selectedPromoCode?.hasUsageLimit ? "Yes" : "No",
  //       countryIds: selectedPromoCode?.countryList?.map(country => {
  //         return { label: country.name, value: country.id };
  //       }),
  //       payoutMethodIds: selectedPromoCode?.payoutMethodList?.map(payout => {
  //         return { label: payout.name, value: payout.id };
  //       }),
  //       usageLimit: selectedPromoCode?.usageLimit,
  //       capAmount: selectedPromoCode?.capAmount,
  //       deductionFrom: {
  //         label: selectedPromoCode?.deductionFrom,
  //         value: selectedPromoCode?.deductionFrom
  //       },
  //       marginDiscountType: {
  //         label: selectedPromoCode?.marginDiscountType,
  //         value: selectedPromoCode?.marginDiscountType
  //       },
  //       marginDiscountValue: selectedPromoCode?.marginDiscountValue,
  //       transactionFeeDiscountType: {
  //         label: selectedPromoCode?.transactionFeeDiscountType,
  //         value: selectedPromoCode?.transactionFeeDiscountType
  //       },
  //       transactionFeeDiscountValue:
  //         selectedPromoCode?.transactionFeeDiscountValue,

  //       description: selectedPromoCode?.description
  //     });
  //   }
  // }, [editData, editId]);

  const onAddPartner = async (data: typeof defaultValues) => {
    const preparedData = {
      ...data,
      operatingCountryIds: data.operatingCountryIds?.map(
        country => country.value
      ),
      timeZone: data.timeZone?.label,
      partnerType: data.partnerType?.value,
      partnerSettlementInfo: {
        ...data.partnerSettlementInfo,
        partnerType: data.partnerSettlementInfo.partnerType?.value,
        operatingCountryIds:
          data.partnerSettlementInfo.operatingCountryIds?.map(
            country => country.value
          )
      }
    };
    // console.log(preparedData);
    await mutateAddPartner(preparedData);
  };

  const handleCloseModal = () => {
    setEditId(null);
    reset(defaultValues);
    onClose();
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb
        currentPage={editId ? "Edit Partner" : "Add Partner"}
        options={activePath}
      />
      <Card gap={"24px"} padding={"24px"}>
        <Box display={"flex"} gap={"20px"} flexDir={"column"}>
          <Heading fontWeight={700} fontSize={"17px"}>
            Partner Information
          </Heading>
          <SimpleGrid columns={3} gap={6}>
            <GridItem colSpan={1}>
              <Select
                control={control}
                placeholder="-Select Partner Type-"
                name="partnerType"
                options={partner_type_options}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Company Name"
                name="companyName"
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Select
                control={control}
                placeholder="-Operating Countries-"
                name="operatingCountryIds"
                options={country_options}
                isMulti
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Address"
                name="address"
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Phone Number"
                name="phoneNumber"
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Email Address"
                name="emailAddress"
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Select
                control={control}
                placeholder="-Time Zone-"
                name="timeZone"
                options={country_options}
              />
            </GridItem>
          </SimpleGrid>
        </Box>
        <Box display={"flex"} gap={"20px"} flexDir={"column"}>
          <Heading fontWeight={700} fontSize={"17px"}>
            Settlement Information
          </Heading>
          <SimpleGrid columns={3} gap={6}>
            <GridItem colSpan={1}>
              <Select
                control={control}
                placeholder="-Select Partner Type-"
                name="partnerSettlementInfo.partnerType"
                options={partner_type_options}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Company Name"
                name="partnerSettlementInfo.companyName"
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Select
                control={control}
                placeholder="-Operating Countries-"
                name="partnerSettlementInfo.operatingCountryIds"
                options={country_options}
                isMulti
              />
            </GridItem>
            <GridItem colSpan={1}>
              <CheckBox
                control={control}
                name="partnerSettlementInfo.acceptPinNo"
                label="Accept Pin No ?"
              />
            </GridItem>
          </SimpleGrid>
        </Box>
        <Box display={"flex"} gap={"20px"} flexDir={"column"}>
          <Heading fontWeight={700} fontSize={"17px"}>
            Partner Contact Person
          </Heading>
          <SimpleGrid columns={3} gap={6}>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Contact Name"
                name="partnerContactInfo.contactName"
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Designation"
                name="partnerContactInfo.designation"
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Email Address"
                name="partnerContactInfo.email"
              />
            </GridItem>
          </SimpleGrid>
        </Box>
        <form onSubmit={handleSubmit(onAddPartner)}>
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
            <Button padding={"10px 40px"} fontWeight={700} type="submit">
              Save
            </Button>
          </HStack>
        </form>
      </Card>
    </Flex>
  );
};

export default AddPartner;
