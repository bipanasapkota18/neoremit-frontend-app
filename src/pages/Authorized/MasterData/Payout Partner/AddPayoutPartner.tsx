import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { DropzoneComponentControlled } from "@neo/components/Form/DropzoneComponent";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import { useGetCountryList } from "@neo/services/MasterData/service-country";
import { useGetAllPayoutMethod } from "@neo/services/MasterData/service-payout-method";
import { useAddPayoutPartner } from "@neo/services/MasterData/service-payout-partner";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  image: "",
  name: "",
  code: "",
  countryId: null as ISelectOptions<number> | null,
  payoutMethodId: null as ISelectOptions<number> | null,
  isActive: true
};
interface AddPayoutPartnerProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  isOpen: boolean;
  onClose: () => void;
  data: any;
}
const AddPayoutPartner = ({
  isOpen,
  onClose,
  editId,
  setEditId,
  data: editData
}: AddPayoutPartnerProps) => {
  const { mutateAsync: mutateAddPayoutPartner } = useAddPayoutPartner();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });
  const { data: countryData } = useGetCountryList();

  const { data: payoutMethod } = useGetAllPayoutMethod();

  const countryOptions = formatSelectOptions({
    data: countryData,
    valueKey: "id",
    labelKey: "name"
  });
  const payoutMethodOptions = formatSelectOptions({
    data: payoutMethod,
    valueKey: "id",
    labelKey: "name"
  });
  useEffect(() => {
    if (editId) {
      const selectedPayoutPartner = editData?.find((payoutPartner: any) => {
        return payoutPartner.id === editId;
      });
      reset({
        image: selectedPayoutPartner?.image,
        name: selectedPayoutPartner?.name,
        code: selectedPayoutPartner?.code,
        countryId: selectedPayoutPartner?.countryId,
        payoutMethodId: selectedPayoutPartner?.payoutMethodId,
        isActive: selectedPayoutPartner?.isActive
      });
    }
  }, [editId, editData]);
  const onAddPayoutPartner = (data: typeof defaultValues) => {
    // console.log(data.image[0]);
    mutateAddPayoutPartner({
      ...data,
      image: "",
      countryId: data?.countryId?.value ?? null,
      payoutMethodId: data?.payoutMethodId?.value ?? null
    });
    handleCloseModal;
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
        title={editId ? "Edit Payout Partner" : "Add Payout Partner"}
        onSubmit={handleSubmit(onAddPayoutPartner)}
      >
        <SimpleGrid columns={2} spacing={"30px"}>
          <GridItem colSpan={2}>
            <DropzoneComponentControlled
              name="image"
              control={control}
              options={{ maxSize: 4 }}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              size={"lg"}
              name="payoutMethodId"
              placeholder="Payout Method"
              control={control}
              options={payoutMethodOptions ?? []}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              size={"lg"}
              name="countryId"
              placeholder="Country"
              control={control}
              options={countryOptions ?? []}
            />
          </GridItem>

          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="name"
              label="Enter Payout Partner Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="code"
              label="Enter Payout Partner Code"
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

export default AddPayoutPartner;
