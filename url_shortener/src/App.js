import './App.css';
import Header from "./header";
import Home from "./home";

import { ChakraProvider, Text, Box, Heading, Button } from "@chakra-ui/react";
import { List, ListItem, ListIcon, Spacer } from "@chakra-ui/react"
import MdCheckCircle from '@material-ui/icons/CheckCircle';

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Home />

      <Box margin="auto" marginTop="30px" p={10}  maxWidth="60%" borderWidth={5}   borderColor="blue"
        width="full"
        >   
        
        <Box maxW="32rem" align="center" margin="auto" paddingTop="10px">
          <Heading mb={4}>Create a free account to enjoy:</Heading>
          <Text fontSize="xl">
          <List spacing={3} align="center" >
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Easy Link Shortening
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Full Link History
                </ListItem>
          </List>
          </Text>
          <Button size="lg" colorScheme="green" mt="24px">
            Create a free account
          </Button>
      </Box>
        </Box>
        </ChakraProvider>

  );
}

export default App;
