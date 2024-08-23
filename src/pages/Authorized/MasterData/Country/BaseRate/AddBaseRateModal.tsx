import { Box, GridItem, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "@neo/components/DataTable";
import CustomRadioGroup from "@neo/components/Form/Radio/RadioGroup";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import baseRateSchema from "@neo/schema/baserate";
import { useBaseRateConfig } from "@neo/services/MasterData/service-base-rate";
import { colorScheme } from "@neo/theme/colorScheme";
import { formatSelectOptions } from "@neo/utility/format";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  isAutomatic: "No",
  baseRate: null as never as number,
  calculatedBaseRate: null as never as number
};
interface AddBaseRateProps {
  baseRateConfigId: number | null;
  setBaseRateConfigId: Dispatch<SetStateAction<number | null>>;
  senderId: number;
  receiverId: number | null;
  baseRate: number | null;
  isOpen: boolean;
  onClose: () => void;
  countryId: number | null;
}

const radioOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" }
];

const partnerArray = [
  { value: "Partner 1", label: "Partner 1" },
  { value: "Partner 2", label: "Partner 2" },
  { value: "Partner 3", label: "Partner 3" }
];
const partner_options = formatSelectOptions<string>({
  data: partnerArray,
  valueKey: "value",
  labelKey: "label"
});

const baseRateTypeArray = [
  { value: "Base Rate 1", label: "Base Rate 1" },
  { value: "Base Rate 2", label: "Base Rate 2" },
  { value: "Base Rate 3", label: "Base Rate 3" }
];
const base_rate_options = formatSelectOptions<string>({
  data: baseRateTypeArray,
  valueKey: "value",
  labelKey: "label"
});

const AddBaseRate = ({
  isOpen,
  onClose,
  senderId,
  receiverId,
  setBaseRateConfigId,
  baseRate
}: AddBaseRateProps) => {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(baseRateSchema)
  });

  const { mutateAsync, isLoading } = useBaseRateConfig();

  const tableData = [
    {
      id: 1,
      baseRateType: "Base Rate 1",
      exchangeRate: "1.00"
    },
    {
      id: 2,
      baseRateType: "Base Rate 1",
      exchangeRate: "1.00"
    },
    {
      id: 3,
      baseRateType: "Base Rate 1",
      exchangeRate: "1.00"
    }
  ];

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (data: any) => {
        return <Text>{data.row.index + 1}</Text>;
      }
    },
    {
      header: "Rate Providers",
      accessorKey: "baseRateType"
    },
    {
      header: "Exchange Rate",
      accessorKey: "exchangeRate"
    }
  ];
  useEffect(() => {
    if (baseRate) {
      reset({
        ...defaultValues,
        baseRate: baseRate ?? null
      });
    }
  }, [baseRate]);

  const onAddBaseRate = async (data: typeof defaultValues) => {
    const preparedData = {
      isAutomatic: data.isAutomatic == "Yes" ? true : false,
      baseRate:
        data.isAutomatic == "No" ? data.baseRate : data.calculatedBaseRate,
      senderId: senderId,
      receiverId: receiverId
    };
    const addResponse = await mutateAsync(preparedData);
    if (addResponse.status === 200) {
      setBaseRateConfigId(addResponse?.data?.data?.id);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setBaseRateConfigId(null);
    // refetchData();
    reset(defaultValues);
    onClose();
  };
  return (
    <>
      <Modal
        size={"xl"}
        width="1080px"
        isOpen={isOpen}
        onClose={handleCloseModal}
        isSubmitting={isLoading}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title={"Base Rate Configuration"}
        onSubmit={handleSubmit(onAddBaseRate)}
      >
        <SimpleGrid columns={5} spacing={"30px"}>
          <GridItem colSpan={5}>
            <HStack alignItems={"flex-start"} flexDir={"column"}>
              <Text
                color={colorScheme.primary_400}
                fontSize={"17px"}
                fontWeight={700}
              >
                Do you want to set a base rate automatically ?
              </Text>
              <HStack alignItems={"flex-start"} gap={"32px"}>
                <CustomRadioGroup
                  name="isAutomatic"
                  control={control}
                  options={radioOptions}
                />
              </HStack>
              {watch("isAutomatic") === "No" && (
                <TextInput
                  size={"lg"}
                  name="baseRate"
                  label="Enter Base Rate "
                  control={control}
                  type="number"
                  required
                />
              )}
            </HStack>
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              size="lg"
              placeholder="Select Base Rate Type"
              control={control}
              name="baseRateType"
              // label="Deduction From"
              options={base_rate_options ?? []}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              placeholder="-Select Partner-"
              control={control}
              name="partner"
              // label="Deduction From"
              options={partner_options ?? []}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="calculatedBaseRate"
              label="Base Rate"
              control={control}
              disabled
              type="text"
              isRequired
            />
          </GridItem>
        </SimpleGrid>
        <Box pt={4}>
          <DataTable data={tableData} columns={columns} />
        </Box>
      </Modal>
    </>
  );
};

export default AddBaseRate;
