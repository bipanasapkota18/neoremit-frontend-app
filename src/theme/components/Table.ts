import { ComponentStyleConfig } from "@chakra-ui/react";
import { colorScheme } from "../colorScheme";
export const TableConfig: ComponentStyleConfig = {
  sizes: {
    md: {
      th: {
        px: 4,
        py: 4
      }
    }
  },
  variants: {
    defaultTable: {
      th: {
        userSelect: "none",
        whiteSpace: "nowrap",
        position: "relative",
        color: colorScheme.gray_800,
        fontSize: "14px",
        fontWeight: 700,
        fontStyle: "normal",
        bg: colorScheme.column_heading
        // "&:first-of-type": {
        //   borderTopLeftRadius: 6
        // },
        // "&:last-child": {
        //   borderTopRightRadius: 6
        // }
      },
      tbody: {
        tr: {
          whiteSpace: "nowrap",
          fontWeight: 500,
          fontSize: "14px",
          color: colorScheme.gray_700,
          td: {
            // border: "1px solid",
            // borderColor: colorScheme.gray_100,
            p: 3,
            "&:first-of-type": {
              borderLeft: "none"
            },
            "&:last-of-type": {
              borderRight: "none"
            }
          }
          // "&:nth-of-type(odd)": {
          //   ...ChakraTheme.components.Table.variants?.striped(props).tbody.tr[
          //     "&:nth-of-type(odd)"
          //   ],
          //   td: {
          //     background: "white"
          //   }
          //   // "&:hover": {
          //   //   td: {
          //   //     background: colorScheme.purple_100
          //   //   }
          //   // }
          // }
          // "&:nth-of-type(even)": {
          //   td: {
          //     background: colorScheme.purple_50
          //   },
          //   "&:hover": {
          //     td: {
          //       background: colorScheme.purple_100
          //     }
          //   }
          // }
        }
      }
    }
    // printTable: {
    //   th: {
    //     userSelect: "none",
    //     whiteSpace: "nowrap",
    //     position: "relative",
    //     // border: "1px solid white",
    //     color: colorScheme.purple_600,
    //     textTransform: "capitalize",
    //     textAlign: "center",
    //     fontSize: "15px",
    //     bg: colorScheme.purple_100
    //     // "&:first-of-type": {
    //     //   borderTopLeftRadius: 6
    //     // },
    //     // "&:last-child": {
    //     //   borderTopRightRadius: 6
    //     // }
    //   },
    //   tbody: {
    //     tr: {
    //       whiteSpace: "nowrap",
    //       color: colorScheme.gray_600,
    //       td: {
    //         textAlign: "center",
    //         // border: "1px solid",
    //         // borderColor: colorScheme.gray_100,
    //         p: 3,
    //         "&:first-of-type": {
    //           borderLeft: "none"
    //         },
    //         "&:last-of-type": {
    //           borderRight: "none"
    //         }
    //       }
    //       // "&:nth-of-type(odd)": {
    //       //   ...ChakraTheme.components.Table.variants?.striped(props).tbody.tr[
    //       //     "&:nth-of-type(odd)"
    //       //   ],
    //       //   td: {
    //       //     background: "white"
    //       //   },
    //       //   "&:hover": {
    //       //     td: {
    //       //       background: colorScheme.purple_100
    //       //     }
    //       //   }
    //       // }
    //       // "&:nth-of-type(even)": {
    //       //   td: {
    //       //     background: colorScheme.purple_50
    //       //   },
    //       //   "&:hover": {
    //       //     td: {
    //       //       background: colorScheme.purple_100
    //       //     }
    //       //   }
    //       // }
    //     }
    //   }
    // }
  },
  defaultProps: {
    size: "md",
    variant: "defaultTable"
  }
};
