import {
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import CheckBox from "@neo/components/Form/Checkbox";
import TextInput from "@neo/components/Form/TextInput";
import {
  IRoleResponse,
  useGetAllModules
} from "@neo/services/MasterData/service-role";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  roleName: null as string | null,
  roleDescription: null as string | null
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
        return role.roleId === editId;
      }),
    [editData, editId]
  );

  // const { mutateAsync: useMutateAddRole, isLoading: isAddLoading } =
  //   useAddRole();

  const { data: moduleList } = useGetAllModules();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });
  useEffect(() => {
    if (editId) {
      reset({
        roleName: selectedRole?.roleName
      });
    }
  }, [editData, editId]);
  const onAddRole = async (data: typeof defaultValues) => {
    console.log(data);
    // await useMutateAddRole({
    //   ...data,
    //   roleId: editId ?? null
    // });
    // handleCloseModal();
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
          <GridItem colSpan={{ base: 3, sm: 3, md: 1 }}>
            <TextInput
              size={"lg"}
              name="name"
              label="Enter Role Name"
              control={control}
              type="text"
              required
            />
          </GridItem>
          <GridItem colSpan={{ base: 3, sm: 3, md: 1 }}>
            <TextInput
              size={"lg"}
              name="roleDescription"
              label="Enter Description"
              control={control}
              type="text"
              required
            />
          </GridItem>
          <GridItem colSpan={{ base: 3, sm: 3, md: 1 }}>
            <TextInput
              size={"lg"}
              name="roleHierarchy"
              label="Enter Hierarchy"
              control={control}
              type="text"
              required
            />
          </GridItem>
        </SimpleGrid>
        <SimpleGrid padding={"16px"} columns={5} gap={"40px"}>
          {moduleList?.map(module => (
            <GridItem key={module.id} colSpan={1}>
              <Flex gap={"24px"} flexDir={"column"}>
                <Text fontWeight={400} fontSize={"17px"} color={"#2D3748"}>
                  {module.name}
                </Text>
                <Flex gap={"16px"} direction={"column"}>
                  {module.scopeList.map(scope => (
                    <Box
                      key={scope}
                      sx={{
                        display: "flex",
                        alignItems: "center"
                      }}
                      color={"#2D3748"}
                    >
                      <CheckBox width={"10%"} name={scope} control={control} />
                      <Box>{scope}</Box>
                    </Box>
                  ))}
                </Flex>
              </Flex>
            </GridItem>
          ))}
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
            // isLoading={isAddLoading}
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
