import { Button, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import OTPComponent from "@neo/components/Form/OTP";
import { useTimer } from "@neo/hooks/useTimer";
import { colorScheme } from "@neo/theme/colorScheme";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AuthPageProps } from "../../ForgotPassword/ForgotPasswordForm";

const defaultValues = {
  otp_code: ""
};
const OTP = ({ setScreen }: AuthPageProps) => {
  const schema = yup.object().shape({
    otp_code: yup.string().required().min(5)
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
  const handleOtpValidation = () => {
    setScreen("passwordForm");
  };
  return (
    <Fragment>
      <VStack alignItems="flex-start" gap={1}>
        <Text fontSize="2xl" fontWeight="600" color="grey.800">
          OTP verification
        </Text>
        <Text fontWeight="400" fontSize="md" color="grey.700">
          Please enter the OTP verification code we sent to Gmail ,
          ab*******123@gmail.com
        </Text>
      </VStack>
      <VStack
        as="form"
        alignItems={"stretch"}
        gap={8}
        onSubmit={handleSubmit(handleOtpValidation)}
      >
        <Stack gap={5} alignItems={"center"} width={"100%"}>
          <Flex>
            <OTPComponent control={control} name="otp_code" />
          </Flex>
          <Flex gap={"24px"}>
            {/* {time > 0 && ( */}
            <Text textAlign={"center"} cursor={"pointer"} fontWeight={700}>
              Resend OTP code in:
              <Text as="span" pl={1} color={colorScheme.primary_400}>
                {minutes}:{formattedSeconds}
              </Text>
            </Text>
            {/* )} */}
            <Text>Resend</Text>
          </Flex>
        </Stack>
        <Button
          type="submit"
          isDisabled={!isValid}
          size="lg"
          // isLoading={isPending}
        >
          Proceed
        </Button>
      </VStack>
    </Fragment>
  );
};

export default OTP;
