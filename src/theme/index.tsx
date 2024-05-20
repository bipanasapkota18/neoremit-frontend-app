import { extendTheme } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";
import { FormComponent } from "./Form/Form";
import { RadioConfig } from "./Form/Radio";
import { colorScheme } from "./colorScheme";
import { ButtonConfig } from "./components/Button";
import { CheckboxConfig } from "./components/Checkbox";
import InputConfig from "./components/Input";
import SwitchConfig from "./components/Switch";
import { TableConfig } from "./components/Table";
export { globalStyles } from "./global";

export const theme = extendTheme(
  {
    fonts: {
      heading: "Mulish",
      body: "Mulish"
    },
    shadows: { outline: "0 0 0 3px var(--chakra-colors-purple-100)" },
    components: {
      Button: ButtonConfig,
      Input: InputConfig,
      Table: TableConfig,
      Switch: SwitchConfig,
      Radio: RadioConfig,
      Checkbox: CheckboxConfig,
      Steps
    },
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
  },
  FormComponent
);
