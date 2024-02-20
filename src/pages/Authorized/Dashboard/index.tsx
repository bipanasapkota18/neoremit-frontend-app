import { Button, Container, HStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <Container bg="white" height={"20vh"} rounded="md" shadow="md">
      <Heading mb={4}>Dashboard</Heading>
      <HStack spacing={4}>
        <Button colorScheme="blue" onClick={() => navigate("/login")}>
          Login
        </Button>
      </HStack>
    </Container>
  );
}

export default Dashboard;
