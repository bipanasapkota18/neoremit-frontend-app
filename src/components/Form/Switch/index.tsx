import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Switch,
  SwitchProps
} from "@chakra-ui/react";
import { colorScheme } from "@neo/theme/colorScheme";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface SwitchInputProps {
  name: string;
  control?: Control<any>;
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  disabled?: boolean;
}
const SwitchInput: React.FC<SwitchInputProps & SwitchProps> = ({
  name,
  control,
  label,
  helperText,
  isRequired,
  disabled,
  ...extraProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <FormControl
            display="flex"
            alignItems="center"
            id={name}
            isRequired={!!isRequired}
            isInvalid={!!error}
          >
            <FormLabel mb={0} ml={2} cursor={"pointer"}>
              {label}
            </FormLabel>
            <Switch
              id={name}
              placeholder=" "
              height={"inherit"}
              onChange={onChange}
              isChecked={value}
              isInvalid={!!error}
              errorBorderColor={colorScheme.danger_500}
              disabled={disabled}
              {...extraProps}
            />

            <FormErrorMessage>{error ? error?.message : ""}</FormErrorMessage>
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
          </FormControl>
        );
      }}
    />
  );
};
export default SwitchInput;
