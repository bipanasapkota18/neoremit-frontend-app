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
        bg: colorScheme.gray_50
      },
      tbody: {
        tr: {
          whiteSpace: "nowrap",
          fontWeight: 500,
          fontSize: "14px",
          color: colorScheme.gray_700,
          td: {
            "&:first-of-type": {
              borderLeft: "none"
            },
            "&:last-of-type": {
              borderRight: "none"
            }
          }
        }
      }
    }
  },
  defaultProps: {
    size: "md",
    variant: "defaultTable"
  }
};
