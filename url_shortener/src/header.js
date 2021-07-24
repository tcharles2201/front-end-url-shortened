import React, { useState } from "react";

import {
  Box,
  Heading,
  Flex,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  Link
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { useHistory, withRouter } from "react-router-dom";

function Header(props){
  const { renderApp, setRenderApp,  ...other } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const [currentPath, setCurrentPath] = useState(props.history.location.pathname);

  console.log(currentPath);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
      {...other}
    >
    <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>
    <Tabs variant="soft-rounded" colorScheme="green" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between"  minWidth="100%">

      <Flex align="center" mr={5}>
            <TabList>
            <Tab onClick={() => { 
                  props.history.push("/");
                  props.setRenderApp(true);
              }} isSelected={currentPath === "/"}> <Heading as="h1" size="lg" letterSpacing={"tighter"}>URL Shortner        </Heading>
            </Tab>
            </TabList>
      </Flex>



      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
          <TabList>
              {window.localStorage.getItem("token") && <Tab onClick={() => {
                  props.history.push("/links");
                  props.setRenderApp(true);
              }} isSelected={currentPath === "/links"}>Dashboard</Tab>}
              {window.localStorage.getItem("token") && <Tab onClick={() => { 
                  props.history.push("/logout");
                  props.setRenderApp(true);
              }} isSelected={currentPath === "/logout"}>Logout</Tab>}
              {!window.localStorage.getItem("token") &&  <Tab onClick={() => {
                  props.history.push("/login");
                  props.setRenderApp(true);
              }} isSelected={currentPath === "/login"}>Sign In</Tab>}
              {!window.localStorage.getItem("token") && <Tab onClick={() => {
                  props.history.push("/signup");
                  props.setRenderApp(true);
              }} isSelected={currentPath === "/signup"}>Sign Up</Tab>}
              <Tab onClick={() => { 
                  props.history.push("/apropos");
                  props.setRenderApp(true);
              }} isSelected={currentPath === "/apropos"}>A PROPOS</Tab>
          </TabList>
      </Box>
      </Tabs>
    </Flex>
    
  );
};

export default withRouter(Header);
