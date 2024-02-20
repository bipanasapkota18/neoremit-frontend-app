import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  PinInput
} from "@chakra-ui/react";
import React from "react";
import { Control, Controller } from "react-hook-form";
import OTPInput from "./OTPInput";
interface OTPProps {
  name: string;
  control: Control<any>;

  helperText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}
const OTPComponent = ({
  name,

  isDisabled,
  control,
  helperText,
  isRequired
}: OTPProps) => {
  const otpComponent = Array.from({ length: 5 }, (_, i) => (
    <OTPInput key={i} />
  ));

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <FormControl
              isRequired={!!isRequired}
              isInvalid={!!error}
              id={name}
              maxW={"350px !important"}
            >
              <Flex gap={"30px"}>
                <PinInput
                  placeholder=""
                  otp
                  value={value}
                  onChange={onChange}
                  isDisabled={isDisabled}
                >
                  {otpComponent}
                </PinInput>
              </Flex>
              <FormErrorMessage>{error ? error?.message : ""}</FormErrorMessage>
              {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
            </FormControl>
          </>
        );
      }}
    />
  );
};

export default OTPComponent;
