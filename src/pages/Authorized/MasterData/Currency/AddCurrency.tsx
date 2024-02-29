import { GridItem, SimpleGrid } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import { useForm } from "react-hook-form";

interface AddCurrencyProps {
  isOpen: boolean;
  onClose: () => void;
}
const defaultValues = {
  currencyName: "",
  currencyShortName: "",
  currencySymbol: "",
  currencyCode: ""
};

const AddCurrency = ({ isOpen, onClose }: AddCurrencyProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddCurrency = () => {
    //
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title="Add Currency"
        onSubmit={handleSubmit(onAddCurrency)}
      >
        <SimpleGrid columns={2} gap={"30px"}>
          <GridItem colSpan={2}>
            <TextInput
              name="currencyName"
              label="Enter Currency Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              name="currencyShortName"
              label="Enter Short Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              name="currencySymbol"
              label="Enter Currency Symbol"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              name="currencyCode"
              label="Enter Currency Code"
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

export default AddCurrency;
