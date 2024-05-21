import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  label: {
    fontFamily: "mono", // change the font family of the label
    color: "#2D3748"
  },

  control: {
    padding: 2,
    borderRadius: "4px",
    width: "20px",
    height: "20px",
    color: "#A0AEC0",
    _checked: {
      bg: "#5A2F8D",
      borderColor: "##A0AEC0"
    }
  }
});

export const checkboxTheme = defineMultiStyleConfig({ baseStyle });
