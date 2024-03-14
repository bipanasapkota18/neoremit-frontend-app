import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import {
  useAddDocument,
  useGetAllExtensions,
  useUpdateDocument
} from "@neo/services/MasterData/service-document-setup";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddDocumentProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  isOpen: boolean;
  onClose: () => void;
  data: any | undefined;
}

const defaultValues = {
  documentName: "",
  allowedExtensions: null as ISelectOptions<string>[] | null,
  documentCode: "",
  documentSize: "" as unknown as number
};

const AddDocument = ({
  isOpen,
  onClose,
  editId,
  data: editData,
  setEditId
}: AddDocumentProps) => {
  const { mutateAsync: mutateAddDocument } = useAddDocument();
  const { mutateAsync: mutateUpdateDocument } = useUpdateDocument();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });
  const { data: extensionData } = useGetAllExtensions();

  const extensionOptions = formatSelectOptions({
    data: extensionData,
    labelKey: "extension",
    valueKey: "id"
  });
  useEffect(() => {
    if (editId) {
      const selectedDocument = editData?.find((document: any) => {
        return document.id === editId;
      });
      reset({
        documentName: selectedDocument?.documentName,
        allowedExtensions: selectedDocument?.allowedExtensions?.map(
          (item: string) => {
            return { label: item, value: item };
          }
        ),
        documentCode: selectedDocument?.documentCode,
        documentSize: selectedDocument?.documentSize
      });
    }
  }, [editData, editId]);
  const onAddDocument = async (documentData: typeof defaultValues) => {
    if (editId) {
      const selectedDocument = editData?.find((document: any) => {
        return document.id === editId;
      });
      await mutateUpdateDocument({
        id: editId,
        data: {
          ...documentData,
          id: editId,
          isActive: selectedDocument?.isActive ?? true,
          allowedExtensions:
            documentData?.allowedExtensions?.map((item: any) => item.label) ??
            []
        }
      });
    } else {
      await mutateAddDocument({
        ...documentData,
        allowedExtensions:
          documentData?.allowedExtensions?.map(item => item.label) ?? ""
      });
    }
    handleCloseModal();
  };
  const handleCloseModal = () => {
    setEditId(null);
    reset(defaultValues);
    onClose();
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title={editId ? "Update Document" : "Add Document"}
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
              name="allowedExtensions"
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
              label="Document Size(in Mb)"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="documentCode"
              label="Document Code"
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
