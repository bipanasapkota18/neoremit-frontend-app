import { Box, Button, GridItem, HStack, SimpleGrid } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";
import {
  IRoleResponse,
  useAddRole,
  useUpdateRole
} from "@neo/services/MasterData/service-role";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  name: ""
};
interface AddRoleProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  onClose: () => void;
  data: IRoleResponse[] | undefined;
}
const AddRole = ({
  onClose,
  editId,
  data: editData,
  setEditId
}: AddRoleProps) => {
  const selectedRole = useMemo(
    () =>
      editData?.find(role => {
        return role.id === editId;
      }),
    [editData, editId]
  );
  const { mutateAsync: useMutateAddRole, isLoading: isAddLoading } =
    useAddRole();
  const { mutateAsync: useMutateUpdateRole, isLoading: isUpdateLoading } =
    useUpdateRole();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });
  useEffect(() => {
    if (editId) {
      reset({
        name: selectedRole?.name
      });
    }
  }, [editData, editId]);
  const onAddRole = async (data: typeof defaultValues) => {
    if (editId) {
      await useMutateUpdateRole({
        id: editId,
        data: {
          name: data?.name
        }
      });
    } else {
      await useMutateAddRole({
        name: data?.name
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
    <form onSubmit={handleSubmit(onAddRole)}>
      <Box display="flex" gap={"24px"} flexDir={"column"}>
        <SimpleGrid columns={3} spacing={"30px"}>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="name"
              label="Enter Role Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          {/* <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="code"
              label="Enter Code"
              control={control}
              type="text"
              isRequired
            />
          </GridItem> */}
        </SimpleGrid>

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

export default AddRole;
