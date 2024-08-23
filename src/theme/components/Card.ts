import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    borderRadius: "16px",
    boxShadow: "0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
  }
});

// const sizes = {
//   md: definePartsStyle({
//     container: {
//       borderRadius: "0px"
//     }
//   })
// };

export const CardConfig = defineMultiStyleConfig({ baseStyle });
