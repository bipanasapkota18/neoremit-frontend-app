import { GridItem, SimpleGrid } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import { useForm } from "react-hook-form";
interface AddPurposeProps {
  isOpen: boolean;
  onClose: () => void;
}
const defaultValues = {
  purpose: "",
  code: ""
};
const AddPurpose = ({ isOpen, onClose }: AddPurposeProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddPurpose = () => {
    //
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title="Add Purpose of Payment"
        onSubmit={handleSubmit(onAddPurpose)}
      >
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
      </Modal>
    </>
  );
};

export default AddPurpose;
