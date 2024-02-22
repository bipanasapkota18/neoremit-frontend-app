import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

import { colorScheme } from "../colorScheme";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    border: "1px solid",
    borderColor: colorScheme.input_border,
    borderRadius: "16px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "22px",
    color: colorScheme.gray_700,
    _hover: {
      border: "1px solid",
      borderColor: `${colorScheme.input_border} !important`
    },
    _focus: {
      boxShadow: "none !important",
      borderColor: `${colorScheme.input_border} !important`
    },
    _disabled: {
      // backgroundColor: `${colorScheme.disabled} !important`
    },
    _groupInvalid: {
      boxShadow: "none !important"
    },
    _placeholder: {
      color: "black"
    }
  },
  sizes: {
    sm: {
      padding: "8px 16px"
    },
    md: {
      padding: "12px 16px"
    }
  }
});

const sm = defineStyle({
  p: "8px 16px"
});
const md = defineStyle({
  p: "12px 16px"
});
const lg = defineStyle({
  p: 4,
  minHeight: "56px"
});

const sizes = {
  sm: definePartsStyle({ field: sm, addon: sm }),
  md: definePartsStyle({ field: md, addon: md }),
  lg: definePartsStyle({ field: lg, addon: lg })
};

const Input = defineMultiStyleConfig({ baseStyle, sizes });

export default Input;
