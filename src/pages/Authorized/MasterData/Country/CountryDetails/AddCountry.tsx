import { InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Tooltip
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DropzoneComponentControlled } from "@neo/components/Form/DropzoneComponent";
import Select from "@neo/components/Form/SelectComponent";
import SwitchInput from "@neo/components/Form/Switch";
import TextInput from "@neo/components/Form/TextInput";
import {
  useAddCountry,
  useFetchAllCountryCode,
  useGetCountryById,
  useUpdateCountry
} from "@neo/services/MasterData/service-country";
import { useGetCurrencyList } from "@neo/services/MasterData/service-currency";
import { baseURL } from "@neo/services/service-axios";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as yup from "yup";

const defaultValues = {
  name: "",
  shortName: "",
  phoneCode: "",
  isoNumber: "",
  code: null as ISelectOptions<string> | null,
  currencyId: null as any,
  hasState: false,
  flagIcon: "",
  canReceive: false,
  canSend: false,
  isActive: true
};
export interface IStepProps {
  stepProps: {
    nextStep: () => void;
    prevStep: () => void;
  };
}

const AddCountry = ({ stepProps }: IStepProps) => {
  const { data: countryCode } = useFetchAllCountryCode();

  const countryCodeOptions = formatSelectOptions({
    data: countryCode,
    valueKey: "id",
    labelKey: "countryCode"
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const countryAdd = yup.object().shape({
    flagIcon: searchParams.get("countryId")
      ? yup.mixed()
      : yup.mixed().required("Please select flag icon"),
    name: yup.string().required("Please enter country Name"),
    code: yup.object().required("Please enter country Code").nullable(),
    isoNumber: yup.string().required("Please enter country ISONumber"),
    phoneCode: yup.string().required("Plese enter country Phone Code"),
    shortName: yup
      .string()
      .required("Please enter country Short Name")
      .test("length", "Enter a two digit short name", val => val?.length === 2),
    canReceive: yup.boolean(),
    canSend: yup.boolean(),
    isActive: yup.boolean().nullable(),
    hasState: yup.boolean(),
    currencyId: yup.mixed().required("Currency is required")
  });

  const { mutateAsync: mutateAddCountry, isLoading: isAddLoading } =
    useAddCountry();

  const { mutateAsync: mutateUpdate, isLoading: isUpdateLoading } =
    useUpdateCountry();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(countryAdd)
  });

  const { data: selectedCountry } = useGetCountryById(
    Number(searchParams.get("countryId"))
  );
  const isNewCountry = searchParams.get("isNewCountry") ?? false;

  const { data: currencyData } = useGetCurrencyList();

  const currencyOptions = formatSelectOptions({
    data: currencyData,
    valueKey: "id",
    labelKey: "name"
  });

  useEffect(() => {
    if (searchParams.get("countryId")) {
      const selectedCurrency = currencyOptions?.find(
        (currency: any) => currency.value === selectedCountry?.currency?.id
      );

      reset({
        name: selectedCountry?.name,
        shortName: selectedCountry?.shortName,
        code: {
          label: selectedCountry?.code,
          value: selectedCountry?.code
        },
        phoneCode: selectedCountry?.phoneCode,
        isoNumber: selectedCountry?.isoNumber,
        hasState: selectedCountry?.hasState,
        canReceive: selectedCountry?.canReceive,
        canSend: selectedCountry?.canSend,
        currencyId: selectedCurrency
      });
    }
  }, [selectedCountry]);

  const onAddCountrySetup = async (data: typeof defaultValues) => {
    if (searchParams.get("countryId")) {
      const updateresponse = await mutateUpdate({
        id: Number(searchParams?.get("countryId")),
        data: {
          ...data,
          code: data?.code?.label ?? null,
          flagIcon: data.flagIcon[0] ?? "",
          currencyId: data?.currencyId?.value ?? null,
          isActive: selectedCountry?.isActive ?? true
        }
      });
      if (updateresponse?.status === 200) {
        isNewCountry
          ? setSearchParams({
              countryId: updateresponse?.data?.data?.id + "",
              hasState: updateresponse?.data?.data?.hasState + "",
              isNewCountry: isNewCountry
            })
          : setSearchParams({
              countryId: updateresponse?.data?.data?.id + "",
              hasState: updateresponse?.data?.data?.hasState + ""
            });
        stepProps.nextStep();
      }
    } else {
      const createResponse = await mutateAddCountry({
        ...data,
        code: data?.code?.label ?? null,
        flagIcon: data.flagIcon[0],
        currencyId: data?.currencyId?.value ?? null
      });
      if (createResponse?.status === 200) {
        isNewCountry
          ? setSearchParams({
              countryId: createResponse?.data?.data?.id,
              hasState: createResponse?.data?.data?.hasState,
              isNewCountry: isNewCountry
            })
          : setSearchParams({
              countryId: createResponse?.data?.data?.id,
              hasState: createResponse?.data?.data?.hasState
            });
        stepProps.nextStep();
      }
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    reset(defaultValues);
  };

  return (
    <Stack
      as={"form"}
      padding={"24px"}
      gap={"24px"}
      onSubmit={handleSubmit(onAddCountrySetup)}
    >
      <SimpleGrid columns={3} gap={"24px"}>
        <GridItem colSpan={3}>
          <DropzoneComponentControlled
            name="flagIcon"
            control={control}
            options={{ maxSize: 2 }}
            imagePreview={
              searchParams.get("countryId")
                ? `${baseURL}/document-service/master/flag-icon?fileId=${selectedCountry?.flagIcon}`
                : ""
            }
          />
        </GridItem>
        <GridItem colSpan={1}>
          <TextInput
            size={"lg"}
            name="name"
            label="Enter Country Name"
            control={control}
            type="text"
            required
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Select
            required
            size={"lg"}
            name="currencyId"
            placeholder="Currency"
            control={control}
            options={currencyOptions ?? []}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <HStack justifyContent={"center"} alignItems={"center"}>
            <TextInput
              size={"lg"}
              name="shortName"
              label="Enter Country Short Name"
              control={control}
              type="text"
              required
              endIcons={
                <Tooltip
                  borderRadius={"4px"}
                  closeDelay={700}
                  hasArrow
                  placement="top"
                  label={"We use ISO 3166-1 alpha-2"}
                >
                  <InfoIcon
                    cursor={"pointer"}
                    onClick={() =>
                      window.open("https://www.iban.com/country-codes")
                    }
                  />
                </Tooltip>
              }
            />
          </HStack>
        </GridItem>
        <GridItem colSpan={1}>
          <TextInput
            size={"lg"}
            name="isoNumber"
            label="Enter ISO Number "
            control={control}
            type="number"
            required
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Select
            size={"lg"}
            name="code"
            placeholder="-Select Country Code-"
            control={control}
            options={countryCodeOptions ?? []}
            required
          />
          {/* <TextInput
            size={"lg"}
            name="code"
            label="Enter Country Code"
            control={control}
            type="text"
            required
          /> */}
        </GridItem>
        <GridItem colSpan={1}>
          <TextInput
            size={"lg"}
            name="phoneCode"
            label="Enter Phone Code"
            control={control}
            type="number"
            required
          />
        </GridItem>
        <GridItem colSpan={1}>
          <SwitchInput
            name="canSend"
            size={"lg"}
            label="Can Send?"
            control={control}
          />
        </GridItem>{" "}
        <GridItem colSpan={1}>
          <SwitchInput
            name="canReceive"
            size={"lg"}
            label="Can Receive?"
            control={control}
          />
        </GridItem>{" "}
        <GridItem colSpan={1}>
          <SwitchInput
            name="hasState"
            size={"lg"}
            label="Has State?"
            control={control}
          />
        </GridItem>
      </SimpleGrid>
      <HStack justifyContent={"flex-end"}>
        <Button
          minW={"max-content"}
          type="submit"
          isLoading={isAddLoading || isUpdateLoading}
        >
          Save and Proceed
        </Button>
      </HStack>
    </Stack>
  );
};

export default AddCountry;
