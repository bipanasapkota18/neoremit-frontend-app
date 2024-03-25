import { Button, Text, VStack } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEmailVerification } from "@neo/services/service-forgot-password";
import { useStore } from "@neo/store/store";
import { colorScheme } from "@neo/theme/colorScheme";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { svgAssets } from "../../../assets/images/svgs/index";

export interface AuthPageProps {
  type?: string;
  setScreen: (value: string) => void;
}
const defaultValues = {
  email: ""
};

const ForgotPasswordForm = ({ setScreen }: AuthPageProps) => {
  const { setEmail } = useStore();
  const { mutateAsync: emailVerification, isLoading } = useEmailVerification();
  const schema = yup.object().shape({
    email: yup
      .string()
      .typeError("Please enter a valid email")
      .email()
      .required("Please enter your email address.")
  });
  const {
    handleSubmit,
    control,
    formState: { isValid }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange"
  });
  const submitHandler = async (data: typeof defaultValues) => {
    const response = await emailVerification(data);
    if (response.data.responseStatus === "SUCCESS") {
      setScreen("otp");
      setEmail(data.email);
    }
  };
  return (
    <>
      <VStack alignItems="flex-start" gap={"4px"}>
        <Text fontSize="2xl" fontWeight="600" color={colorScheme.gray_800}>
          Forget Password?
        </Text>
        <Text fontWeight="400" fontSize="md" color={colorScheme.gray_700}>
          Please provide email address to reset your password.
        </Text>
      </VStack>
      <VStack
        alignItems={"stretch"}
        justifyContent={"flex-start"}
        as={"form"}
        gap={"32px"}
        onSubmit={handleSubmit(submitHandler)}
      >
        <TextInput
          startIcon={<svgAssets.EmailIcon />}
          type="text"
          name="email"
          placeholder={"Email"}
          control={control}
        />
        <Button
          isDisabled={!isValid}
          isLoading={isLoading}
          size={"lg"}
          type="submit"
        >
          Send Code
        </Button>
      </VStack>
    </>
  );
};

export default ForgotPasswordForm;
