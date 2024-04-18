import { VStack } from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";

const Banner = () => {
  return (
    <VStack>
      <svgAssets.LoginBanner />
    </VStack>
  );
};

export default Banner;
