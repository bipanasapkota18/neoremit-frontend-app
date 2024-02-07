import { colorScheme } from "@/theme/colorScheme";
import { Search2Icon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Spinner
} from "@chakra-ui/react";
import { debounce } from "lodash";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Control, Controller } from "react-hook-form";

interface SearchInputProps {
  name: string;
  control?: Control<any>;
  type: string;
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  disabled?: boolean;
  isControlled?: boolean;
  isLoading?: boolean;
  onSearch?: (data: string) => void;
  value?: string;
}
const SearchInput: React.FC<SearchInputProps & InputProps> = ({
  name,
  label,
  type,
  control,
  helperText,
  isRequired,
  disabled,
  isLoading,
  isControlled,
  value,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSearch = () => {},
  ...extraProps
}) => {
  const [searchString, setSearchString] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);

  const debouncedSearchFunction = useCallback((value: string) => {
    onSearch(value);
    setIsDebouncing(false);
  }, []);

  const debouncedOnSearch = useMemo(() => {
    return debounce(debouncedSearchFunction, 1000);
  }, [onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDebouncing(true);
    const value = e.target.value;
    setSearchString(value);
    debouncedOnSearch(value);
  };

  return isControlled ? (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <FormControl
              variant="floating"
              isRequired={!!isRequired}
              isInvalid={!!error}
              id={name}
              maxW={"350px !important"}
            >
              <InputGroup h={"46px"}>
                <Input
                  ml={0.5}
                  h={"98%"}
                  placeholder=" "
                  onChange={e => {
                    onSearch(e.target.value);
                    onChange(e);
                  }}
                  value={value}
                  type={type}
                  isInvalid={!!error}
                  errorBorderColor={colorScheme.danger_500}
                  backgroundColor="white"
                  disabled={disabled}
                  {...extraProps}
                />
                <FormLabel>{label}</FormLabel>

                <InputRightElement color="#FFFFFF" mr={2}>
                  <IconButton
                    type="submit"
                    top="6%"
                    size="md"
                    h={"85%"}
                    aria-label="customerCode"
                    disabled={extraProps.isDisabled}
                    icon={
                      isLoading ? (
                        <Spinner pos="absolute" size="md" />
                      ) : (
                        <Search2Icon width={18} height={18} />
                      )
                    }
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{error ? error?.message : ""}</FormErrorMessage>
              {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
            </FormControl>
          </>
        );
      }}
    />
  ) : (
    <FormControl
      variant="floating"
      isRequired={!!isRequired}
      id={name}
      maxW={"350px !important"}
    >
      <InputGroup maxW={"350px"} h={"46px"}>
        <Input
          ml={0.5}
          h={"98%"}
          placeholder=" "
          onChange={handleChange}
          value={value}
          type={type}
          errorBorderColor={colorScheme.danger_500}
          backgroundColor="white"
          disabled={disabled}
          onKeyDown={event => {
            if (event.key === "Enter") {
              onSearch(searchString);
            }
          }}
          {...extraProps}
        />
        <FormLabel>{label}</FormLabel>

        <InputRightElement color="#FFFFFF" mr={2}>
          <IconButton
            type="submit"
            top="6%"
            size="md"
            h={"85%"}
            aria-label="customerCode"
            onClick={() => onSearch(searchString)}
            disabled={extraProps.isDisabled}
            icon={
              isDebouncing ? (
                <Spinner pos="absolute" size="md" />
              ) : (
                <Search2Icon width={18} height={18} />
              )
            }
          />
        </InputRightElement>
      </InputGroup>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
    </FormControl>
  );
};
export default SearchInput;
