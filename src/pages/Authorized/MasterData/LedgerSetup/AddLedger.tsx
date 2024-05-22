import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "@neo/components/Form/SelectComponent";
import SwitchInput from "@neo/components/Form/Switch";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import ledgerHeadSchema from "@neo/schema/ledger setup/ledgersetup";
import { useGetCurrencyList } from "@neo/services/MasterData/service-currency";
import {
  ILedgerHeadResponse,
  useAddLedgerHead,
  useUpdateLedgerHeadStatus
} from "@neo/services/MasterData/service-ledge-setup";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
interface AddLedgerHeadModalProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  isOpen: boolean;
  data?: ILedgerHeadResponse[];
  onClose: () => void;
}

const defaultValues = {
  name: "",
  shortCode: "",
  currencyId: null as ISelectOptions<number> | null,
  description: ""
};

const AddLedgerHeadModal = ({
  isOpen,
  onClose,
  editId,
  data: editData
}: AddLedgerHeadModalProps) => {
  const {
    isLoading: isUpdateLedgerHeadStatusLoading,
    mutateAsync: mutateUpdateLedgerHead
  } = useUpdateLedgerHeadStatus();

  const { data: currencyList } = useGetCurrencyList();
  const currencyOptions = formatSelectOptions<number>({
    data: currencyList,
    valueKey: "id",
    labelKey: "name"
  });

  const { mutateAsync: mutateAddLedgerHead, isLoading: isAddLoading } =
    useAddLedgerHead();
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(ledgerHeadSchema)
  });

  const handleCloseModal = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    if (editId) {
      const selectedLedgerHead = editData?.find(
        ledgerHead => ledgerHead?.id === editId
      );
      const selectedCurrency = currencyOptions?.find(
        item => item?.value == selectedLedgerHead?.currency?.id
      );
      reset({
        name: selectedLedgerHead?.name ?? "",
        shortCode: selectedLedgerHead?.shotCode ?? "",
        currencyId: selectedCurrency,
        description: selectedLedgerHead?.description ?? ""
      });
    }
  }, [editId]);

  const onAddLedgerHead = async (data: typeof defaultValues) => {
    try {
      if (editId) {
        await mutateUpdateLedgerHead({
          id: editId,
          data: {
            ...data,
            id: editId,
            currencyId: data?.currencyId?.value ?? null
          }
        });
      } else {
        await mutateAddLedgerHead({
          ...data,
          currencyId: data?.currencyId?.value
        });
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      width="719px"
      isOpen={isOpen}
      onClose={handleCloseModal}
      submitButtonText="Save"
      cancelButtonText="Cancel"
      title={editId ? "Edit Ledger Head" : "Add Ledger Head"}
      isSubmitting={isAddLoading || isUpdateLedgerHeadStatusLoading}
      onSubmit={handleSubmit(onAddLedgerHead)}
    >
      <SimpleGrid columns={2} spacing={10} padding={5}>
        <GridItem colSpan={2}>
          <TextInput
            name="name"
            label="Ledger Head Name"
            control={control}
            type="text"
            isRequired
          />
        </GridItem>
        <GridItem colSpan={2}>
          <TextInput
            name="shortCode"
            label="Ledger Short code"
            control={control}
            type="number"
            isRequired
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Select
            size={"lg"}
            name="currencyId"
            placeholder="-Select Currency-"
            options={currencyOptions ?? []}
            control={control}
          />
        </GridItem>

        <GridItem colSpan={2}>
          <TextInput
            name="description"
            label="Description"
            control={control}
            type="text"
            isRequired
          />
        </GridItem>
        <GridItem colSpan={1}>
          <SwitchInput
            control={control}
            label="Partner Ledger"
            name="isPartnerLedger"
          />
        </GridItem>
      </SimpleGrid>
    </Modal>
  );
};

export default AddLedgerHeadModal;
