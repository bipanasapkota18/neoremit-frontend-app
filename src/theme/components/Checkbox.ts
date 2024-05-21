import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { colorScheme } from "../colorScheme";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  label: {
    pt: 1
  },
  control: {
    borderColor: "#A0AEC0",
    height: "20px",
    width: "20px",
    padding: 2,
    borderRadius: 6,
    backgroundColor: "white",
    _checked: {
      backgroundColor: colorScheme.primary_500,
      borderColor: colorScheme.primary_500,
      _hover: {
        backgroundColor: colorScheme.primary_500,
        borderColor: colorScheme.primary_500
      }
    }
  }
});

export const CheckboxConfig = defineMultiStyleConfig({ baseStyle });
