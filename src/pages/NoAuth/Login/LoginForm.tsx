import {
  Button,
  Link as ChakraLink,
  HStack,
  IconButton,
  Stack,
  VStack,
  useBoolean
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckBox from "@neo/components/Form/Checkbox";
import TextInput from "@neo/components/Form/TextInput";
import { NAVIGATION_ROUTES } from "@neo/pages/App/navigationRoutes";
import loginSchema from "@neo/schema/auth/login";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { svgAssets } from "../../../assets/images/svgs/index";

const defaultValues = {
  email: "",
  password: "",
  remember: false
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useBoolean();
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema)
  });

  const handleLogin = () => {
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
          startIcon={<svgAssets.EmailIcon />}
          type="text"
          name="email"
          label={"Email"}
          control={control}
          isRequired
        />
        <TextInput
          startIcon={<svgAssets.PasswordIcon />}
          type={flag ? "text" : "password"}
          name="password"
          label={"Password"}
          control={control}
          isRequired
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
        <HStack justifyContent={"space-between"}>
          <CheckBox name="remember" label="Remember me" control={control} />
          <ChakraLink
            as={Link}
            to={NAVIGATION_ROUTES.FORGOT_PASSWORD}
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
