import { InfoIcon } from "@chakra-ui/icons";
import { GridItem, HStack, SimpleGrid, Tooltip } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
// import { yupResolver } from "@hookform/resolvers/yup";
import { DropzoneComponentControlled } from "@neo/components/Form/DropzoneComponent";
import Select from "@neo/components/Form/SelectComponent";
import SwitchInput from "@neo/components/Form/Switch";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import countryAdd from "@neo/schema/country/country";

// import countryAdd from "@neo/schema/country/country";
import {
  CountriesList,
  useAddCountry,
  useUpdateCountry
} from "@neo/services/MasterData/service-country";
import { useGetAllCurrency } from "@neo/services/MasterData/service-currency";
import { baseURL } from "@neo/services/service-axios";
import { formatSelectOptions } from "@neo/utility/format";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

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
interface AddCountrySetupProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  data: CountriesList[] | undefined;
  isOpen: boolean;
  onClose: () => void;
  refetchData: () => void;
}
const AddCountrySetup = ({
  isOpen,
  onClose,
  editId,
  setEditId,
  refetchData,
  data: editData
}: AddCountrySetupProps) => {
  const { mutateAsync: mutateAddCountry } = useAddCountry();
  const { mutateAsync: mutateUpdate } = useUpdateCountry();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(countryAdd),
    mode: "onChange"
  });
  const { mutateAsync: mutateCurrency, data: currencyData } =
    useGetAllCurrency();
  useEffect(() => {
    mutateCurrency({
      pageParams: { page: 0, size: 20 },
      filterParams: {}
    });
  }, []);
  const currencyOptions = formatSelectOptions({
    data: currencyData?.data?.data?.currenciesList,
    valueKey: "id",
    labelKey: "name"
  });

  const selectedCountry = useMemo(
    () => editData?.find(country => country.id === editId),
    [editId]
  );
  useEffect(() => {
    if (editId) {
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
        isActive: selectedCountry?.isActive,
        currencyId: {
          label: selectedCurrency?.label,
          value: Number(selectedCurrency?.value)
        }
      });
    }
  }, [editData, editId]);
  const onAddCountrySetup = async (data: typeof defaultValues) => {
    if (editId) {
      await mutateUpdate({
        id: editId,
        data: {
          ...data,
          flagIcon: data.flagIcon[0] ?? "",
          currencyId: data?.currencyId?.value ?? null,
          isActive: selectedCountry?.isActive ?? true
        }
      });
    } else {
      await mutateAddCountry({
        ...data,
        flagIcon: data.flagIcon[0],
        currencyId: data?.currencyId?.value ?? null
      });
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
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title={editId ? "Edit Country" : "Add Country"}
        onSubmit={handleSubmit(onAddCountrySetup)}
      >
        <SimpleGrid columns={2} spacing={"30px"}>
          <GridItem colSpan={2}>
            <DropzoneComponentControlled
              name="flagIcon"
              control={control}
              options={{ maxSize: 4 }}
              imagePreview={
                editId && selectedCountry?.flagIcon != null
                  ? `${baseURL}/document-service/master/flag-icon?fileId=${selectedCountry?.flagIcon}`
                  : ""
              }
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="name"
              label="Enter Country Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
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
      </Modal>
    </>
  );
};

export default AddCountrySetup;
