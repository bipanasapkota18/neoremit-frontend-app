import { CheckIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { colorScheme } from "@neo/theme/colorScheme";
interface CustomRadioProps {
  value: string;
  onChange: (value: string) => void;
  checked: boolean;
  children: React.ReactNode;
}
function CustomRadio({ value, onChange, checked, children }: CustomRadioProps) {
  return (
    <Box as="label" display="flex" cursor="pointer">
      <input
        type="radio"
        value={value}
        onChange={() => onChange(value)}
        checked={checked}
        style={{ display: "none" }} // Hide the default radio button
      />
      <Box
        as={CheckIcon}
        bg={checked ? colorScheme.primary_400 : "#whites"} // Change background color based on checked state
        color={"white"} // Change color based on checked state
        boxSize={4}
        borderWidth="2px"
        borderRadius="3px"
        borderColor={"#A0AEC0"} // Change border color based on checked state
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        transition="all 0.2s"
        // _hover={{ borderColor: "green.300" }} // Change border color on hover
      />
      <Box ml={2}>{children}</Box>
    </Box>
  );
}

export default CustomRadio;
