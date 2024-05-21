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
import CheckBox from "@neo/components/Form/Checkbox";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import { useGetCountryList } from "@neo/services/MasterData/service-country";
import { useGetCurrencyList } from "@neo/services/MasterData/service-currency";
import {
  IPartnerRequest,
  PartnerContactInfo,
  useAddPartner,
  useGetAllTimezones,
  useGetPartnerById,
  useUpdatePartner
} from "@neo/services/service-partner-setup";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const defaultValues = {
  partnerType: null as ISelectOptions<string> | null,
  countryHeadQuarterId: null as ISelectOptions<number> | null,
  companyName: null,
  address: null,

  phoneNumber: null,
  emailAddress: null,
  timeZone: null as ISelectOptions<string> | null,
  operatingCountryIds: null as ISelectOptions<number>[] | null,
  partnerSettlementInfo: {
    fundingCurrencyId: null as ISelectOptions<number> | null,
    localCurrencyId: null as ISelectOptions<number> | null,
    transactionLimit: null,
    acceptPinNo: false
  },
  partnerContactInfo: null as PartnerContactInfo[] | null
};
interface AddPartnerProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  onClose: () => void;
}

const AddPartner = ({ onClose, editId, setEditId }: AddPartnerProps) => {
  const { data: currencyData } = useGetCurrencyList();
  const { data: timeZones } = useGetAllTimezones();

  const timeZoneArray = timeZones?.map((str: string) => ({
    value: str
  }));

  const timezone_options = formatSelectOptions<number>({
    data: timeZoneArray,
    valueKey: "value",
    labelKey: "value"
  });

  const currency_options = formatSelectOptions<number>({
    data: currencyData,
    valueKey: "id",
    labelKey: "name"
  });

  const { data: selectedPartner } = useGetPartnerById(editId);

  const { data: countryData } = useGetCountryList();

  const { mutateAsync: mutateAddPartner, isLoading: isAddLoading } =
    useAddPartner();

  const { mutateAsync: mutateUpdatePartner, isLoading: isUpdateLoading } =
    useUpdatePartner();

  const partnerSchema = yup.object().shape({
    countryHeadQuarterId: yup
      .object()
      .required("Country HQ is required")
      .nullable(),
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
      .required("Operating Country is required")
      .nullable(),
    partnerSettlementInfo: yup.object().shape({
      fundingCurrencyId: yup
        .object()
        .required("Funding Currency is required")
        .nullable(),
      localCurrencyId: yup
        .object()
        .required("Local Currency is required")
        .nullable(),
      transactionLimit: yup
        .number()
        .required("Transaction Limit is required")
        .min(1, "Transaction Limit must be greater than 0")
        .nullable(),
      acceptPinNo: yup.boolean().required("Accept Pin No is required")
    }),
    partnerContactInfo: yup.array().of(
      yup.object().shape({
        contactName: yup.string().when("$index", {
          is: 0, // Only apply validation when the index is 0 (first element)
          then: yup.string().required("Contact Name is required").nullable(),
          otherwise: yup.string().nullable() // Optional for other elements
        }),
        designation: yup.string().when("$index", {
          is: 0, // Only apply validation when the index is 0 (first element)
          then: yup.string().required("Designation is required").nullable(),
          otherwise: yup.string().nullable() // Optional for other elements
        }),
        email: yup.string().when("$index", {
          is: 0, // Only apply validation when the index is 0 (first element)
          then: yup
            .string()
            .email("Enter a valid email address")
            .required("Email Address is required")
            .nullable(),
          otherwise: yup.string().nullable() // Optional for other elements
        })
      })
    )
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(partnerSchema)
  });
  useEffect(() => {
    if (editId) {
      reset({
        companyName: selectedPartner?.companyName,
        address: selectedPartner?.address,

        phoneNumber: selectedPartner?.phoneNumber,
        emailAddress: selectedPartner?.emailAddress,
        operatingCountryIds: selectedPartner?.operatingCountries?.map(
          (country: any) => ({
            value: country.id,
            label: country.name
          })
        ),
        countryHeadQuarterId: {
          value: selectedPartner?.countryHeadQuarter.id,
          label: selectedPartner?.countryHeadQuarter.name
        },
        partnerType: {
          value: selectedPartner?.partnerType,
          label: selectedPartner?.partnerType
        },
        timeZone: {
          value: selectedPartner?.timeZone,
          label: selectedPartner?.timeZone
        },
        partnerSettlementInfo: {
          ...selectedPartner?.partnerSettlementInfo,
          fundingCurrencyId: {
            value: selectedPartner?.partnerSettlementInfo.fundingCurrency?.id,
            label: selectedPartner?.partnerSettlementInfo.fundingCurrency?.name
          },
          localCurrencyId: {
            value: selectedPartner?.partnerSettlementInfo.localCurrency?.id,
            label: selectedPartner?.partnerSettlementInfo.localCurrency?.name
          },
          transactionLimit:
            selectedPartner?.partnerSettlementInfo.transactionLimit,
          acceptPinNo: selectedPartner?.partnerSettlementInfo.acceptPinNo
        },
        partnerContactInfo: selectedPartner?.partnerContactInfo.map(
          (contact: PartnerContactInfo) => ({
            contactName: contact.contactName,
            designation: contact.designation,
            email: contact.email
          })
        )
      });
    }
  }, [selectedPartner]);

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

  const onAddPartner = async (data: typeof defaultValues) => {
    const preparedData: IPartnerRequest = {
      ...data,
      operatingCountryIds: data.operatingCountryIds?.map(
        country => country.value
      ),
      countryHeadQuarterId: data.countryHeadQuarterId?.value ?? null,
      timeZone: data.timeZone?.label,
      partnerType: data.partnerType?.value,
      partnerSettlementInfo: {
        ...data.partnerSettlementInfo,
        fundingCurrencyId: data.partnerSettlementInfo.fundingCurrencyId?.value,
        localCurrencyId: data.partnerSettlementInfo.localCurrencyId?.value
      },
      partnerContactInfo: data.partnerContactInfo
        ?.map((contact: PartnerContactInfo) => ({
          contactName: contact.contactName,
          designation: contact.designation,
          email: contact.email
        }))
        .filter(
          (contact: PartnerContactInfo) =>
            contact.contactName !== null ||
            contact.designation !== null ||
            contact.email !== null
        )
    };
    if (editId) {
      await mutateUpdatePartner({
        id: editId,
        data: preparedData
      });
    } else {
      await mutateAddPartner(preparedData);
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
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Company Name"
                name="companyName"
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Select
                control={control}
                placeholder="Country HQ"
                name="countryHeadQuarterId"
                options={country_options}
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Select
                control={control}
                placeholder="-Operating Countries-"
                name="operatingCountryIds"
                options={country_options}
                isMulti
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Address"
                name="address"
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Phone Number"
                name="phoneNumber"
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Email Address"
                name="emailAddress"
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Select
                control={control}
                placeholder="-Time Zone-"
                name="timeZone"
                options={timezone_options}
                required
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
                placeholder="-Funding Currency-"
                name="partnerSettlementInfo.fundingCurrencyId"
                options={currency_options}
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Select
                control={control}
                placeholder="-Local Currency-"
                name="partnerSettlementInfo.localCurrencyId"
                options={currency_options}
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="number"
                label="Enter Transaction Limit"
                name="partnerSettlementInfo.transactionLimit"
                required
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
                name={`partnerContactInfo[${0}].contactName`}
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Designation"
                name={`partnerContactInfo[${0}].designation`}
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Email Address"
                name={`partnerContactInfo[${0}].email`}
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Contact Name"
                name={`partnerContactInfo[${1}].contactName`}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Designation"
                name={`partnerContactInfo[${1}].designation`}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                control={control}
                type="text"
                label="Enter Email Address"
                name={`partnerContactInfo[${1}].email`}
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
            <Button
              padding={"10px 40px"}
              isLoading={isAddLoading || isUpdateLoading}
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

export default AddPartner;
