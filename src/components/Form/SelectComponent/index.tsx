import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText
} from "@chakra-ui/react";

import { ISelectOptions } from "@neo/utility/format";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  ActionMeta,
  GroupBase,
  OnChangeValue,
  OptionsOrGroups,
  Props,
  default as ReactSelect,
  components
} from "react-select";
import { useCustomStyles } from "./customStyles";

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }: any) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.selectProps.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child: any) =>
        child && child.key !== "placeholder" ? child : null
      )}
    </ValueContainer>
  );
};

declare module "react-select/dist/declarations/src/Select" {
  export interface Props<
    Option,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    IsMulti extends boolean,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Group extends GroupBase<Option>
  > {
    size?: "sm" | "md" | "lg";
    /** If the Select Component has Custom Label Component */
    helperText?: string;
    hasInputAddon?: boolean;
    hideDropdownArrow?: boolean;
    hideSelectedValues?: boolean;
    hideContainerBorder?: boolean;
    isSingleTimeDropdown?: boolean;
    disableLeftPaddingInValueContainer?: boolean;
    isParticipantGroupContainer?: boolean;
    inheritMultiValueBG?: boolean;
    disableMultiValueRemove?: boolean;
    inheritControlBG?: boolean;
    isFocused?: boolean;
  }
}

type SelectProps = Props & {
  size?: "sm" | "md" | "lg";
  name: string;
  control?: Control<any>;
  nonControlled?: boolean;
  customOnChange?: () => void;
  selectAllOptions?: {
    hasSelectAll: boolean;
    returnOne?: boolean;
  };
  required?: boolean;
};

export const selectAllOption = { label: "Select all", value: "*" };

function Select({
  size = "sm",
  control,
  name,
  isMulti,
  helperText,
  nonControlled,
  value,
  selectAllOptions = {
    hasSelectAll: false,
    returnOne: false
  },

  customOnChange,
  ...args
}: SelectProps) {
  const [focused, setFocused] = useState(false);
  const customStyles = useCustomStyles();
  let options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
  if (selectAllOptions?.hasSelectAll) {
    options = [selectAllOption, ...(args?.options ?? [])];
    options = Array.from(options);
  }
  return nonControlled ? (
    <Box w={"100%"}>
      <FormControl variant="floating" id={name}>
        <ReactSelect
          components={{
            ValueContainer: (props: any) =>
              CustomValueContainer({ props: props, required: args.required })
          }}
          closeMenuOnSelect={!isMulti}
          styles={{
            ...customStyles
          }}
          size={size}
          isMulti={isMulti}
          {...args}
          isFocused={focused}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
        />
      </FormControl>
    </Box>
  ) : (
    <Box w={"100%"}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const customStyles = useCustomStyles(error);
          const onChangeHandler = (
            newValue: OnChangeValue<any, boolean>,
            actionMeta: ActionMeta<unknown>
          ) => {
            const defaultOnChange = (
              value: ISelectOptions<number | string>[]
            ) => {
              field.onChange(value, actionMeta);
              args.onChange && args.onChange(value, actionMeta);
              customOnChange && customOnChange();
            };

            // const hasSelectAllOption =
            //   newValue?.includes(selectAllOption) &&
            //   newValue[newValue.length - 1].value != "*";
            const isAllSelected = newValue?.length == args?.options?.length;
            const lastValue = newValue[newValue.length - 1]?.value;
            const allOptions =
              args?.options?.map((option: any) => option) ?? [];

            if (
              selectAllOptions?.hasSelectAll &&
              newValue !== null &&
              newValue.length > 0
            ) {
              if (isAllSelected) {
                defaultOnChange([selectAllOption]);
              }

              if (lastValue === "*") {
                if (selectAllOptions?.returnOne)
                  return defaultOnChange([selectAllOption]);
                return defaultOnChange(allOptions);
              }
              if (
                newValue.find(
                  (item: typeof selectAllOption) => item.value == "*"
                )
              ) {
                return defaultOnChange(
                  newValue?.filter(
                    (item: typeof selectAllOption) => item.value != "*"
                  )
                );
              }
            }
            return defaultOnChange(newValue);
          };

          return (
            <>
              <FormControl variant="floating" id={name} isInvalid={!!error}>
                <ReactSelect
                  components={{
                    ValueContainer: CustomValueContainer
                  }}
                  closeMenuOnSelect={!isMulti}
                  {...field}
                  styles={{
                    ...customStyles
                  }}
                  size={size}
                  isMulti={isMulti}
                  {...args}
                  options={
                    selectAllOptions?.hasSelectAll ? options : args?.options
                  }
                  onChange={onChangeHandler}
                  isFocused={focused}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder={
                    args.required ? (
                      <>
                        {" "}
                        {args.placeholder}{" "}
                        <span style={{ color: "red", marginLeft: 4 }}>*</span>
                      </>
                    ) : (
                      args.placeholder
                    )
                  }
                />

                <FormErrorMessage>
                  {error ? error?.message : ""}
                </FormErrorMessage>
                {helperText ? (
                  <FormHelperText>
                    <Alert status="warning">
                      <AlertIcon />
                      {helperText}
                    </Alert>
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </>
          );
        }}
      />
    </Box>
  );
}

export default Select;
