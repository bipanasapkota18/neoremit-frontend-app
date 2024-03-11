import { GridItem, SimpleGrid } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import {
  CurrenciesList,
  useAddCurrency,
  useUpdateCurrency
} from "@neo/services/MasterData/service-currency";
import { SetStateAction } from "jotai";
import { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddCurrencyProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  isOpen: boolean;
  onClose: () => void;
  editData: CurrenciesList | undefined;
  isLoading: boolean;
}
const defaultValues = {
  code: "",
  name: "",
  shortName: "",
  Symbol: "",
  isActive: true
};

const AddCurrency = ({
  isOpen,
  onClose,
  editId,
  setEditId,
  editData,
  isLoading
}: AddCurrencyProps) => {
  const { mutateAsync: mutateCurrency } = useAddCurrency();
  const { mutateAsync: mutateUpdateCurrency } = useUpdateCurrency();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });
  useEffect(() => {
    if (editId) {
      isLoading
        ? reset({
            code: "Loading...",
            name: "Loading...",
            shortName: "Loading...",
            Symbol: "Loading..."
          })
        : reset({
            code: editData?.code,
            name: editData?.name,
            shortName: editData?.shortName,
            Symbol: editData?.symbol
          });
    }
  }, [editId, editData]);
  const onAddCurrency = (data: typeof defaultValues) => {
    if (editId) {
      mutateUpdateCurrency({
        id: editId,
        data: { ...data, id: editId, isActive: editData?.isActive ?? true }
      });
    } else {
      mutateCurrency(data);
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
        title="Add Currency"
        onSubmit={handleSubmit(onAddCurrency)}
      >
        <SimpleGrid columns={2} gap={"30px"}>
          <GridItem colSpan={2}>
            <TextInput
              name="name"
              label="Enter Currency Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              name="shortName"
              label="Enter Short Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              name="Symbol"
              label="Enter Currency Symbol"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              name="code"
              label="Enter Currency Code"
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

export default AddCurrency;
