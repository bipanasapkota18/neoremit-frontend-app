import {
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingIllustration } from "@neo/components/Common/Illustrations/LoadingIllustration";
import CheckBox from "@neo/components/Form/Checkbox";
import TextInput from "@neo/components/Form/TextInput";
import {
  useAddRole,
  useGetAllModules,
  useGetRoleById
} from "@neo/services/MasterData/service-role";
import { colorScheme } from "@neo/theme/colorScheme";
import { Dispatch, SetStateAction, useEffect } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IModuleListRequest {
  moduleId: number;
  moduleName: string;
  scopeList: string[];
}

const defaultValues = {
  roleName: null as string | null,
  roleDescription: null as string | null,
  roleHierarchy: null as number | null,
  moduleList: null as IModuleListRequest[] | null | undefined
};
interface AddRoleProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  onClose: () => void;
}
const AddRole = ({ onClose, editId, setEditId }: AddRoleProps) => {
  const { data: roleData, isLoading: isGetLoading } = useGetRoleById(editId);

  const schema = yup.object().shape({
    roleName: yup.string().required("Role Name is required").nullable(),
    roleDescription: yup
      .string()
      .required("Role Description is required")
      .nullable(),
    roleHierarchy: yup
      .number()
      .required("Role Hierarchy is required")
      .nullable()
  });

  const { mutateAsync: useMutateAddRole, isLoading: isAddLoading } =
    useAddRole();

  const { data: moduleList, isLoading } = useGetAllModules();

  const { control, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    setValue(
      "moduleList",
      moduleList?.map(item => {
        return {
          moduleId: item?.id,
          moduleName: item?.name,
          scopeList: []
        };
      })
    );
    if (editId && moduleList) {
      reset({
        roleName: roleData?.roleName,
        roleDescription: roleData?.roleDescription,
        roleHierarchy: roleData?.roleHierarchy,
        moduleList: getValues("moduleList")?.map(item => {
          const currentModule =
            roleData?.moduleList?.find(
              module => module.moduleId == item.moduleId
            ) ?? item;
          return {
            moduleId: currentModule?.moduleId,
            moduleName: currentModule?.moduleName,
            scopeList: currentModule?.scopeList.reduce(
              (acc: any, curr: string) => {
                console.log(typeof acc);
                acc[curr] = true;
                return acc;
              },
              []
            )
          };
        })
      });
    }
  }, [roleData, moduleList, editId]);

  const onAddRole = async (formData: typeof defaultValues) => {
    const preparedModuleList = formData?.moduleList?.map(moduleData => ({
      moduleId: moduleData.moduleId,
      moduleName: moduleData.moduleName,
      scopeList: Object.keys(moduleData.scopeList).filter(
        (key: any) => moduleData?.scopeList[key]
      )
    }));

    const preparedData = {
      ...formData,
      moduleList: preparedModuleList
    };
    await useMutateAddRole({
      ...preparedData,
      roleId: editId ?? null
    });
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
          <GridItem colSpan={{ base: 3, sm: 3, md: 1 }}>
            <TextInput
              size={"lg"}
              name="roleName"
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
        {isLoading || isGetLoading ? (
          <LoadingIllustration />
        ) : (
          <>
            <SimpleGrid
              padding={"16px"}
              columns={{ base: 1, sm: 1, md: 2, lg: 5 }}
              gap={"40px"}
            >
              {moduleList?.map((module, moduleIndex) => (
                <GridItem key={module.id} colSpan={1}>
                  <Flex
                    borderRadius={"16px"}
                    padding={"16px"}
                    backgroundColor={colorScheme.gray_50}
                    gap={"24px"}
                    flexDir={"column"}
                  >
                    <Text fontWeight={400} fontSize={"17px"} color={"#2D3748"}>
                      {module.name}
                    </Text>
                    <Flex
                      gap={"16px"}
                      direction={"column"}
                      alignContent={"center"}
                      justifyContent={"space-between"}
                    >
                      {module.scopeList.map(scope => (
                        <Box
                          key={scope}
                          sx={{
                            display: "flex",
                            alignItems: "center"
                          }}
                          color={"#2D3748"}
                        >
                          <CheckBox
                            name={`moduleList[${moduleIndex}].scopeList[${scope}]`}
                            control={control}
                            label={scope}
                          />
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
                isLoading={isAddLoading}
                padding={"10px 40px"}
                fontWeight={700}
                type="submit"
              >
                Save
              </Button>
            </HStack>
          </>
        )}
      </Box>
    </form>
  );
};

export default AddRole;
