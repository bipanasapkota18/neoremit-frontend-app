import { HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { svgAssets } from "../../../assets/images/svgs/index";

interface ActionButtonsProps {
  onClickEdit: () => void;
  onClickDelete: () => void;
}
const ActionButtons = ({ onClickEdit, onClickDelete }: ActionButtonsProps) => {
  return (
    <HStack>
      <Tooltip label="Edit" placement={"top"}>
        <IconButton
          variant={"search"}
          aria-label="Edit"
          icon={<svgAssets.EditButton />}
          width={"24px"}
          height={"24px"}
          cursor={"pointer"}
          onClick={onClickEdit}
        ></IconButton>
      </Tooltip>
      <Tooltip label="Delete" placement={"top"}>
        <IconButton
          variant={"search"}
          aria-label="Delete"
          icon={<svgAssets.DeleteButton />}
          width={"24px"}
          height={"24px"}
          cursor={"pointer"}
          onClick={onClickDelete}
        ></IconButton>
      </Tooltip>
    </HStack>
  );
};

export default ActionButtons;
