import { GridItem, SimpleGrid } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import {
  useAddRelationship,
  useGetRelationshipById,
  useUpdateRelationship
} from "@neo/services/MasterData/service-relationship";
import { SetStateAction } from "jotai";
import { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddRelationshipProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  isOpen: boolean;
  onClose: () => void;
}
const defaultValues = {
  name: "",
  code: ""
};
const AddRelationship = ({
  isOpen,
  onClose,
  setEditId,
  editId
}: AddRelationshipProps) => {
  const { mutateAsync: mutateRelationship } = useAddRelationship();
  const { mutateAsync: mutateUpdateRelationship } = useUpdateRelationship();
  const { data: editData, isFetching: isGetRelationDataLoading } =
    useGetRelationshipById(editId);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });
  useEffect(() => {
    if (editId) {
      isGetRelationDataLoading
        ? reset({
            name: "Loading...",
            code: "Loading..."
          })
        : reset({
            name: editData?.data?.data?.name,
            code: editData?.data?.data?.code
          });
    }
  }, [editId, editData]);
  const onAddRelationship = (data: typeof defaultValues) => {
    if (editId) {
      mutateUpdateRelationship({
        id: editId,
        data: {
          ...data,
          id: editId,
          isActive: editData?.data?.data?.isActive ?? true
        }
      });
    } else {
      mutateRelationship(data);
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
        title="Add Relationship"
        onSubmit={handleSubmit(onAddRelationship)}
      >
        <SimpleGrid columns={2} gap={"30px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="name"
              label="Relationship Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="code"
              label="Relationship Code"
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

export default AddRelationship;
