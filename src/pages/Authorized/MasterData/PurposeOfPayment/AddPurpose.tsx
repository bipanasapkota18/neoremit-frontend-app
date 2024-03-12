import { GridItem, SimpleGrid } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import {
  IPurposeResponse,
  useAddPurpose,
  useUpdatePurpose
} from "@neo/services/MasterData/service-purposeofpayment";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
interface AddPurposeProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  data: IPurposeResponse[] | undefined;
  isOpen: boolean;
  onClose: () => void;
  refetchData: () => void;
}
const defaultValues = {
  name: "",
  code: "",
  isActive: true
};
const AddPurpose = ({
  isOpen,
  onClose,
  editId,
  setEditId,
  data: editData,
  refetchData
}: AddPurposeProps) => {
  const { mutateAsync: mutateAddPurpose, isLoading: isAddPurposeLoading } =
    useAddPurpose();
  const {
    mutateAsync: mutateUpdatePurpose,
    isLoading: isUpdatePurposeLoading
  } = useUpdatePurpose();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });
  useEffect(() => {
    if (editId) {
      const selectedPurpose = editData?.find(purpose => purpose.id === editId);
      reset({
        name: selectedPurpose?.name,
        code: selectedPurpose?.code
      });
    }
  }, [editData, editId]);
  const onAddPurpose = async (data: typeof defaultValues) => {
    if (editId) {
      const selectedPurpose = editData?.find(purpose => purpose.id === editId);
      await mutateUpdatePurpose({
        id: editId,
        data: {
          ...data,
          id: editId,
          isActive: selectedPurpose?.isActive ?? true
        }
      });
    } else {
      await mutateAddPurpose(data);
    }
    handleCloseModal();
    refetchData();
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
        title={editId ? "Edit Purpose of Payment" : "Add Purpose of Payment"}
        onSubmit={handleSubmit(onAddPurpose)}
        isSubmitting={isAddPurposeLoading || isUpdatePurposeLoading}
      >
        <SimpleGrid columns={2} spacing={"30px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="name"
              label="Enter Purpose"
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

export default AddPurpose;
