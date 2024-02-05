import { extendTheme } from "@chakra-ui/react";
import { colorScheme } from "./colorScheme";

export { globalStyles } from "./global";

export const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins"
  },
  shadows: { outline: "0 0 0 3px var(--chakra-colors-purple-100)" },
  components: {},
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px"
  },
  styles: {
    global: {
      scrollbarGutter: "stable",
      "&::-webkit-scrollbar": {
        width: "0.2rem",
        height: "0.6rem",
        position: "absolute"
      },
      "&::-webkit-scrollbar-track": {
        position: "absolute",
        background: "#fff",
        opacity: 0.1
      },
      "&::-webkit-scrollbar-thumb": {
        background: colorScheme.scrollBar_100,
        borderRadius: 20
      }
    }
  }
});
