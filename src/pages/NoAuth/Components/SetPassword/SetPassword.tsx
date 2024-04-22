import {
  Button,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  VStack,
  useBoolean
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { imageAssets } from "@neo/assets/images";
import TextInput from "@neo/components/Form/TextInput";
import { useSetPassword } from "@neo/services/service-forgot-password";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { svgAssets } from "../../../../assets/images/svgs/index";
import AuthPageWrapper from "../AuthPageWrapper";
import PasswordStrength from "./PasswordStrength";
const SetPasswordPage = () => {
  const { mutateAsync, isLoading } = useSetPassword();
  const [flag, setFlag] = useBoolean();
  const [confirmFlag, setConfirmFlag] = useBoolean();
  const navigate = useNavigate();
  const defaultValues = {
    password: "",
    confirm_password: ""
  };
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("email"));

  const handlePasswordChange = async (data: any) => {
    try {
      await mutateAsync({
        email: searchParams.get("email"),
        newPassword: data.password,
        confirmPassword: data.confirm_password
      });

      navigate("/LOGIN");
    } catch (error) {
      console.error("Error setting password:", error);
    }
  };
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
    <AuthPageWrapper isPassword screen="passwordForm">
      <Stack gap={"32px"} width="100%">
        <HStack justifyContent={"space-between"} alignItems={"flex-start"}>
          <Image src={imageAssets.Logo} />
        </HStack>
        <VStack alignItems="flex-start" gap={"4px"}>
          <Text fontSize="2xl" fontWeight="600" color="grey.800">
            Set password
          </Text>
          <Text fontSize="14px" fontWeight="400" color="#2D3748">
            Please enter your new password ,Make sure to save your password.
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
              placeholder={"Password"}
              control={control}
              size={"lg"}
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
              placeholder={"Confirm Password"}
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

          <Button
            type="submit"
            size="lg"
            isDisabled={!isValid}
            isLoading={isLoading}
          >
            Confirm
          </Button>
        </VStack>
      </Stack>
    </AuthPageWrapper>
  );
};

export default SetPasswordPage;
