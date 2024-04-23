import {
  Checkbox as ChakraCheckBox,
  CheckboxProps,
  FormControl,
  FormErrorMessage,
  FormHelperText
} from "@chakra-ui/react";

import { Control, Controller } from "react-hook-form";

interface CheckBoxProps extends CheckboxProps {
  name: string;
  control: Control<any>;
  label?: string;
  helperText?: string;
  isRequired?: boolean;
}

const CheckBox = ({
  name,
  label,
  control,
  helperText,
  isRequired,
  ...rest
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
              maxW={"350px !important"}
            >
              <ChakraCheckBox
                fontWeight={400}
                fontSize={"14px"}
                isChecked={value}
                onChange={onChange}
                {...rest}
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
