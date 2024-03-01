import { GridItem, SimpleGrid } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import { useForm } from "react-hook-form";

interface AddRelationshipProps {
  isOpen: boolean;
  onClose: () => void;
}
const defaultValues = {
  relationName: ""
};
const AddRelationship = ({ isOpen, onClose }: AddRelationshipProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddRelationship = () => {
    //
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title="Add Relationship"
        onSubmit={handleSubmit(onAddRelationship)}
      >
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
      </Modal>
    </>
  );
};

export default AddRelationship;
