import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import { useGetAllPayoutMethod } from "@neo/services/MasterData/service-payout-method";
import { useAddFeeandChargesDetails } from "@neo/services/service-fees-and-charges";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  paymentMethodIds: null as ISelectOptions<number>[] | null,
  fromAmount: "",
  toAmount: "",
  feeAndChargeType: null as ISelectOptions<number> | null,
  fee: ""
};
interface AddFeeAndChargesDetailsProps {
  editId: number | null;
  data: any;
  setEditId: Dispatch<SetStateAction<number | null>>;
  isOpen: boolean;
  onClose: () => void;
}
const AddFeeAndChargesDetails = ({
  isOpen,
  onClose,
  editId,
  data: editData,
  setEditId
}: AddFeeAndChargesDetailsProps) => {
  const { mutateAsync: mutateAddFeeandChargeDetail } =
    useAddFeeandChargesDetails();
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const { data: payoutMethodData } = useGetAllPayoutMethod();
  const payOutMethodOptions = formatSelectOptions({
    data: payoutMethodData,
    labelKey: "name",
    valueKey: "id"
  });
  const onAddFeeAndChargesDetails = async (data: typeof defaultValues) => {
    await mutateAddFeeandChargeDetail({
      feeAndChargeId: editId,
      data: {
        ...data,
        payoutMethodIds: data.paymentMethodIds?.map(item => item.value),
        feeAndChargeType: data.feeAndChargeType?.value
      }
    });
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title={editId ? "Edit Fee and Charges" : "Add Fee and Charges"}
        onSubmit={handleSubmit(onAddFeeAndChargesDetails)}
      >
        <SimpleGrid columns={2} spacing={"16px"}>
          <GridItem colSpan={2}>
            <Select
              isMulti
              name="paymentMethodIds"
              placeholder="Payment Method"
              control={control}
              options={payOutMethodOptions ?? []}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="fromAmount"
              label="From Amount"
              control={control}
              type="number"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="toAmount"
              label="To Amount"
              control={control}
              type="number"
              isRequired
            />
          </GridItem>
          <GridItem mt={2} colSpan={2}>
            <Select
              name="feeAndChargeType"
              placeholder="Type"
              control={control}
              options={[
                { label: "Percentage", value: "PERCENTAGE" },
                { label: "Flat", value: "FLAT" }
              ]}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="fee"
              label="Enter Fee"
              control={control}
              type="number"
              isRequired
            />
          </GridItem>
        </SimpleGrid>
      </Modal>
    </>
  );
};
export default AddFeeAndChargesDetails;
