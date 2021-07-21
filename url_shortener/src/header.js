import React from "react";

import {
  Box,
  Heading,
  Flex,
  useDisclosure
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Tabs, TabList, Tab } from "@chakra-ui/react"
const Header = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          URL Shortner
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

  
      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
                <Tab> <a href="/login">Sign In</a> </Tab>
                <Tab> <a href="/signup">Sign Up</a> </Tab>  
                <Tab>  <a href="/apropos">A PROPOS</a> </Tab>     
            </TabList>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default Header;
