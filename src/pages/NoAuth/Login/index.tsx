import { HStack, Text, VStack } from "@chakra-ui/react";

import { colorScheme } from "@neo/theme/colorScheme";
import AuthPageWrapper from "../Components/AuthPageWrapper";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <AuthPageWrapper>
      <VStack alignItems="flex-start" gap={"4px"}>
        <HStack gap={"12px"}>
          <Text fontSize="2xl" fontWeight="600" color={colorScheme.gray_800}>
            Welcome {localStorage.getItem("email") ? "Back" : ""}
          </Text>
          <Text fontSize={"24px"} lineHeight={"30.12px"}>
            &#128075;
          </Text>
        </HStack>
        <Text fontWeight="400" fontSize="md" color={colorScheme.gray_700}>
          Log in to your account for seamless remittance transactions
        </Text>
      </VStack>
      <LoginForm />
    </AuthPageWrapper>
  );
};

export default Login;
