import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import { useGetAllPayoutMethod } from "@neo/services/MasterData/service-payout-method";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { useForm } from "react-hook-form";

import {
  IFeeAndChargeDetailsResponse,
  useAddFeeandChargesDetails,
  useUpdateFeeandChargesDetails
} from "@neo/services/service-fees-and-charges";
import { Dispatch, SetStateAction } from "react";
import { IArrayValues } from "./AddFeeandCharges";

const defaultValues = {
  payoutMethodIds: null as ISelectOptions<any>[] | null,
  fromAmount: null as number | null,
  toAmount: null as number | null,
  feeAndChargeType: null as ISelectOptions<string> | null,
  fee: null as number | null
};
interface AddFeeAndChargesDetailsProps {
  EditDetailId: number | null;
  data: IFeeAndChargeDetailsResponse | undefined;
  setEditDetailId: Dispatch<SetStateAction<number | null>>;
  isOpen: boolean;
  onClose: () => void;
  tableData: IArrayValues[];
  setTableData: Dispatch<SetStateAction<IArrayValues[]>>;
}
const AddFeeAndChargesDetails = ({
  isOpen,
  onClose,
  EditDetailId,
  data: editData,
  setEditDetailId,
  setTableData,
  tableData
}: AddFeeAndChargesDetailsProps) => {
  // console.log(EditDetailId);
  const { mutateAsync: mutateAddFeeandChargeDetail } =
    useAddFeeandChargesDetails();
  const { mutateAsync: mutateEditFeeAndChargeDetail } =
    useUpdateFeeandChargesDetails();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });
  // const selectedFeeAndCharge = useMemo(
  //   () =>
  //     editData?.feeAndChargesDetails?.find(item => item.id === EditDetailId),
  //   [editData, EditDetailId]
  // );
  const { data: payoutMethodData } = useGetAllPayoutMethod();
  const payOutMethodOptions = formatSelectOptions({
    data: payoutMethodData,
    labelKey: "name",
    valueKey: "id"
  });
  const feeTypeOptions = formatSelectOptions({
    data: [
      { label: "Percentage", value: "PERCENTAGE" },
      { label: "Flat", value: "FLAT" }
    ],
    labelKey: "label",
    valueKey: "value"
  });

  // useEffect(() => {
  //   if (EditDetailId && tableData.length > 0) {
  //     const selectedWhileAdd = tableData.find(
  //       item => item.addId === EditDetailId
  //     );
  //     const selectedPayOutMethod = payOutMethodOptions?.filter((item: any) =>
  //       selectedWhileAdd?.payoutMethods
  //         ?.map((item: any) => item.id)
  //         .includes(item.value)
  //     );
  //     const selectedFeeType = feeTypeOptions?.find(
  //       (item: any) => item.value === selectedWhileAdd?.feeAndChargeType
  //     );
  //     reset({
  //       ...selectedWhileAdd,
  //       payoutMethodIds: selectedPayOutMethod,
  //       feeAndChargeType: selectedFeeType,
  //       fromAmount: selectedWhileAdd?.fromAmount ?? null,
  //       toAmount: selectedWhileAdd?.toAmount ?? null,
  //       fee: selectedWhileAdd?.fee ?? null
  //     });
  //   } else if (EditDetailId) {
  //     const selectedPayOutMethod = payOutMethodOptions?.filter((item: any) =>
  //       selectedFeeAndCharge?.payoutMethods
  //         ?.map(item => item.id)
  //         .includes(item.value)
  //     );
  //     const selectedFeeType = feeTypeOptions?.find(
  //       (item: any) => item.value === selectedFeeAndCharge?.feeAndChargeType
  //     );
  //     reset({
  //       ...selectedFeeAndCharge,
  //       payoutMethodIds: selectedPayOutMethod,
  //       feeAndChargeType: selectedFeeType,
  //       fromAmount: selectedFeeAndCharge?.fromAmount ?? null,
  //       toAmount: selectedFeeAndCharge?.toAmount ?? null,
  //       fee: selectedFeeAndCharge?.fee ?? null
  //     });
  //   }
  // }, [EditDetailId]);
  const onAddFeeAndChargesDetails = async (data: typeof defaultValues) => {
    try {
      if (EditDetailId) {
        if (tableData.length > 0) {
          // const dataToEdit = tableData.find(
          //   item => item.addId === EditDetailId
          // );
          setTableData(oldValues =>
            oldValues.map(item =>
              item.addId === EditDetailId
                ? {
                    ...item,
                    feeAndChargeType: data?.feeAndChargeType?.value ?? "",
                    payoutMethods: data?.payoutMethodIds?.map(item => ({
                      id: item.value,
                      name: item.label
                    })),
                    fromAmount: Number(data?.fromAmount) ?? null,
                    toAmount: Number(data?.toAmount) ?? null,
                    fee: Number(data?.fee) ?? null
                  }
                : item
            )
          );
        } else {
          await mutateEditFeeAndChargeDetail({
            id: EditDetailId,
            data: {
              ...data,
              fromAmount: Number(data?.fromAmount) ?? null,
              toAmount: Number(data?.toAmount) ?? null,
              fee: Number(data?.fee) ?? null,
              payoutMethodIds:
                data?.payoutMethodIds?.map(item => item.value) ?? [],
              feeAndChargeType: data?.feeAndChargeType?.value ?? "",
              id: EditDetailId
            }
          });
        }
      } else {
        if (editData) {
          await mutateAddFeeandChargeDetail({
            feeAndChargeId: editData?.id ?? null,
            data: {
              ...data,
              fromAmount: Number(data?.fromAmount) ?? null,
              toAmount: Number(data?.toAmount) ?? null,
              fee: Number(data?.fee) ?? null,
              payoutMethodIds:
                data?.payoutMethodIds?.map(item => item.value) ?? [],
              feeAndChargeType: data?.feeAndChargeType?.value ?? ""
            }
          });
        } else {
          setTableData(oldValues => [
            ...oldValues,
            {
              addId: oldValues.length + 1,
              feeAndChargeType: data?.feeAndChargeType?.value ?? "",
              payoutMethodIds: data?.payoutMethodIds?.map(item => item.value),
              fromAmount: Number(data?.fromAmount) ?? null,
              toAmount: Number(data?.toAmount) ?? null,
              fee: Number(data?.fee) ?? null
            }
          ]);
          // initialFeeAndChargeDetails.push({
          //   feeAndChargeType: data?.feeAndChargeType?.value ?? "",
          //   payoutMethods: data?.payoutMethodIds?.map(item => ({
          //     id: item.value,
          //     name: item.label
          //   })),
          //   fromAmount: Number(data?.fromAmount) ?? null,
          //   toAmount: Number(data?.toAmount) ?? null,
          //   fee: Number(data?.fee) ?? null
          // });
          // setInitialFeeAndChargeDetails(initialFeeAndChargeDetails);
        }
      }
    } catch (e) {
      console.error(e);
    }
    handleClose();
  };

  const handleClose = () => {
    reset({});
    setEditDetailId(null);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title={EditDetailId ? "Edit Fee and Charges" : "Add Fee and Charges"}
        onSubmit={handleSubmit(onAddFeeAndChargesDetails)}
      >
        <SimpleGrid columns={2} spacing={"16px"}>
          <GridItem colSpan={2}>
            <Select
              isMulti
              name="payoutMethodIds"
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
              options={feeTypeOptions ?? []}
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
