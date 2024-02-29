import { Button } from "@chakra-ui/react";
import { svgAssets } from "../../assets/images/svgs/index";

const FilterButton = ({ onClick }: GoBackProps) => {
  return (
    <Button
      minW={"max-content"}
      leftIcon={<svgAssets.Filter width={"24px"} height={"24px"} />}
      onClick={onClick}
      variant={"filter"}
    >
      Filter
    </Button>
  );
};
type GoBackProps = {
  onClick: () => void;
};
export default FilterButton;
