import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { DropzoneComponentControlled } from "@neo/components/Form/DropzoneComponent";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import { useForm } from "react-hook-form";

const defaultValues = {
  countryFLag: "",
  countryName: "",
  currency: "",
  countryShortName: "",
  countryCode: "",
  phoneCode: "",
  isoNumber: "" as never,
  canSend: false,
  canReceive: false,
  hasState: false
};
interface AddCountrySetupProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddCountrySetup = ({ isOpen, onClose }: AddCountrySetupProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddCountrySetup = () => {
    //
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title="Add Country"
        onSubmit={handleSubmit(onAddCountrySetup)}
      >
        <SimpleGrid columns={2} spacing={"30px"}>
          <GridItem colSpan={2}>
            <DropzoneComponentControlled
              name="countryFLag"
              control={control}
              options={{ maxSize: 4 }}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="countryName"
              label="Enter Country Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              size={"lg"}
              name="currency"
              placeholder="Currency"
              control={control}
              options={[
                { label: "Bank", value: "bank" },
                { label: "Agent", value: "agent" }
              ]}
            />
          </GridItem>

          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="countryShortName"
              label="Enter Country Short Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="isoNumber"
              label="Enter ISO Number "
              control={control}
              type="number"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="countryCode"
              label="Enter Country Code"
              control={control}
              type="number"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="phoneCode"
              label="Enter Phone Code"
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

export default AddCountrySetup;
