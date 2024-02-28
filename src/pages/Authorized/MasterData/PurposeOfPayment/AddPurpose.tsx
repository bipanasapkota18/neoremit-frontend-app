import { GridItem, SimpleGrid } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";
import { useForm } from "react-hook-form";

const defaultValues = {
  purpose: "",
  code: ""
};
const AddPurpose = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddPurpose = () => {
    //
  };
  return (
    <>
      <form onSubmit={handleSubmit(onAddPurpose)}>
        <SimpleGrid columns={2} spacing={"30px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="purpose"
              label="Enter Purpose"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="code"
              label="Enter Code"
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

export default AddPurpose;
