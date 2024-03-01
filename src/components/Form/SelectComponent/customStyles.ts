import { colorScheme } from "@neo/theme/colorScheme";
import { PropsValue, StylesConfig } from "react-select";
const fontSizes = {
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem"
};
const paddings = {
  sm: "6px 9px",
  md: "8px 12px",
  lg: "10px 15px"
};
const px = {
  sm: "0.75rem",
  md: "1rem",
  lg: "1rem"
};

export const useCustomStyles = (error?: any) => {
  const customStyles: StylesConfig = {
    // When disabled, react-select sets the pointer-state to none
    // which prevents the `not-allowed` cursor style from chakra
    // from getting applied to the Control
    container: (
      provided,
      { selectProps: { hideContainerBorder, isSingleTimeDropdown } }
    ) => ({
      ...provided,
      pointerEvents: "auto",
      flex: 1,
      width: isSingleTimeDropdown ? "60px" : "100%",
      borderColor: hideContainerBorder ? "white" : `${colorScheme.gray_200}`
    }),
    input: (provided, { selectProps: { size } }) => ({
      ...provided,
      color: "inherit",
      lineHeight: "inherit",
      fontSize: fontSizes[size ?? "sm"],
      height: "49px"
    }),
    menu: (provided, { selectProps: { isSingleTimeDropdown } }) => ({
      ...provided,
      display: "flex",
      flexDirection: "column",
      padding: "12px",
      gap: "8px",
      position: "absolute",
      right: 0,
      boxShadow: `0 0 0 1px ${colorScheme.gray_200}, 0 1px 1px ${colorScheme.gray_200}`,
      width: isSingleTimeDropdown ? "80px" : "327px",
      borderRadius: "12px",
      zIndex: 10
    }),
    option: (provided, { selectProps: { size } }) => ({
      ...provided,
      fontSize: fontSizes[size ?? "sm"]
    }),
    control: (
      provided,
      {
        selectProps: { hasInputAddon, isSingleTimeDropdown, inheritControlBG },
        isDisabled,
        isFocused
      }
    ) => ({
      ...provided,
      borderWidth: "2px",
      borderColor: error ? colorScheme.danger_500 : "inherit",
      ...(isDisabled && inheritControlBG ? { backgroundColor: "inherit" } : {}),
      "&:hover": {
        borderColor: error ? colorScheme.danger_600 : "inherit",
        backgroundColor: isSingleTimeDropdown
          ? `${colorScheme.gray_100}`
          : "inherit",
        ...(isDisabled
          ? {
              cursor: "not-allowed",
              backgroundColor: "gray.100"
            }
          : {}),
        placeholder: {
          backgroundColor: "gray.100"
        }
      },
      borderRadius: hasInputAddon ? "0px 6px 6px 0px" : "16px",
      flex: 1,
      boxShadow: isFocused
        ? error
          ? "none"
          : `0 0 0 1px ${colorScheme.primary_400}`
        : "none"
    }),
    dropdownIndicator: (provided, { selectProps: { hideDropdownArrow } }) => {
      if (hideDropdownArrow) {
        return {
          display: "none"
        };
      } else {
        return { ...provided };
      }
    },
    valueContainer: (
      provided,
      {
        selectProps: {
          size,
          formatOptionLabel,
          disableLeftPaddingInValueContainer,
          value,
          isMulti
        }
      }
    ) => {
      let padding = `0.125rem ${px[size ?? "sm"]}`;
      if (
        formatOptionLabel && isMulti
          ? (value as PropsValue<any>)?.length
          : value
      ) {
        padding = `0.125rem ${px[size ?? "sm"]}`;
      }
      if (disableLeftPaddingInValueContainer) {
        padding = `0.41rem 0 0.41rem 0.25rem`;
      }
      return {
        ...provided,
        padding,
        overflow: "visible"
      };
    },
    placeholder: (provided, state) => ({
      ...provided,
      padding: "0px 4px",
      position: "absolute",
      zIndex: 2,
      top: "17px",
      transition: "all 0.2s",
      borderRadius: 5,
      ...(state.isFocused || state.hasValue || state.selectProps.inputValue
        ? {
            background: "white",
            whiteSpace: "nowrap",
            transform: "translateX(-5%)",
            top: "-1px"
          }
        : {})
    }),

    multiValueRemove: (
      provided,
      { selectProps: { disableMultiValueRemove }, isDisabled }
    ) => ({
      ...provided,
      ...(isDisabled || disableMultiValueRemove
        ? {
            visibility: "hidden",
            width: "4px"
          }
        : {})
    }),
    multiValue: (
      provided,
      {
        selectProps: { hasInputAddon, hideSelectedValues, inheritMultiValueBG }
      }
    ) =>
      hasInputAddon
        ? {
            ...provided,
            borderRadius: "6px",
            backgroundColor: inheritMultiValueBG ? "inherit" : "#F1F3F6",
            padding: "4px 8px"
          }
        : hideSelectedValues
          ? { ...provided, display: "none" }
          : { ...provided },
    indicatorSeparator: () => ({
      display: "none"
    }),
    indicatorsContainer: provided => ({
      ...provided,
      color: colorScheme.gray_100,
      "&:hover": {
        color: colorScheme.gray_100
      }
    }),
    loadingMessage: (provided, { selectProps: { size } }) => {
      return {
        ...provided,
        fontSize: fontSizes[size ?? "sm"],
        padding: paddings[size ?? "sm"]
      };
    }
  };
  return customStyles;
};
