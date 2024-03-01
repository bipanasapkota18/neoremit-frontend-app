import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { DropzoneComponentControlled } from "@neo/components/Form/DropzoneComponent";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import { useForm } from "react-hook-form";

const defaultValues = {
  payoutPartnerImage: "",
  payoutPartnerName: "",
  payoutPartnerCode: ""
};
interface AddPayoutPartnerProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddPayoutPartner = ({ isOpen, onClose }: AddPayoutPartnerProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddPayoutPartner = () => {
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
        onSubmit={handleSubmit(onAddPayoutPartner)}
      >
        <SimpleGrid columns={2} spacing={"30px"}>
          <GridItem colSpan={2}>
            <DropzoneComponentControlled
              name="payoutPartnerImage"
              control={control}
              options={{ maxSize: 4 }}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              size={"lg"}
              name="payoutPartnerType"
              placeholder="Payout Method"
              control={control}
              options={[
                { label: "Bank", value: "bank" },
                { label: "Agent", value: "agent" }
              ]}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              size={"lg"}
              name="payoutPartnerType"
              placeholder="Country"
              control={control}
              options={[
                { label: "Bank", value: "bank" },
                { label: "Agent", value: "agent" }
              ]}
            />
          </GridItem>

          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="payoutPartnerName"
              label="Enter Payout Partner Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="payoutPartnerCode"
              label="Enter Payout Partner Code"
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

export default AddPayoutPartner;
