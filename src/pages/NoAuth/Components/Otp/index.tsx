import { Button, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import OTPComponent from "@neo/components/Form/OTP";
import { useTimer } from "@neo/hooks/useTimer";
import { useVerifyOTP } from "@neo/services/service-forgot-password";
import { useStore } from "@neo/store/store";
import { colorScheme } from "@neo/theme/colorScheme";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AuthPageProps } from "../../ForgotPassword/ForgotPasswordForm";

const defaultValues = {
  otpCode: "" as unknown as number
};

const OTP = ({ setScreen }: AuthPageProps) => {
  const { email } = useStore();
  const { mutateAsync: emailVerification, isLoading } = useVerifyOTP();
  9;
  const schema = yup.object().shape({
    otpCode: yup.number().required().min(5)
  });
  const { minutes, formattedSeconds } = useTimer(0.5);

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });
  const handleOtpValidation = async (data: typeof defaultValues) => {
    const response = await emailVerification({
      otpCode: data.otpCode,
      email: email,
      otpFor: "FORGOT_PASSWORD" // replace "someValue" with the actual value
    });
    if (response.data.responseStatus === "SUCCESS") {
      setScreen("passwordForm");
    }
  };
  return (
    <Fragment>
      <VStack alignItems="flex-start" gap={1}>
        <Text fontSize="2xl" fontWeight={800} color={colorScheme.gray_700}>
          OTP verification
        </Text>
        <Text fontWeight="400" fontSize="md" color={colorScheme.gray_700}>
          Please enter the OTP verification code we sent to your email
        </Text>
      </VStack>
      <VStack
        as="form"
        alignItems={"stretch"}
        gap={8}
        onSubmit={handleSubmit(handleOtpValidation)}
      >
        <Stack gap={5} alignItems={"center"} width={"100%"}>
          <Flex
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            alignSelf="stretch"
          >
            <OTPComponent control={control} name="otpCode" />
          </Flex>
          <Flex gap={"24px"} alignItems={"flex-start"} alignSelf={"stretch"}>
            <Text textAlign={"center"} cursor={"pointer"} fontWeight={700}>
              Resend OTP code in:
              <Text as="span" pl={1} color={colorScheme.primary_400}>
                {minutes}:{formattedSeconds}
              </Text>
            </Text>
            <Text marginLeft={"auto"}>Resend</Text>
          </Flex>
        </Stack>
        <Button
          type="submit"
          isDisabled={!isValid}
          size="lg"
          isLoading={isLoading}
        >
          Proceed
        </Button>
      </VStack>
    </Fragment>
  );
};

export default OTP;
