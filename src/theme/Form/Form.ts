import { colorScheme } from "../colorScheme";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-12px)"
};

const Form = {
  variants: {
    floating: {
      container: {
        _focusWithin: {
          label: {
            ...activeLabelStyles,
            my: 2
          }
        },
        "input:not(:placeholder-shown) + label, input:-webkit-autofill ~ label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
          {
            ...activeLabelStyles
          },
        label: {
          top: 2.5,
          left: 0,
          zIndex: 2,
          color: `${colorScheme.gray_700}`,
          position: "absolute",
          backgroundColor: "white",
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "normal",
          pointerEvents: "none",
          mx: 1,
          padding: "0px 8px 0px 16px",
          my: 2,
          transformOrigin: "left top"
        }
      }
    }
  }
};

export const FormComponent = {
  components: {
    Form
  }
};
