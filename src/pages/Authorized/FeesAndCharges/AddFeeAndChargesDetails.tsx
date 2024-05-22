import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import { useGetAllPayoutMethod } from "@neo/services/MasterData/service-payout-method";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  IFeeAndChargeDetailsResponse,
  useAddFeeandChargesDetails,
  useUpdateFeeandChargesDetails
} from "@neo/services/service-fees-and-charges";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import * as yup from "yup";
import { IArrayValues } from "./AddFeeAndCharges";

const defaultValues = {
  payoutMethods: null as ISelectOptions<any>[] | null,
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
  const { mutateAsync: mutateAddFeeandChargeDetail } =
    useAddFeeandChargesDetails();
  const { mutateAsync: mutateEditFeeAndChargeDetail } =
    useUpdateFeeandChargesDetails();

  const schema = yup.object().shape({
    payoutMethods: yup
      .array()
      .min(1, "Select at least payment method")
      .required("Select at least payment method")
      .of(yup.object())
      .nullable(),
    fromAmount: yup
      .number()
      .typeError("Please enter from amount")
      .positive("Please enter positive value")
      .required("Please enter from amount"),
    toAmount: yup
      .number()
      .typeError("Please enter to amount")
      .positive("Please enter positive value")
      .required("Please enter to amount"),
    feeAndChargeType: yup
      .object()
      .required("Select a fee and charge type")
      .nullable(),
    fee: yup.number().typeError("Please enter fee").required()
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });

  const selectedFeeAndCharge = useMemo(
    () =>
      editData?.feeAndChargesDetails?.find(item => item.id === EditDetailId),
    [editData, EditDetailId]
  );

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

  useEffect(() => {
    if (EditDetailId && tableData.length > 0) {
      const selectedWhileAdd = tableData.find(
        item => item.addId === EditDetailId
      );
      const selectedPayOutMethod = payOutMethodOptions?.filter(item =>
        selectedWhileAdd?.payoutMethods
          ?.map((item: any) => {
            return item.value;
          })
          .includes(item.value)
      );

      const selectedFeeType = feeTypeOptions?.find(
        item => item.value === selectedWhileAdd?.feeAndChargeType
      );
      reset({
        ...selectedWhileAdd,
        payoutMethods: selectedPayOutMethod,
        feeAndChargeType: {
          label: selectedFeeType?.label,
          value: selectedFeeType?.value + ""
        },
        fromAmount: selectedWhileAdd?.fromAmount ?? null,
        toAmount: selectedWhileAdd?.toAmount ?? null,
        fee: selectedWhileAdd?.fee ?? null
      });
    } else if (EditDetailId) {
      const selectedPayOutMethod = payOutMethodOptions?.filter((item: any) =>
        selectedFeeAndCharge?.payoutMethods
          ?.map(item => item.id)
          .includes(item.value)
      );
      const selectedFeeType = feeTypeOptions?.find(
        item => item.value === selectedFeeAndCharge?.feeAndChargeType
      );
      reset({
        ...selectedFeeAndCharge,
        payoutMethods: selectedPayOutMethod,
        feeAndChargeType: {
          label: selectedFeeType?.label,
          value: selectedFeeType?.value + ""
        },
        fromAmount: selectedFeeAndCharge?.fromAmount ?? null,
        toAmount: selectedFeeAndCharge?.toAmount ?? null,
        fee: selectedFeeAndCharge?.fee ?? null
      });
    }
  }, [EditDetailId]);

  const onAddFeeAndChargesDetails = async (data: typeof defaultValues) => {
    try {
      if (EditDetailId) {
        if (tableData.length > 0) {
          setTableData(oldValues =>
            oldValues.map(item =>
              item.addId === EditDetailId
                ? {
                    ...item,
                    feeAndChargeType: data?.feeAndChargeType?.value ?? "",
                    payoutMethods: data?.payoutMethods ?? [],
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
              payoutMethods: data?.payoutMethods?.map(item => item.value) ?? [],
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
              payoutMethods: data?.payoutMethods?.map(item => item.value) ?? [],
              feeAndChargeType: data?.feeAndChargeType?.value ?? ""
            }
          });
        } else {
          setTableData(oldValues => [
            ...oldValues,
            {
              addId: oldValues.length + 1,
              feeAndChargeType: data?.feeAndChargeType?.value ?? "",
              payoutMethods: data?.payoutMethods,
              fromAmount: Number(data?.fromAmount) ?? null,
              toAmount: Number(data?.toAmount) ?? null,
              fee: Number(data?.fee) ?? null
            }
          ]);
        }
      }
    } catch (e) {
      console.error(e);
    }
    handleClose();
  };

  const handleClose = () => {
    reset(defaultValues);
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
              name="payoutMethods"
              placeholder="Payment Method"
              control={control}
              options={payOutMethodOptions ?? []}
              required
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
              required
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
