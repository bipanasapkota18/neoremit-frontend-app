import { Center, HStack, Image, Stack, VStack } from "@chakra-ui/react";
import { imageAssets } from "@neo/assets/images";
import { svgAssets } from "@neo/assets/images/svgs";
import React from "react";
// import Banner from "../Banner";

interface IChildrenType {
  children: React.ReactNode;
  hasSideDiv?: boolean;
}
const AuthPageWrapper = ({ children, hasSideDiv = true }: IChildrenType) => {
  return (
    <Center
      position="relative"
      backgroundColor="#F7FAFC"
      height="100vh"
      backgroundImage={`url(${imageAssets.Background})`}
      backgroundPosition={"-100% 100%"}
      backgroundRepeat={"no-repeat"}
      objectFit={"cover"}
    >
      <Stack
        zIndex={1}
        gap={0}
        direction="row"
        alignItems={hasSideDiv ? "center" : "flex-start"}
        justifyContent={hasSideDiv ? "center" : "left"}
        margin="0 auto"
        padding={"42px, 64px, 42px, 64px"}
        boxShadow={hasSideDiv ? "lg" : "none"}
        borderRadius={"16px"}
        width="1120px"
        // height="616px"
        bg="white"
      >
        {hasSideDiv ? (
          <>
            <HStack
              width="50%"
              py={16}
              px={{
                base: 14,
                "2xl": 20
              }}
            >
              <svgAssets.LoginBanner />
            </HStack>
            <HStack>
              <svgAssets.Line height={"400px"} />
            </HStack>
            <VStack
              alignItems={"stretch"}
              gap={"32px"}
              width="50%"
              py={16}
              px={{
                base: 14,
                "2xl": 20
              }}
            >
              <HStack
                justifyContent={"space-between"}
                alignItems={"flex-start"}
              >
                <Image src={imageAssets.Logo} />

                {/* <LanguageToggle /> */}
              </HStack>
              {children}
            </VStack>
          </>
        ) : (
          <Stack width="100%" p={16}>
            {children}
          </Stack>
        )}
      </Stack>
    </Center>
  );
};

export default AuthPageWrapper;
