import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import relationshipSchema from "@neo/schema/relationship/relation";
import {
  IRelationshipResponse,
  useAddRelationship,
  useUpdateRelationship
} from "@neo/services/MasterData/service-relationship";
import { Dispatch, SetStateAction, useEffect } from "react";
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
  const { mutateAsync: mutateRelationship, isLoading: isAddLoading } =
    useAddRelationship();
  const { mutateAsync: mutateUpdateRelationship, isLoading: isUpdateLoading } =
    useUpdateRelationship();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(relationshipSchema)
  });
  useEffect(() => {
    if (editId) {
      const selectedRelationship = editData?.find(relation => {
        return relation.id === editId;
      });
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
        title={editId ? "Edit Relationship" : "Add Relationship"}
        onSubmit={handleSubmit(onAddRelationship)}
        isSubmitting={isAddLoading || isUpdateLoading}
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
