import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { DropzoneComponentControlled } from "@neo/components/Form/DropzoneComponent";
import TextInput from "@neo/components/Form/TextInput";
import { useForm } from "react-hook-form";

const defaultValues = {
  relationName: "",
  sourceOfFundImage: ""
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
            <DropzoneComponentControlled
              name="sourceOfFundImage"
              control={control}
              options={{
                maxSize: 2
              }}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="relationName"
              label="Source Of Fund "
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
        </SimpleGrid>
      </form>
    </>
  );
};

export default AddSourceOfFund;
