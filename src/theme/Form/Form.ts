const activeLabelStyles = {
  transform: "scale(0.85) translateY(-30px)"
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
          top: 1,
          left: 0,
          zIndex: 2,
          color: "gray.500",
          position: "absolute",
          backgroundColor: "white",
          pointerEvents: "none",
          mx: 3,
          px: 1,
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
