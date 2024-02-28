import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import { useForm } from "react-hook-form";

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
const AddDocument = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddDocument = () => {
    //
  };
  return (
    <>
      <form onSubmit={handleSubmit(onAddDocument)}>
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
      </form>
    </>
  );
};

export default AddDocument;
