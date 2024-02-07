import { Button, Container, Flex, HStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
    >
      <Container p={8} bg="white" rounded="md" shadow="md">
        <Heading mb={4}>Home</Heading>
        <HStack spacing={4}>
          <Button onClick={() => navigate("/")}>Dashboard</Button>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </HStack>
      </Container>
    </Flex>
  );
}

export default Home;
