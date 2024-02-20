import { colorScheme } from "@neo/theme/colorScheme";
import { PinInputField } from "@chakra-ui/react";

const OTPInput = () => {
  return (
    <PinInputField
      textAlign={"center"}
      width="48px"
      height="48px"
      borderRadius="8px"
      border={`1px solid ${colorScheme.primary_400}`}
      _focus={{
        outline: "none"
      }}
      background={colorScheme.gray_100}
    />
  );
};

export default OTPInput;
