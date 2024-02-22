import { GridItem, Select, SimpleGrid } from "@chakra-ui/react";
// import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import { useForm } from "react-hook-form";

export interface ISelectOptions<T extends number | string | boolean> {
  label: string;
  value: T;
}
const defaultValues = {
  documentName: "",
  extensions: null as ISelectOptions<string> | null,
  currencyCode: ""
};
const extensionOptions = [
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
        <SimpleGrid columns={2} spacing={"16px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="documentName"
              label="Document Name"
              control={control}
              type="text"
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              size={"lg"}
              name="extensions"
              placeholder="Select Extension"
            >
              {extensionOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="documentSize"
              label="Document Size(in Kb)"
              control={control}
              type="text"
            />
          </GridItem>
        </SimpleGrid>
      </form>
    </>
  );
};

export default AddDocument;
