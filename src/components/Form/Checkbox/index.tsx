import {
  Checkbox as ChakraCheckBox,
  FormControl,
  FormErrorMessage,
  FormHelperText
} from "@chakra-ui/react";

import { Control, Controller } from "react-hook-form";

interface CheckBoxProps {
  name: string;
  control: Control<any>;
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  width?: string;
  isChecked?: boolean;
}

const CheckBox = ({
  name,
  label,
  control,
  helperText,
  isRequired,
  width,
  isChecked
}: CheckBoxProps) => {
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
              width={width}
              maxW={"350px !important"}
            >
              <ChakraCheckBox
                isChecked={isChecked}
                fontWeight={400}
                fontSize={"14px"}
                checked={value}
                onChange={onChange}
              >
                {label}
              </ChakraCheckBox>
              <FormErrorMessage>{error ? error?.message : ""}</FormErrorMessage>
              {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
            </FormControl>
          </>
        );
      }}
    />
  );
};

export default CheckBox;
