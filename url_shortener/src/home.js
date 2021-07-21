import React from "react";
import { Button , Spacer, Text, Input} from "@chakra-ui/react"
import { Heading, InputGroup, Box, InputRightElement } from "@chakra-ui/react"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const Home = (props) => {

  return (
     
        <Box margin="auto" marginTop="30px" p={10}  maxWidth="80%" borderWidth={5}  
        width="full"
        >   
        <Box textAlign="center" paddingBottom="15px">
          <Heading as="h1" textColor="black" fontSize="40px" >Paste the URL to be shortened</Heading>
        </Box>
        <Spacer />

        <InputGroup size="lg" paddingBottom="10px">
      <Input
        placeholder="Enter the Link Here"
      />
      <InputRightElement width="9.5rem" paddingRight="10px" paddingLeft="10px">
            <Button rightIcon={<ArrowForwardIcon />}  type="submit" colorScheme="teal" variant="outline">
            Shorten URL
             </Button>
      </InputRightElement>
    </InputGroup>
        {/* <Flex >  
            <Box p="4">
              <FormLabel >Paste the URL to be shortened :</FormLabel>
              <Input type="urlToShort" width="auto" placeholder="Enter the Link Here" />
            </Box>
            <Spacer />
            <Box p="8" >
            <Button  mt={4} type="submit" color="white" backgroundColor="blue">
              Shorten URL
            </Button>
            </Box>
        </Flex> */}
      </Box>

  );
};

export default Home;
