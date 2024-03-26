import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import sourceSchema from "@neo/schema/sourceoffund/source";
import {
  ISourceOfFundResponse,
  useAddSourceOfFund,
  useUpdateSourceOfFund
} from "@neo/services/MasterData/service-source-of-fund";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
interface AddSourceProps {
  isOpen: boolean;
  onClose: () => void;
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  data: ISourceOfFundResponse[] | undefined;
  refetchData: () => void;
}
const defaultValues = {
  name: "",
  code: ""
};
const AddSourceOfFund = ({
  isOpen,
  onClose,
  editId,
  setEditId,
  data: editData,
  refetchData
}: AddSourceProps) => {
  const {
    mutateAsync: mutateAddSourceOfFund,
    isLoading: isAddSourceOfFundLoading
  } = useAddSourceOfFund();
  const {
    mutateAsync: mutateUpdateSourceOfFund,
    isLoading: isStatusUpdateLoading
  } = useUpdateSourceOfFund();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(sourceSchema)
  });
  useEffect(() => {
    if (editId) {
      const selectedSourceOfFund = editData?.find(
        sourceOfFund => sourceOfFund.id === editId
      );
      reset({
        name: selectedSourceOfFund?.name,
        code: selectedSourceOfFund?.code
      });
    }
  }, [editId, editData]);
  const onAddSourceOfFund = async (data: typeof defaultValues) => {
    if (editId) {
      const selectedSourceOfFund = editData?.find(
        sourceOfFund => sourceOfFund.id === editId
      );
      await mutateUpdateSourceOfFund({
        id: editId,
        data: {
          ...data,
          id: editId,
          isActive: selectedSourceOfFund?.isActive ?? true
        }
      });
    } else {
      await mutateAddSourceOfFund(data);
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
        onClose={onClose}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title={editId ? "Edit Source Of Fund" : "Add Source Of Fund"}
        onSubmit={handleSubmit(onAddSourceOfFund)}
        isSubmitting={isAddSourceOfFundLoading || isStatusUpdateLoading}
      >
        <SimpleGrid columns={2} spacing={"30px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="name"
              label="Source Of Fund "
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

export default AddSourceOfFund;
