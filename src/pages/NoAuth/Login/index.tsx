import { VStack, Text } from "@chakra-ui/react";

import AuthPageWrapper from "../../../components/AuthPageWrapper";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <AuthPageWrapper>
      <VStack alignItems="flex-start" gap={"4px"}>
        <Text fontSize="2xl" fontWeight="600" color="grey.800">
          Welcome Back!
        </Text>
        <Text fontWeight="400" fontSize="md" color="grey.700">
          Log in to your account for seamless remittance transactions
        </Text>
      </VStack>
      <LoginForm />
    </AuthPageWrapper>
  );
};

export default Login;
