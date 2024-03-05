import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { colorScheme } from "../colorScheme";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {},

  track: {
    display: "flex",
    alignItems: "center",
    borderRadius: "100px",
    background: "#E2E8F0",
    _checked: {
      background: colorScheme.primary_400
    }
  },
  thumb: {
    borderRadius: "24px",
    marginLeft: "2.5px",
    height: "19px",
    width: "20px"
  }
});

const Switch = defineMultiStyleConfig({
  baseStyle
});

export default Switch;
