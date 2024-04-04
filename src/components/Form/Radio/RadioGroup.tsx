import { Box } from "@chakra-ui/react";
import { useController } from "react-hook-form";
import CustomRadio from "./index";

interface CustomRadioGroupProps {
  name: string;
  options: { value: string; label: string }[];
  control: any;
}
function CustomRadioGroup({ name, options, control }: CustomRadioGroupProps) {
  const {
    field: { value, onChange }
  } = useController({
    name,
    control
  });

  return (
    <Box display={"flex"} gap={"16px"}>
      {options.map(option => (
        <CustomRadio
          key={option.value}
          value={option.value}
          onChange={onChange}
          checked={value === option.value}
        >
          {option.label}
        </CustomRadio>
      ))}
    </Box>
  );
}

export default CustomRadioGroup;
