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
import countryAdd from "@neo/schema/country/country";
import {
  useAddCountry,
  useGetCountryById,
  useUpdateCountry
} from "@neo/services/MasterData/service-country";
import { useGetCurrencyList } from "@neo/services/MasterData/service-currency";
import { baseURL } from "@neo/services/service-axios";
import { formatSelectOptions } from "@neo/utility/format";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const defaultValues = {
  name: "",
  shortName: "",
  phoneCode: "",
  isoNumber: "",
  code: "",
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
  const [searchParams, setSearchParams] = useSearchParams();

  const { mutateAsync: mutateAddCountry, isLoading: isAddLoading } =
    useAddCountry();

  const { mutateAsync: mutateUpdate, isLoading: isUpdateLoading } =
    useUpdateCountry();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(countryAdd),
    mode: "onChange"
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
        code: selectedCountry?.code,
        phoneCode: selectedCountry?.phoneCode,
        isoNumber: selectedCountry?.isoNumber,
        hasState: selectedCountry?.hasState,
        canReceive: selectedCountry?.canReceive,
        canSend: selectedCountry?.canSend,
        currencyId: selectedCurrency,
        isActive: selectedCountry?.isActive
      });
    }
  }, [selectedCountry]);

  const onAddCountrySetup = async (data: typeof defaultValues) => {
    if (searchParams.get("countryId")) {
      const updateresponse = await mutateUpdate({
        id: Number(searchParams?.get("countryId")),
        data: {
          ...data,
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
            options={{ maxSize: 4 }}
            imagePreview={
              selectedCountry?.flagIcon != null
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
          <TextInput
            size={"lg"}
            name="code"
            label="Enter Country Code"
            control={control}
            type="text"
            required
          />
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
