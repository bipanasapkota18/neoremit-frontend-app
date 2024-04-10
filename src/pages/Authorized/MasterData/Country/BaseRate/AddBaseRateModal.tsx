import { Box, GridItem, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "@neo/components/DataTable";
import CustomRadioGroup from "@neo/components/Form/Radio/RadioGroup";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import baseRateSchema from "@neo/schema/baserate";
import { colorScheme } from "@neo/theme/colorScheme";
import { formatSelectOptions } from "@neo/utility/format";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { IBaseRateData } from ".";

const defaultValues = {
  isAutomatic: "No",
  baseRate: null as never as number,
  calculatedBaseRate: null as never as number
};
interface AddBaseRateProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  data: IBaseRateData[] | undefined;
  isOpen: boolean;
  onClose: () => void;
  countryId: number | null;
  refetchData: () => void;
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
  setEditId,
  //   editId,
  //   data: editData,
  refetchData
  //   countryId
}: AddBaseRateProps) => {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(baseRateSchema)
  });

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
  //   useEffect(() => {
  //     if (editId) {
  //       const selectedState = editData?.find(item => item.id === editId);
  //       reset({
  //         baseRate: selectedState?.baseRate ?? null
  //       });
  //     }
  //   }, [editData, editId]);

  const onAddBaseRate = async (data: typeof defaultValues) => {
    const preparedData = {
      isAutomatic: data.isAutomatic == "Yes" ? true : false,
      baseRate:
        data.isAutomatic == "Yes" ? data.baseRate : data.calculatedBaseRate
    };
    console.log(preparedData);
    // if (editId) {
    //   await mutateEditState({
    //     id: editId,
    //     data: preparedData
    //   });
    // } else {
    //   await mutateAddState(preparedData);
    // }
    // console.log(data);
  };

  const handleCloseModal = () => {
    setEditId(null);
    reset(defaultValues);
    refetchData();
    onClose();
  };
  return (
    <>
      <Modal
        size={"xl"}
        width="1080px"
        isOpen={isOpen}
        onClose={handleCloseModal}
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
              {watch("isAutomatic") === "Yes" && (
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
