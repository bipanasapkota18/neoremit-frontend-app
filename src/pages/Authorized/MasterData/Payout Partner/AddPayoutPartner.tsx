import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { DropzoneComponentControlled } from "@neo/components/Form/DropzoneComponent";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import { useGetCountryList } from "@neo/services/MasterData/service-country";
import { useGetAllPayoutMethod } from "@neo/services/MasterData/service-payout-method";
import {
  useAddPayoutPartner,
  useUpdatePayoutPartner
} from "@neo/services/MasterData/service-payout-partner";
import { baseURL } from "@neo/services/service-axios";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
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
  // const [countryId, setCountryId] = useState(null as number | null);
  const { mutateAsync: mutateAddPayoutPartner } = useAddPayoutPartner();
  const { mutateAsync: mutateEditPayoutPartner } = useUpdatePayoutPartner();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });
  const { data: countryData } = useGetCountryList();
  // const { data, isLoading: isSingleFetching } =
  //   useGetPayoutPartnerById(countryId);
  const { data: payoutMethod } = useGetAllPayoutMethod();
  const selectedPayoutPartner = useMemo(
    () =>
      editData?.find((payoutPartner: any) => {
        return payoutPartner.id === editId;
      }),
    [editId]
  );
  console.log(countryData);
  const countryOptions = formatSelectOptions({
    data: countryData?.data?.data,
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
      const selectedPayoutMethod = payoutMethodOptions?.find(
        (payoutMethod: any) => {
          return payoutMethod.value === selectedPayoutPartner?.payoutMethod?.id;
        }
      );
      const selectedCountry = countryOptions?.find((country: any) => {
        return country.value === selectedPayoutPartner?.country?.id;
      });
      reset({
        image: selectedPayoutPartner?.image,
        name: selectedPayoutPartner?.name,
        code: selectedPayoutPartner?.code,
        countryId: {
          label: selectedCountry?.label,
          value: Number(selectedCountry?.value)
        },
        payoutMethodId: {
          label: selectedPayoutMethod?.label,
          value: Number(selectedPayoutMethod?.value)
        },
        isActive: selectedPayoutPartner?.isActive
      });
    }
  }, [editId, editData]);
  const onAddPayoutPartner = async (data: typeof defaultValues) => {
    if (editId) {
      await mutateEditPayoutPartner({
        ...data,
        id: editId,
        image: data.image[0] ?? null,
        countryId: data?.countryId?.value ?? null,
        payoutMethodId: data?.payoutMethodId?.value ?? null,
        isActive: selectedPayoutPartner?.isActive ?? true
      });
    } else {
      await mutateAddPayoutPartner({
        ...data,
        image: data.image[0] ?? "",
        countryId: data?.countryId?.value ?? null,
        payoutMethodId: data?.payoutMethodId?.value ?? null
      });
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
        size={"xl"}
        isOpen={isOpen}
        onClose={handleCloseModal}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title={editId ? "Edit Bank/Wallet List" : "Add Bank/Wallet List"}
        onSubmit={handleSubmit(onAddPayoutPartner)}
      >
        <SimpleGrid columns={2} spacing={"30px"}>
          <GridItem colSpan={2}>
            <DropzoneComponentControlled
              name="image"
              control={control}
              options={{ maxSize: 4 }}
              imagePreview={
                editId
                  ? `${baseURL}/document-service/master/payout/partner/image?fileId=${selectedPayoutPartner?.image}`
                  : ""
              }
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              size={"lg"}
              name="countryId"
              placeholder="Country"
              control={control}
              options={countryOptions ?? []}
              // onChange={() => {
              //   setCountryId(watch("countryId")?.value);
              // }}
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
