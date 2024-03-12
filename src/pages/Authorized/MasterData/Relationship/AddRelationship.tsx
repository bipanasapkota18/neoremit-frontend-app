import { GridItem, SimpleGrid } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import {
  IRelationshipResponse,
  useAddRelationship,
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
  data: IRelationshipResponse[] | undefined;
}
const defaultValues = {
  name: "",
  code: ""
};
const AddRelationship = ({
  isOpen,
  onClose,
  setEditId,
  editId,
  data: editData
}: AddRelationshipProps) => {
  const { mutateAsync: mutateRelationship } = useAddRelationship();
  const { mutateAsync: mutateUpdateRelationship } = useUpdateRelationship();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });
  useEffect(() => {
    if (editId) {
      const selectedRelationship = editData?.find(relation => {
        return relation.id === editId;
      });
      console.log(selectedRelationship);
      reset({
        name: selectedRelationship?.name,
        code: selectedRelationship?.code
      });
    }
  }, [editId, editData]);
  const onAddRelationship = async (data: typeof defaultValues) => {
    if (editId) {
      const selectedRelationship = editData?.find(relation => {
        return relation.id === editId;
      });
      await mutateUpdateRelationship({
        id: editId,
        data: {
          ...data,
          id: editId,
          isActive: selectedRelationship?.isActive ?? true
        }
      });
    } else {
      await mutateRelationship(data);
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
