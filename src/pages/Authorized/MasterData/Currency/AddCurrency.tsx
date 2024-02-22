import { GridItem, SimpleGrid } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";
import { useForm } from "react-hook-form";

const defaultValues = {
  currencyName: "",
  currencySymbol: "",
  currencyCode: ""
};
const AddCurrency = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddCurrency = () => {
    //
  };
  return (
    <>
      <form onSubmit={handleSubmit(onAddCurrency)}>
        <SimpleGrid columns={2} gap={"30px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="currencyName"
              label="Enter Currency Name"
              control={control}
              type="text"
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="currencyCode"
              label="Enter Currency Code"
              control={control}
              type="text"
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="currencySymbol"
              label="Enter Currency Symbol"
              control={control}
              type="text"
            />
          </GridItem>
        </SimpleGrid>
      </form>
    </>
  );
};

export default AddCurrency;
