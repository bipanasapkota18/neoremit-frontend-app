import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import { useForm } from "react-hook-form";

interface AddDocumentProps {
  isOpen: boolean;
  onClose: () => void;
}
interface ISelectOptions {
  label?: string;
  value?: string;
}

const defaultValues = {
  documentName: "",
  extensions: "",
  currencyCode: ""
};
const extensionOptions: ISelectOptions[] = [
  { label: "pdf", value: "pdf" },
  { label: "docx", value: "docx" }
];
const AddDocument = ({ isOpen, onClose }: AddDocumentProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddDocument = () => {
    //
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title="Add Document"
        onSubmit={handleSubmit(onAddDocument)}
      >
        <SimpleGrid columns={2} spacing={"30px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="documentName"
              label="Document Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              name="extensions"
              placeholder="Extensions"
              options={extensionOptions ?? []}
              control={control}
              isMulti
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="documentSize"
              label="Document Size(in Kb)"
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

export default AddDocument;
