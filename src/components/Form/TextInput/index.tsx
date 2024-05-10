import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Textarea,
  TextareaProps
} from "@chakra-ui/react";
import { imageAssets } from "@neo/assets/images";
import { colorScheme } from "@neo/theme/colorScheme";
import React from "react";
import { Control, Controller } from "react-hook-form";
interface TextInputProps {
  name: string;
  control: Control<any>;
  type: string;
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  startIcon?: React.ReactNode;
  endIcons?: React.ReactNode;
  disabled?: boolean;
  onIconClick?: () => void;
  variant?: string;
  noFloating?: boolean;
  colorInput?: boolean;
  required?: boolean;
}
const TextInput: React.FC<TextInputProps & InputProps & TextareaProps> = ({
  name,
  control,
  label,
  type,
  helperText,
  isRequired,
  startIcon,
  disabled,
  endIcons,
  onIconClick,
  variant,
  noFloating,
  colorInput,
  required,
  ...extraProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const color = e.target.value;
          onChange(color); // Update the field value with the selected color
        };

        return (
          <>
            <FormControl
              variant={noFloating ? "default" : "floating"}
              id={name}
              isRequired={!!isRequired}
              isInvalid={!!error}
            >
              <InputGroup height={type !== "textarea" ? "46px" : "auto"}>
                {colorInput ? (
                  <InputRightElement top="6%" right="2%">
                    <Input
                      autocapitalize="off"
                      autocomplete="off"
                      placeholder={label}
                      type={"color"}
                      p={0}
                      border={"none"}
                      onChange={handleColorChange}
                      value={value ?? ""}
                      errorBorderColor={colorScheme.danger_500}
                      disabled={disabled}
                      boxShadow="none !important"
                      {...extraProps}
                    />
                  </InputRightElement>
                ) : startIcon ? (
                  <InputLeftElement
                    marginRight={"25px !important"}
                    top="20%"
                    pointerEvents="none"
                    onClick={onIconClick}
                  >
                    {startIcon}
                  </InputLeftElement>
                ) : null}
                {type == "textarea" ? (
                  <Textarea
                    paddingLeft={startIcon ? 9 : ""}
                    placeholder={label}
                    height={"inherit"}
                    onChange={onChange}
                    value={value ?? ""}
                    isInvalid={!!error}
                    errorBorderColor={colorScheme.danger_500}
                    boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.12)"
                    disabled={disabled}
                    variant={variant}
                    {...extraProps}
                  />
                ) : (
                  <Input
                    autocapitalize="off"
                    autocomplete="off"
                    paddingLeft={startIcon ? 9 : ""}
                    paddingBottom={startIcon ? "" : 0}
                    placeholder={""}
                    type={type}
                    height={"inherit"}
                    onChange={onChange}
                    onWheel={e => {
                      const target = e.target as HTMLInputElement;
                      type == "number" && target.blur();
                    }}
                    value={value ?? ""}
                    isInvalid={!!error}
                    errorBorderColor={colorScheme.danger_500}
                    disabled={disabled}
                    variant={variant}
                    boxShadow="none !important"
                    css={{
                      "&::-webkit-calendar-picker-indicator": {
                        color: "rgba(0, 0, 0, 0)",
                        opacity: 1,
                        display: "block",
                        width: "20px",
                        height: "20px",
                        borderWidth: "thin",
                        borderStyle: "solid",
                        backgroundImage: `url(${imageAssets.CalendarIcon})`
                      }
                    }}
                    {...extraProps}
                  />
                )}
                {!noFloating && (
                  <FormLabel position={"absolute"} left={"60px"}>
                    {label}
                    {required && (
                      <span style={{ color: "red", marginLeft: 4 }}>*</span>
                    )}
                  </FormLabel>
                )}
                {endIcons ? (
                  <InputRightElement onClick={onIconClick} top="20%">
                    {endIcons}
                  </InputRightElement>
                ) : (
                  ""
                )}
              </InputGroup>

              <FormErrorMessage ml={2} paddingTop={2}>
                {error ? error?.message : ""}
              </FormErrorMessage>
              {helperText ? (
                <FormHelperText color={colorScheme.sideBar_text} mt={0} ml={2}>
                  {helperText}
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          </>
        );
      }}
    />
  );
};
export default TextInput;
