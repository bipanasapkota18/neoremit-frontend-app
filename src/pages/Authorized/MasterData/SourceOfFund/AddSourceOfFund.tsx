import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { DropzoneComponentControlled } from "@neo/components/Form/DropzoneComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import { useForm } from "react-hook-form";
interface AddSourceProps {
  isOpen: boolean;
  onClose: () => void;
}
const defaultValues = {
  relationName: "",
  sourceOfFundImage: ""
};
const AddSourceOfFund = ({ isOpen, onClose }: AddSourceProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddSourceOfFund = () => {
    //
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title="Add SourceOfFund"
        onSubmit={handleSubmit(onAddSourceOfFund)}
      >
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
      </Modal>
    </>
  );
};

export default AddSourceOfFund;
