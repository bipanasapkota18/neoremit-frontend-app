import { Center, Text, VStack } from "@chakra-ui/react";
import { ReactComponent as DataNotFoundSvg } from "@neo/assets/images/svgs/DataNotFound.svg";
import { colorScheme } from "@neo/theme/colorScheme";

interface props {
  title?: string;
  message?: string;
}

export const ResultNotFound = ({ title }: props) => {
  return (
    <Center height="100%" alignItems="center" pt={20} pb={10}>
      <VStack spacing={2}>
        <Text fontSize="xl" color={colorScheme.gray_700} fontWeight={500}>
          {title ?? "No Data Available !!"}
        </Text>
        <DataNotFoundSvg height="300px" width="300px" />

        {/* <Text fontSize="lg" color="gray.500">
          {message ?? "There seems to be no data for what you are looking for."}
        </Text> */}
      </VStack>
    </Center>
  );
};
