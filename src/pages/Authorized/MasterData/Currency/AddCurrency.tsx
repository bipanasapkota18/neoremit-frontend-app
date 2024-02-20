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
        <SimpleGrid columns={2} spacing={"16px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="currencyName"
              label="Currency Name"
              control={control}
              type="text"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="currencyCode"
              label="Currency Code"
              control={control}
              type="text"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="currencySymbol"
              label="Currency Symbol"
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
