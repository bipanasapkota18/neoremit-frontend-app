import { ComponentStyleConfig, theme as ChakraTheme } from "@chakra-ui/react";
import { colorScheme } from "../colorScheme";

export const ButtonConfig: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 500,
    borderRadius: 8,
    padding: 2,
    lineHeight: 0,
    px: 20
  },
  variants: {
    default: props => ({
      ...ChakraTheme.components.Button.variants?.solid(props),
      bg: colorScheme.primary_400,
      letterSpacing: "0.4px",
      lineHeight: 0,
      color: colorScheme.button_color,
      borderRadius: "30px",
      height: "52px",
      padding: "20px, 0px, 20px, 0px",

      _hover: {
        bg: colorScheme.purple_600,
        _disabled: {
          bg: colorScheme.purple_400
        }
      },
      _active: {
        bg: colorScheme.purple_400
      }
    })
  },

  defaultProps: {
    size: "md",
    variant: "default"
  }
};
