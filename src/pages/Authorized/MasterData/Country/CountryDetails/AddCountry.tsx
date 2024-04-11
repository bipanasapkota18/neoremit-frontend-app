import { InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  GridItem,
  HStack,
  SimpleGrid,
  Tooltip
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DropzoneComponentControlled } from "@neo/components/Form/DropzoneComponent";
import Select from "@neo/components/Form/SelectComponent";
import SwitchInput from "@neo/components/Form/Switch";
import TextInput from "@neo/components/Form/TextInput";
import { NAVIGATION_ROUTES } from "@neo/pages/App/navigationRoutes";
import countryAdd from "@neo/schema/country/country";
import {
  useAddCountry,
  useUpdateCountry
} from "@neo/services/MasterData/service-country";
import { useGetCurrencyList } from "@neo/services/MasterData/service-currency";
import { baseURL } from "@neo/services/service-axios";
import { formatSelectOptions } from "@neo/utility/format";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const { mutateAsync: mutateAddCountry, isLoading: isAddLoading } =
    useAddCountry();
  const { mutateAsync: mutateUpdate, isLoading: isUpdateLoading } =
    useUpdateCountry();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(countryAdd),
    mode: "onChange"
  });

  const location = useLocation();
  const { data: currencyData } = useGetCurrencyList();

  const currencyOptions = formatSelectOptions({
    data: currencyData,
    valueKey: "id",
    labelKey: "name"
  });

  const selectedCountry = useMemo(
    () =>
      location?.state?.countryData?.find(
        (country: any) => country.id === location?.state?.countryId
      ),
    [location?.state?.countryId]
  );
  useEffect(() => {
    if (location?.state?.countryId) {
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
  }, [location?.state, currencyData]);

  const onAddCountrySetup = async (data: typeof defaultValues) => {
    if (location?.state?.countryId) {
      const updateresponse = await mutateUpdate({
        id: location?.state?.countryId,
        data: {
          ...data,
          flagIcon: data.flagIcon[0] ?? "",
          currencyId: data?.currencyId?.value ?? null,
          isActive: selectedCountry?.isActive ?? true
        }
      });
      if (updateresponse?.status === 200) {
        stepProps.nextStep();
      }
    } else {
      const createResponse = await mutateAddCountry({
        ...data,
        flagIcon: data.flagIcon[0],
        currencyId: data?.currencyId?.value ?? null
      });
      if (createResponse?.status === 200) {
        console.log(createResponse);
        setSearchParams({
          countryId: createResponse?.data?.data?.id
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
    <form onSubmit={handleSubmit(onAddCountrySetup)}>
      <SimpleGrid columns={3} spacing={"30px"}>
        <GridItem colSpan={3}>
          <DropzoneComponentControlled
            name="flagIcon"
            control={control}
            options={{ maxSize: 4 }}
            imagePreview={
              location?.state?.countryId && selectedCountry?.flagIcon != null
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
            isRequired
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Select
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
              isRequired
              endIcons={
                <Tooltip
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
          />
        </GridItem>
        <GridItem colSpan={1}>
          <TextInput
            size={"lg"}
            name="code"
            label="Enter Country Code"
            control={control}
            type="text"
            isRequired
          />
        </GridItem>
        <GridItem colSpan={1}>
          <TextInput
            size={"lg"}
            name="phoneCode"
            label="Enter Phone Code"
            control={control}
            type="number"
            isRequired
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
      <HStack mt={2} justifyContent={"space-between"}>
        <Button
          minW={"max-content"}
          variant="outline"
          mr={1}
          borderColor="purple.400"
          onClick={() => navigate(NAVIGATION_ROUTES.MASTER_DATA.COUNTRY_SETUP)}
        >
          Back
        </Button>
        <Button
          minW={"max-content"}
          type="submit"
          isLoading={isAddLoading || isUpdateLoading}
        >
          Save and Proceed
        </Button>
      </HStack>
    </form>
  );
};

export default AddCountry;
