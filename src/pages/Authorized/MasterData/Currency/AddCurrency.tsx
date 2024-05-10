import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import currencySchema from "@neo/schema/currency/currency";
import {
  CurrenciesList,
  ICurrencyRequest,
  useAddCurrency,
  useUpdateCurrency
} from "@neo/services/MasterData/service-currency";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddCurrencyProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  data: CurrenciesList[] | undefined;
  isOpen: boolean;
  onClose: () => void;
  refetchData: () => void;
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
  data: editData,
  refetchData
}: AddCurrencyProps) => {
  const { mutateAsync: mutateCurrency, isLoading: isAddLoading } =
    useAddCurrency();
  const { mutateAsync: mutateUpdateCurrency, isLoading: isUpdateLoading } =
    useUpdateCurrency();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(currencySchema)
  });
  useEffect(() => {
    if (editId) {
      const selectedCurrency = editData?.find(
        currency => currency.id === editId
      );
      reset({
        name: selectedCurrency?.name,
        code: selectedCurrency?.code,
        shortName: selectedCurrency?.shortName,
        Symbol: selectedCurrency?.symbol
      });
    }
  }, [editId, editData]);
  const onAddCurrency = async (data: ICurrencyRequest) => {
    if (editId) {
      const selectedCurrency = editData?.find(
        currency => currency.id === editId
      );

      await mutateUpdateCurrency({
        id: editId,
        data: {
          ...data,
          id: editId,
          isActive: selectedCurrency?.isActive ?? true
        }
      });
    } else {
      await mutateCurrency(data);
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
        size={"xl"}
        isOpen={isOpen}
        onClose={handleCloseModal}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title={editId ? "Edit Currency" : "Add Currency"}
        onSubmit={handleSubmit(onAddCurrency)}
        isSubmitting={isAddLoading || isUpdateLoading}
      >
        <SimpleGrid columns={2} gap={"30px"}>
          <GridItem colSpan={2}>
            <TextInput
              name="name"
              label="Enter Currency Name"
              control={control}
              type="text"
              isRequired
              disabled
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
