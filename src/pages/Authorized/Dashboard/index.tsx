import { Button, Container, Flex, HStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
    >
      <Container p={8} bg="white" rounded="md" shadow="md">
        <Heading mb={4}>Dashboard</Heading>
        <HStack spacing={4}>
          <Button colorScheme="blue" onClick={() => navigate("/home")}>
            Home
          </Button>
          <Button colorScheme="blue" onClick={() => navigate("/login")}>
            Login
          </Button>
        </HStack>
      </Container>
    </Flex>
  );
}

export default Dashboard;
