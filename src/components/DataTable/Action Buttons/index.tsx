import { IconButton, Tooltip } from "@chakra-ui/react";
import { ReactElement } from "react";

interface TableActionButtonProps {
  onClickAction: () => void;
  icon: ReactElement;
  label: string;
}
const TableActionButton = ({
  onClickAction,
  icon,
  label
}: TableActionButtonProps) => {
  return (
    <Tooltip label={label} placement={"top"}>
      <IconButton
        variant={"search"}
        aria-label={label}
        icon={icon}
        width={"24px"}
        height={"24px"}
        cursor={"pointer"}
        onClick={onClickAction}
      ></IconButton>
    </Tooltip>
  );
};

export default TableActionButton;
