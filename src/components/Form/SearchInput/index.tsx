import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Spinner
} from "@chakra-ui/react";
import { ReactComponent as SearchIcon } from "@neo/assets/images/svgs/search-icon.svg";
import { colorScheme } from "@neo/theme/colorScheme";
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
              <InputGroup h={"56px"}>
                <InputLeftElement color="#FFFFFF">
                  <IconButton
                    type="submit"
                    size="md"
                    variant={"search"}
                    aria-label={label ?? "label"}
                    disabled={extraProps.isDisabled}
                    icon={
                      isLoading ? (
                        <Spinner color="red" pos="absolute" size="md" />
                      ) : (
                        <SearchIcon width={18} height={18} />
                      )
                    }
                  />
                </InputLeftElement>
                <Input
                  autocapitalize="off"
                  autocomplete="off"
                  h={"98%"}
                  placeholder={label}
                  onChange={e => {
                    onSearch(e.target.value);
                    onChange(e);
                  }}
                  borderRadius={"30px"}
                  value={value}
                  type={type}
                  isInvalid={!!error}
                  errorBorderColor={colorScheme.danger_500}
                  backgroundColor="white"
                  disabled={disabled}
                  {...extraProps}
                />
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
      maxW={"800px !important"}
    >
      <InputGroup gap={"8px"} maxW={"800px"} h={"46px"}>
        <Input
          ml={0.5}
          pl={12}
          h={"100%"}
          placeholder={label}
          onChange={handleChange}
          value={value}
          type={type}
          errorBorderColor={colorScheme.danger_500}
          backgroundColor={colorScheme.gray_50}
          disabled={disabled}
          borderRadius={"30px"}
          onKeyDown={event => {
            if (event.key === "Enter") {
              onSearch(searchString);
            }
          }}
          {...extraProps}
        />

        <InputLeftElement padding=" 9px 8px 0px 26px" color="#FFFFFF" mr={2}>
          <IconButton
            type="submit"
            variant={"search"}
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
                <SearchIcon width={"24px"} height={"24px"} />
              )
            }
          />
        </InputLeftElement>
      </InputGroup>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
    </FormControl>
  );
};
export default SearchInput;
