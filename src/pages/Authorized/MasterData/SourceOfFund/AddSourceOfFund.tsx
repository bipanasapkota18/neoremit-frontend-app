import { GridItem, SimpleGrid } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";
import { useForm } from "react-hook-form";

const defaultValues = {
  relationName: ""
};
const AddSourceOfFund = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddSourceOfFund = () => {
    //
  };
  return (
    <>
      <form onSubmit={handleSubmit(onAddSourceOfFund)}>
        <SimpleGrid columns={2} spacing={"16px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="relationName"
              label="SourceOfFund Name"
              control={control}
              type="text"
            />
          </GridItem>
        </SimpleGrid>
      </form>
    </>
  );
};

export default AddSourceOfFund;
