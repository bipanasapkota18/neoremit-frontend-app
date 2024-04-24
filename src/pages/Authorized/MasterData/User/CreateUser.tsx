import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import userSchema from "@neo/schema/InternalUser/user";
import { useGetAllRoles } from "@neo/services/MasterData/service-role";
import { useCreateUser } from "@neo/services/MasterData/service-user-management";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { useForm } from "react-hook-form";
const defaultValues = {
  name: "",
  email: "",
  mobileNumber: "" as never as number,
  roles: null as ISelectOptions<number>[] | null
};
interface CreateUserprops {
  isOpen: boolean;
  onClose: () => void;
}
const CreateUserModal = ({ isOpen, onClose }: CreateUserprops) => {
  const { mutateAsync: mutateCreateUser, isLoading } = useCreateUser();
  const { data: rolesData } = useGetAllRoles();
  const { handleSubmit, control, reset } = useForm({
    defaultValues,
    resolver: yupResolver(userSchema)
  });

  const rolesOptions = formatSelectOptions<number>({
    data: rolesData,
    labelKey: "roleName",
    valueKey: "roleId"
  });
  console.log(rolesData);
  const onCreateUser = async (data: typeof defaultValues) => {
    await mutateCreateUser({
      ...data,
      roles: data?.roles?.map(item => item.value) ?? [],
      mobileNumber: String(data.mobileNumber)
    });
    handleCloseModal();
  };
  const handleCloseModal = () => {
    onClose();
    reset();
  };

  return (
    <>
      <Modal
        width="719px"
        isOpen={isOpen}
        onClose={handleCloseModal}
        isSubmitting={isLoading}
        submitButtonText="Add"
        cancelButtonText="Cancel"
        title={" Create User"}
        onSubmit={handleSubmit(onCreateUser)}
      >
        <SimpleGrid columns={2} gap={"30px"}>
          <GridItem colSpan={2}>
            <TextInput
              size={"lg"}
              name="name"
              label="Full Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>

          <GridItem colSpan={1}>
            <TextInput
              size="lg"
              name="email"
              label="Email"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>

          <GridItem colSpan={1}>
            <TextInput
              size="lg"
              name="mobileNumber"
              label="Phone Number"
              control={control}
              type="number"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              name="roles"
              placeholder="Roles"
              options={rolesOptions ?? []}
              control={control}
              isMulti
            />
          </GridItem>
        </SimpleGrid>
      </Modal>
    </>
  );
};

export default CreateUserModal;
