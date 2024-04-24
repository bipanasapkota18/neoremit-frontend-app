import {
  Checkbox as ChakraCheckBox,
  CheckboxProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Text
} from "@chakra-ui/react";

import { Control, Controller } from "react-hook-form";

interface CheckBoxProps extends CheckboxProps {
  name: string;
  control: Control<any>;
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  width?: string;
}

const CheckBox = ({
  name,
  label,
  control,
  helperText,
  isRequired,
  width,
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
              width={width}
              maxW={"350px !important"}
            >
              <ChakraCheckBox
                fontWeight={400}
                fontSize={"14px"}
                isChecked={value}
                onChange={onChange}
                {...rest}
              >
                <Text color={"#2D3748"} fontSize={"14px"}>
                  {label}
                </Text>
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
