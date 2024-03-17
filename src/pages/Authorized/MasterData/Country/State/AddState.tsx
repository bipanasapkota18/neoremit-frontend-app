import { GridItem, SimpleGrid } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import {
  StatesList,
  useAddState
} from "@neo/services/MasterData/service-state";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  name: "",
  code: ""
};
interface AddStateProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  data: StatesList[] | undefined;
  isOpen: boolean;
  onClose: () => void;
  countryId: number | null;
  refetchData: () => void;
}
const AddState = ({
  isOpen,
  onClose,
  setEditId,
  editId,
  data: editData,
  refetchData,
  countryId
}: AddStateProps) => {
  const { mutateAsync: mutateAddState } = useAddState();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });
  useEffect(() => {
    if (editId) {
      const selectedState = editData?.find(item => item.id === editId);
      reset({
        name: selectedState?.name,
        code: selectedState?.code
      });
    }
  }, [editData, editId]);
  const onAddState = async (data: typeof defaultValues) => {
    await mutateAddState({ ...data, countryId: countryId });
    handleCloseModal();
  };
  const handleCloseModal = () => {
    setEditId(null);
    reset(defaultValues);
    refetchData();
    onClose();
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title={editId ? "Edit State" : "Add State"}
        onSubmit={handleSubmit(onAddState)}
      >
        <SimpleGrid columns={2} spacing={"30px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="name"
              label="Enter State Name"
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

export default AddState;
