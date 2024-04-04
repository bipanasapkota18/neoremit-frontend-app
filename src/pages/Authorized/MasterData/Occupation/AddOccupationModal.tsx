import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import occupationSchema from "@neo/schema/occupation/occupation";
import {
  IOccupationResponse,
  useCreateOccupation,
  useUpdateOccupation
} from "@neo/services/MasterData/service-occupation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
interface AddOccupationProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  data: IOccupationResponse[] | undefined;
  isOpen: boolean;
  onClose: () => void;
}
const defaultValues = {
  name: "",
  code: ""
};
const AddOccupation = ({
  isOpen,
  onClose,
  editId,
  setEditId,
  data: editData
}: AddOccupationProps) => {
  const {
    mutateAsync: mutateAddOccupation,
    isLoading: isAddOccupationLoading
  } = useCreateOccupation();
  const {
    mutateAsync: mutateUpdateOccupation,
    isLoading: isUpdateOccupationLoading
  } = useUpdateOccupation();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(occupationSchema)
  });
  useEffect(() => {
    if (editId) {
      const selectedOccupation = editData?.find(
        occupation => occupation.id === editId
      );
      reset({
        name: selectedOccupation?.name,
        code: selectedOccupation?.code
      });
    }
  }, [editData, editId]);
  const onAddOccupation = async (data: typeof defaultValues) => {
    if (editId) {
      const selectedOccupation = editData?.find(
        occupation => occupation.id === editId
      );
      await mutateUpdateOccupation({
        id: editId,
        data: {
          ...data,
          id: editId,
          isActive: selectedOccupation?.isActive ?? true
        }
      });
    } else {
      await mutateAddOccupation(data);
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
        title={editId ? "Edit Occupation" : "Add Occupation"}
        onSubmit={handleSubmit(onAddOccupation)}
        isSubmitting={isAddOccupationLoading || isUpdateOccupationLoading}
      >
        <SimpleGrid columns={2} spacing={"30px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="name"
              label="Enter Occupation Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="code"
              label="Enter Code"
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

export default AddOccupation;
