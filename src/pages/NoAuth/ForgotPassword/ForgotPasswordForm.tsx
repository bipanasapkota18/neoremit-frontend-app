import { Button, Text, VStack } from "@chakra-ui/react";
import TextInput from "@neo/components/Form/TextInput";

import { yupResolver } from "@hookform/resolvers/yup";
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
interface ForgotPasswordFormProps extends AuthPageProps {
  setEmail: (value: string) => void;
}

const ForgotPasswordForm = ({
  setScreen,
  setEmail
}: ForgotPasswordFormProps) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .typeError("Please enter a valid email")
      .email()
      .required("Please enter your email address.")
  });
  const { handleSubmit, control } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });
  const submitHandler = (data: typeof defaultValues) => {
    setEmail(data?.email);
    setScreen("otp");
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
          label={"Email"}
          isRequired
          control={control}
        />
        <Button size={"lg"} type="submit">
          Send Code
        </Button>
      </VStack>
    </>
  );
};

export default ForgotPasswordForm;
