import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { colorScheme } from "@neo/theme/colorScheme";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);
// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    borderRadius: "4px", // change the border radius
    borderColor: "blue.100" // change the border color,
  }
});

// const getCommonStyles = (arrowDownSvg: string | number | boolean) => ({
//   background: `url('data:image/svg+xml;utf8,${encodeURIComponent(
//     arrowDownSvg
//   )}')`,
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "100% 100%"
// });
// define custom variant
const variants = {
  outline: definePartsStyle({
    control: {
      background: colorScheme.primary[50],
      borderColor: colorScheme.primary[500],
      border: "1px solid"
    },
    container: {
      border: `1px solid ${colorScheme.gray_100}`,
      borderRadius: "8px",
      padding: "8px",
      width: "100%",
      _checked: {
        background: "btnBackground",
        borderColor: "primary.300",
        color: "primary.500"
      }
    }
  }),
  check: definePartsStyle({
    control: {
      border: "1px solid",
      _before: {
        background: "transparent!important"
      },

      //   _checked: {
      //     ...getCommonStyles(),
      //     _hover: {
      //       ...getCommonStyles()
      //     }
      //   },

      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%"
    }
  })
};

// export the component theme
export const RadioConfig = defineMultiStyleConfig({
  baseStyle,
  variants
});
