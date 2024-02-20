import { theme as ChakraTheme, ComponentStyleConfig } from "@chakra-ui/react";
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
    }),
    light: () => ({
      background: colorScheme.btn_background,
      color: colorScheme.primary_400,
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "17.57px"
    }),
    filter: () => ({
      background: colorScheme.filter_btn,
      borderRadius: "30px",
      padding: "14px 32px",
      color: colorScheme.primary_400,
      fontSize: "17px",
      display: "flex",
      gap: "8px",
      fontWeight: 600,
      lineHeight: "normal"
    }),
    search: () => ({
      // bg: colorScheme.primary_400,
      color: colorScheme.search_icon,
      display: "flex",
      width: "24px",
      height: "24px",
      justifyContent: "center",
      alignItems: "center"
    })
  },

  defaultProps: {
    size: "md",
    variant: "default"
  }
};
