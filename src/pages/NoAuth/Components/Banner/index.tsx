import { Image, ScaleFade, VStack } from "@chakra-ui/react";

import { imageAssets } from "@neo/assets/images";

interface IBanner {
  screen: string;
}

const Banner = ({ screen }: IBanner) => {
  const SwitchBanner = () => {
    switch (screen) {
      case "otp":
        return (
          <ScaleFade initialScale={0.2} in={true}>
            <Image src={imageAssets.OTPBanner} />
          </ScaleFade>
        );
      case "passwordForm":
        return (
          <ScaleFade initialScale={0.1} in={true}>
            <Image src={imageAssets.SetPasswordBanner} />;
          </ScaleFade>
        );
      case "registerForm":
        return (
          <ScaleFade initialScale={0.2} in={true}>
            <Image src={imageAssets.ForgotPasswordBanner} />
          </ScaleFade>
        );
      default:
        return (
          <ScaleFade initialScale={0.1} in={true}>
            <Image src={imageAssets.LoginBanner} />
          </ScaleFade>
        );
    }
  };
  return <VStack>{SwitchBanner()}</VStack>;
};

export default Banner;
