import React from "react";

import {
  Link,
  Box,
  Heading,
  Flex,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

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
          <Link href="/">URL Shortner</Link>
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
            <Tab>
              <Link href="/login">Sign In</Link>
            </Tab>
            <Tab>
              <Link href="/signup">Sign Up</Link>
            </Tab>
            <Tab>
              <Link href="/apropos">A PROPOS</Link>
            </Tab>
          </TabList>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default Header;
