import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  HStack,
  Link as ChakraLink,
  Stack,
  VStack
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/Form/TextInput";
import loginSchema from "@/schema/auth/login";
import CheckBox from "@/components/Form/Checkbox";

const defaultValues = {
  email: "",
  password: "",
  remember: false
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema)
  });

  const handleLogin = (data: any) => {
    console.log(data);
    navigate("/");
  };

  return (
    <VStack
      as="form"
      alignItems={"stretch"}
      justifyContent={"flex-start"}
      gap={8}
      onSubmit={handleSubmit(handleLogin)}
    >
      <Stack gap={"16px"} width={"100%"}>
        <TextInput
          type="text"
          name="email"
          label={"Email"}
          control={control}
          isRequired
        />
        <TextInput
          type="password"
          name="password"
          label={"Password"}
          control={control}
          isRequired
        />
        <HStack justifyContent={"space-between"}>
          <CheckBox name="remember" label="Remember me" control={control} />
          <ChakraLink
            as={Link}
            // to={ROUTES.AUTH.FORGOT_PASSWORD}
            whiteSpace={"nowrap"}
            fontWeight={"500"}
            color="primary.500"
          >
            Forgot Password ?
          </ChakraLink>
        </HStack>
      </Stack>
      <Button type="submit" size="lg">
        Login
      </Button>
      {/* <Text as="div" textAlign="center" pt={0.5} fontWeight="500">
        Don't have an account ?
        <ChakraLink
          as={Link}
          to={ROUTES.AUTH.REGISTER}
          ml={2}
          lineHeight={2}
          color={"primary.400"}
          textDecoration="underline"
          textUnderlineOffset={6}
        >
         Register
        </ChakraLink>
      </Text> */}
    </VStack>
  );
};

export default LoginForm;
