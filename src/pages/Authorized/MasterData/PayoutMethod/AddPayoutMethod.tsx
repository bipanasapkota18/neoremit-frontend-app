import {
  Box,
  Button,
  GridItem,
  HStack,
  Heading,
  SimpleGrid
} from "@chakra-ui/react";
import Editor from "@neo/components/Editor";
import TextInput from "@neo/components/Form/TextInput";
import { colorScheme } from "@neo/theme/colorScheme";
import { useForm } from "react-hook-form";

const defaultValues = {
  paymentMethod: "",
  paymentDescription: "",
  payoutCode: ""
};
interface AddPayoutMethodProps {
  onClose: () => void;
}
const AddPayoutMethod = ({ onClose }: AddPayoutMethodProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const onAddPayoutMethod = () => {
    //
  };
  return (
    <form onSubmit={handleSubmit(onAddPayoutMethod)}>
      <Box display="flex" gap={"24px"} flexDir={"column"}>
        <Heading
          px={1}
          fontSize={"17px"}
          color={colorScheme.gray_700}
          fontWeight={700}
        >
          Add Payout Method
        </Heading>
        <SimpleGrid columns={3} spacing={"30px"}>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="paymentMethod"
              label="Enter Payout Method"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              size={"lg"}
              name="payoutCode"
              label="Enter Code"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
        </SimpleGrid>
        <HStack>
          <Editor control={control} name="paymentDescription" />
        </HStack>
        <HStack justifyContent={"flex-end"}>
          <Button
            padding={"16px 32px"}
            fontWeight={600}
            color={"#E53E3E"}
            _hover={{ bg: "#FFF5F5" }}
            bg={"#FFF5F5"}
            _active={{ bg: "#FFF5F5" }}
            fontSize={"17px"}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button padding={"10px 40px"} fontWeight={700} type="submit">
            Save
          </Button>
        </HStack>
      </Box>
    </form>
  );
};

export default AddPayoutMethod;
