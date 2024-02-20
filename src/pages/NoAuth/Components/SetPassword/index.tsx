import {
  Button,
  IconButton,
  Stack,
  Text,
  VStack,
  useBoolean
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@neo/components/Form/TextInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { svgAssets } from "../../../../assets/images/svgs/index";
import PasswordStrength from "./PasswordStrength";

const defaultValues = {
  password: "",
  confirm_password: ""
};
const SetPassword = () => {
  const [flag, setFlag] = useBoolean();
  const [confirmFlag, setConfirmFlag] = useBoolean();
  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%&*()]/,
        "Password must contain at least one symbol !@#$%&*"
      ),
    confirm_password: yup
      .string()
      .required("Please enter a password ")
      .oneOf([yup.ref("password")], "Passwords don't match")
  });
  const handlePasswordChange = () => {
    //
  };
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid }
  } = useForm({
    defaultValues,
    resolver: yupResolver(passwordSchema),
    mode: "onChange"
  });
  return (
    <>
      <VStack alignItems="flex-start" gap={"4px"}>
        <Text fontSize="2xl" fontWeight="600" color="grey.800">
          Set login password
        </Text>
        <Text fontSize="14px" fontWeight="400" color="#2D3748">
          Please enter your new password , Make sure to save your password.
        </Text>
      </VStack>
      <VStack
        as="form"
        alignItems={"stretch"}
        gap={8}
        onSubmit={handleSubmit(handlePasswordChange)}
      >
        <Stack gap={5} width={"100%"}>
          <TextInput
            startIcon={<svgAssets.PasswordIcon />}
            type={flag ? "text" : "password"}
            name="password"
            label={"Password"}
            control={control}
            size={"lg"}
            // helperText="Password must be at least 8 characters long"
            endIcons={
              <IconButton
                tabIndex={-1}
                colorScheme={"black"}
                size="xs"
                variant="link"
                aria-label="password-control"
                onClick={setFlag.toggle}
                icon={
                  flag ? (
                    <svgAssets.EyeIcon height={"20px"} width={"20px"} />
                  ) : (
                    <svgAssets.EyeSlashIcon height={"20px"} width={"20px"} />
                  )
                }
              />
            }
          />
          <PasswordStrength password={watch("password") ?? ""} />

          <TextInput
            startIcon={<svgAssets.PasswordIcon />}
            type={confirmFlag ? "text" : "password"}
            name="confirm_password"
            label={"Confirm Password"}
            control={control}
            size={"lg"}
            endIcons={
              <IconButton
                tabIndex={-1}
                colorScheme={"black"}
                size="xs"
                variant="link"
                aria-label="password-control"
                onClick={setConfirmFlag.toggle}
                icon={
                  confirmFlag ? (
                    <svgAssets.EyeIcon height={"20px"} width={"20px"} />
                  ) : (
                    <svgAssets.EyeSlashIcon height={"20px"} width={"20px"} />
                  )
                }
              />
            }
          />
        </Stack>
        <Button type="submit" size="lg" isDisabled={!isValid}>
          Confirm
        </Button>
      </VStack>
    </>
  );
};

export default SetPassword;
