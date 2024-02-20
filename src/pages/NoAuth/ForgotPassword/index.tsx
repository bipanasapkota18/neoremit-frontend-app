import { HStack, Image, Stack } from "@chakra-ui/react";
import { imageAssets } from "@neo/assets/images";
import GoBack from "@neo/components/Button/GoBack";
import { NAVIGATION_ROUTES } from "@neo/pages/App/navigationRoutes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPageWrapper from "../Components/AuthPageWrapper";
import OTP from "../Components/Otp";
import SetPassword from "../Components/SetPassword";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [screen, setScreen] = useState("registerForm");
  const SwitchComponent = () => {
    switch (screen) {
      case "otp":
        return <OTP type="forgot" setScreen={setScreen} />;
      case "passwordForm":
        return <SetPassword />;
      default:
        return <ForgotPasswordForm setScreen={setScreen} />;
    }
  };
  return (
    <AuthPageWrapper isPassword screen={screen}>
      <Stack gap={"32px"} width="100%">
        <HStack>
          <GoBack
            onClick={() => {
              if (screen === "otp") {
                setScreen("registerForm");
              } else if (screen === "passwordForm") {
                setScreen("otp");
              } else if (screen === "registerForm") {
                navigate(NAVIGATION_ROUTES.LOGIN);
              }
            }}
          />
        </HStack>
        <HStack justifyContent={"space-between"} alignItems={"flex-start"}>
          <Image src={imageAssets.Logo} />
        </HStack>
        {SwitchComponent()}
      </Stack>
    </AuthPageWrapper>
  );
};

export default ForgotPassword;
