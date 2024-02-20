import { Button, IconButton } from "@chakra-ui/react";
import { svgAssets } from "../../assets/images/svgs/index";

const GoBack = ({ onClick, isIcon }: GoBackProps) => {
  return isIcon ? (
    <IconButton
      borderRadius={"8px"}
      padding={"8px"}
      icon={<svgAssets.ArrowLeftIcon />}
      aria-label="Go Back"
      onClick={onClick}
      variant={"light"}
    ></IconButton>
  ) : (
    <Button
      leftIcon={<svgAssets.ArrowLeftIcon />}
      variant={"light"}
      onClick={onClick}
    >
      Go Back
    </Button>
  );
};

type GoBackProps = {
  onClick: () => void;
  isIcon?: boolean;
};

export default GoBack;
