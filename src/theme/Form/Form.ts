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
            ...activeLabelStyles
          }
        },
        "input:not(:placeholder-shown) + label, input:-webkit-autofill ~ label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
          {
            ...activeLabelStyles
          },
        label: {
          top: "28%",
          left: 0,
          position: "absolute",
          pointerEvents: "none",
          mx: 4,
          my: 2,
          transformOrigin: "left top",
          color: `${colorScheme.gray_700}`,
          backgroundColor: "white",
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "normal"
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
