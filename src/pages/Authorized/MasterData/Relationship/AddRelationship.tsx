import { GridItem, SimpleGrid } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";
import { useForm } from "react-hook-form";

const defaultValues = {
  relationName: ""
};
const AddRelationship = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddRelationship = () => {
    //
  };
  return (
    <>
      <form onSubmit={handleSubmit(onAddRelationship)}>
        <SimpleGrid columns={2} spacing={"16px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="relationName"
              label="Relationship Name"
              control={control}
              type="text"
            />
          </GridItem>
        </SimpleGrid>
      </form>
    </>
  );
};

export default AddRelationship;
