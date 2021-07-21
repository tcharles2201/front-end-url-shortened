import React from 'react';
import './App.css';
import Header from "./header";
import  Home  from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';

import { ChakraProvider, Text, Box, Heading, Button } from "@chakra-ui/react";
import { List, ListItem, ListIcon } from "@chakra-ui/react"
import MdCheckCircle from '@material-ui/icons/CheckCircle';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider>
      <Header />
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        {/* <Route exact path="/login" component={SignIn} /> */}
      </Switch>
    </BrowserRouter>

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
