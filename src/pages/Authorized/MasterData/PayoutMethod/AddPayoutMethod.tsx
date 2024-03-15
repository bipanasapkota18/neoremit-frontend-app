import {
  Box,
  Button,
  GridItem,
  HStack,
  Heading,
  SimpleGrid
} from "@chakra-ui/react";
import Editor from "@neo/components/Editor";
import TextInput from "@neo/components/Form/TextInput";
import {
  IPayoutMethodResponse,
  useAddPayoutMethod,
  useUpdatePayoutMethod
} from "@neo/services/MasterData/service-payout-method";
import { colorScheme } from "@neo/theme/colorScheme";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  name: "",
  description: "",
  code: "",
  isActive: true
};
interface AddPayoutMethodProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  onClose: () => void;
  data: IPayoutMethodResponse[] | undefined;
}
const AddPayoutMethod = ({
  onClose,
  editId,
  data: editData,
  setEditId
}: AddPayoutMethodProps) => {
  const { mutateAsync: useMutateAddPayoutMethod, isLoading: isAddLoading } =
    useAddPayoutMethod();
  const {
    mutateAsync: useMutateUpdatePayoutMethod,
    isLoading: isUpdateLoading
  } = useUpdatePayoutMethod();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });
  useEffect(() => {
    if (editId) {
      const selectedPayoutMethod = editData?.find(payoutMethod => {
        return payoutMethod.id === editId;
      });
      reset({
        name: selectedPayoutMethod?.name,
        code: selectedPayoutMethod?.code,
        description: selectedPayoutMethod?.description
      });
    }
  }, [editData, editId]);
  const onAddPayoutMethod = async (data: typeof defaultValues) => {
    if (editId) {
      const selectedPayoutMethod = editData?.find(payoutMethod => {
        return payoutMethod.id === editId;
      });
      await useMutateUpdatePayoutMethod({
        id: editId,
        data: {
          ...data,
          id: editId,
          isActive: selectedPayoutMethod?.isActive ?? true
        }
      });
    } else {
      await useMutateAddPayoutMethod(data);
    }

    handleCloseModal();
  };
  const handleCloseModal = () => {
    setEditId(null);
    reset(defaultValues);
    onClose();
  };
  return (
    <form onSubmit={handleSubmit(onAddPayoutMethod)}>
      <Box display="flex" gap={"24px"} flexDir={"column"}>
        <Heading
          px={1}
          fontSize={"17px"}
          color={colorScheme.gray_700}
          fontWeight={700}
        >
          Add Payout Method
        </Heading>
        <SimpleGrid columns={2} spacing={"30px"}>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="name"
              label="Enter Payout Method"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={1}>
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
        <HStack>
          <Editor control={control} name="description" />
        </HStack>
        <HStack justifyContent={"flex-end"}>
          <Button
            padding={"16px 32px"}
            fontWeight={600}
            color={"#E53E3E"}
            _hover={{ bg: "#FFF5F5" }}
            bg={"#FFF5F5"}
            _active={{ bg: "#FFF5F5" }}
            fontSize={"17px"}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            isLoading={isUpdateLoading || isAddLoading}
            padding={"10px 40px"}
            fontWeight={700}
            type="submit"
          >
            Save
          </Button>
        </HStack>
      </Box>
    </form>
  );
};

export default AddPayoutMethod;
