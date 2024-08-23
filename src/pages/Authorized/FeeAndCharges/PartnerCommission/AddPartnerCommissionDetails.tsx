import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";

import { useGetAllPayoutMethod } from "@neo/services/MasterData/service-payout-method";
import {
  IPartnerCommissionResponseById,
  useAddPartnerCommissionDetails,
  useUpdatePartnerCommissionDetails
} from "@neo/services/service-partner-commission";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IArrayValues } from "./AddPartnerCommission";

const defaultValues = {
  paymentMethod: null as ISelectOptions<string> | null,
  fromAmount: null as number | null,
  toAmount: null as number | null,
  type: null as ISelectOptions<string> | null,
  commission: null as number | null
};
interface AddPartnerCommissionDetailsProps {
  EditDetailId: number | null;
  data: IPartnerCommissionResponseById | undefined;
  setEditDetailId: Dispatch<SetStateAction<number | null>>;
  isOpen: boolean;
  onClose: () => void;
  tableData: IArrayValues[];
  setTableData: Dispatch<SetStateAction<IArrayValues[]>>;
}
const AddPartnerCommissionDetails = ({
  isOpen,
  onClose,
  EditDetailId,
  data: editData,
  setEditDetailId,
  setTableData,
  tableData
}: AddPartnerCommissionDetailsProps) => {
  const { mutateAsync: mutateAddPartnerCommissionDetail } =
    useAddPartnerCommissionDetails();
  const { mutateAsync: mutateUpdatePartnerCommission } =
    useUpdatePartnerCommissionDetails();

  const schema = yup.object().shape({
    paymentMethod: yup.object().required("Select a payment method").nullable(),
    fromAmount: yup.number().typeError("Please enter from amount").required(),
    toAmount: yup.number().typeError("Please enter to amount").required(),
    type: yup.object().required("Select a commission type").nullable(),
    commission: yup.number().typeError("Please enter commission").required()
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });

  const selectedFeeAndCharge = useMemo(
    () => editData?.paymentDetails?.find(item => item.id === EditDetailId),
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

      const selectedFeeType = feeTypeOptions?.find(
        (item: any) => item.value === selectedWhileAdd?.type
      );
      reset({
        ...selectedWhileAdd,
        paymentMethod: {
          label: selectedFeeAndCharge?.paymentMethod,
          value: selectedFeeAndCharge?.paymentMethod
        },
        type: {
          label: selectedFeeType?.label,
          value: selectedFeeType?.value + ""
        },
        fromAmount: selectedWhileAdd?.fromAmount ?? null,
        toAmount: selectedWhileAdd?.toAmount ?? null,
        commission: selectedWhileAdd?.commission ?? null
      });
    } else if (EditDetailId) {
      const selectedFeeType = feeTypeOptions?.find(
        (item: any) => item.value === selectedFeeAndCharge?.type
      );
      reset({
        ...selectedFeeAndCharge,
        paymentMethod: {
          label: selectedFeeAndCharge?.paymentMethod,
          value: selectedFeeAndCharge?.paymentMethod
        },
        type: {
          label: selectedFeeType?.label,
          value: selectedFeeType?.value + ""
        },
        fromAmount: selectedFeeAndCharge?.fromAmount ?? null,
        toAmount: selectedFeeAndCharge?.toAmount ?? null,
        commission: selectedFeeAndCharge?.commission ?? null
      });
    }
  }, [EditDetailId]);

  const onAddPartnerCommissionDetails = async (data: typeof defaultValues) => {
    try {
      if (EditDetailId) {
        if (tableData.length > 0) {
          setTableData(oldValues =>
            oldValues.map(item =>
              item.addId === EditDetailId
                ? {
                    ...item,
                    type: data?.type?.value ?? "",
                    paymentMethod:
                      data?.paymentMethod?.label?.toUpperCase() ?? null,
                    fromAmount: Number(data?.fromAmount) ?? null,
                    toAmount: Number(data?.toAmount) ?? null,
                    commission: Number(data?.commission) ?? null
                  }
                : item
            )
          );
        } else {
          await mutateUpdatePartnerCommission({
            id: EditDetailId,
            data: {
              ...data,
              fromAmount: Number(data?.fromAmount) ?? null,
              toAmount: Number(data?.toAmount) ?? null,
              commission: Number(data?.commission) ?? null,
              paymentMethod: data?.paymentMethod?.label.toUpperCase() ?? null,
              type: data?.type?.value ?? ""
            }
          });
        }
      } else {
        if (editData) {
          await mutateAddPartnerCommissionDetail({
            id: editData?.id ?? null,
            data: {
              ...data,
              fromAmount: Number(data?.fromAmount) ?? null,
              toAmount: Number(data?.toAmount) ?? null,
              commission: Number(data?.commission) ?? null,
              paymentMethod: data?.paymentMethod?.label.toUpperCase() ?? null,
              type: data?.type?.value ?? ""
            }
          });
        } else {
          setTableData(oldValues => [
            ...oldValues,
            {
              addId: oldValues.length + 1,
              type: data?.type?.label.toUpperCase() ?? "",
              paymentMethod: data?.paymentMethod,
              fromAmount: Number(data?.fromAmount) ?? null,
              toAmount: Number(data?.toAmount) ?? null,
              commission: Number(data?.commission) ?? null
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
        onSubmit={handleSubmit(onAddPartnerCommissionDetails)}
      >
        <SimpleGrid columns={2} spacing={"16px"}>
          <GridItem colSpan={2}>
            <Select
              name="paymentMethod"
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
              name="type"
              placeholder="Type"
              control={control}
              options={feeTypeOptions ?? []}
              required
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="commission"
              label="Enter Commission"
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
export default AddPartnerCommissionDetails;
