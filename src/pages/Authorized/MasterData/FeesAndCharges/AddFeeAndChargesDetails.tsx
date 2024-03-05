import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import { useForm } from "react-hook-form";

const defaultValues = {
  paymentMethod: "",
  fromAmount: "",
  toAmount: "",
  type: "",
  fee: ""
};
interface AddFeeAndChargesDetailsProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddFeeAndChargesDetails = ({
  isOpen,
  onClose
}: AddFeeAndChargesDetailsProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddFeeAndChargesDetails = () => {
    //
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title="Add Fee and Charges Detail"
        onSubmit={handleSubmit(onAddFeeAndChargesDetails)}
      >
        <SimpleGrid columns={2} spacing={"16px"}>
          <GridItem colSpan={2}>
            <Select
              name="paymentMethod"
              placeholder="Payment Method"
              control={control}
              options={[
                { label: "Cash", value: "cash" },
                { label: "Wallet", value: "wallet" },
                { label: "Bank", value: "bank" }
              ]}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="fromAmount"
              label="From Amount"
              control={control}
              type="number"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="toAmount"
              label="To Amount"
              control={control}
              type="number"
              isRequired
            />
          </GridItem>
          <GridItem mt={2} colSpan={2}>
            <Select
              name="type"
              placeholder="Type"
              control={control}
              options={[
                { label: "Percentage", value: "percentage" },
                { label: "Fixed", value: "fixed" }
              ]}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="fee"
              label="Enter Fee"
              control={control}
              type="number"
              isRequired
            />
          </GridItem>
        </SimpleGrid>
      </Modal>
    </>
  );
};
export default AddFeeAndChargesDetails;
