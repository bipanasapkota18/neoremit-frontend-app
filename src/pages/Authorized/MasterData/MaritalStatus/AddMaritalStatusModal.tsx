import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import maritalStatusSchema from "@neo/schema/maritalstatus/maritalstatus";
import {
  IMaritalStatusResponse,
  useAddMaritalStatus,
  useUpdateMaritalStatus
} from "@neo/services/MasterData/service-marital-status";

import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
interface AddMaritalStatusProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  data: IMaritalStatusResponse[] | undefined;
  isOpen: boolean;
  onClose: () => void;
}
const defaultValues = {
  name: "",
  code: ""
};
const AddMaritalStatus = ({
  isOpen,
  onClose,
  editId,
  setEditId,
  data: editData
}: AddMaritalStatusProps) => {
  const { mutateAsync: mutateAddMaritalStatus, isLoading: isAddLoading } =
    useAddMaritalStatus();
  const {
    mutateAsync: mutateUpdateMaritalStatus,
    isLoading: isUpdateMatitalStatusLoading
  } = useUpdateMaritalStatus();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(maritalStatusSchema)
  });
  useEffect(() => {
    if (editId) {
      const selectedMaritalStaus = editData?.find(
        marital_status => marital_status.id === editId
      );
      reset({
        name: selectedMaritalStaus?.name,
        code: selectedMaritalStaus?.code
      });
    }
  }, [editData, editId]);
  const onAddMaritalStatus = async (data: typeof defaultValues) => {
    if (editId) {
      const selectedMaritalStaus = editData?.find(
        marital_status => marital_status.id === editId
      );
      await mutateUpdateMaritalStatus({
        id: editId,
        data: {
          ...data,
          id: editId,
          isActive: selectedMaritalStaus?.isActive ?? true
        }
      });
    } else {
      await mutateAddMaritalStatus(data);
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
        title={editId ? "Edit Marital Status" : "Add Marital Status"}
        onSubmit={handleSubmit(onAddMaritalStatus)}
        isSubmitting={isAddLoading || isUpdateMatitalStatusLoading}
      >
        <SimpleGrid columns={2} spacing={"30px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="name"
              label="Enter Marital Status"
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

export default AddMaritalStatus;
