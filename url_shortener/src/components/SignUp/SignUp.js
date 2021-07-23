import React from "react";
import Axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input, FormControl, FormLabel, Select, Stack, Center, Box } from "@chakra-ui/react";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstnameReg: "firstname",
      lastnameReg: "lastname",
      role: "Admin",
      mailReg: "xxx@gmail.com",
      passwordReg: "xxxx",
    };
    this.updateValueFirstName = this.updateValueFirstName.bind(this);
    this.updateValueLastName = this.updateValueLastName.bind(this);
    this.updateValueRole = this.updateValueRole.bind(this);
    this.updateValueMail = this.updateValueMail.bind(this);
    this.updateValuePassword = this.updateValuePassword.bind(this);
    this.register = this.register.bind(this);
  }

  updateValueFirstName(e) {
    this.setState({ firstnameReg: e.target.value });
  }

  updateValueLastName(e) {
    this.setState({ lastnameReg: e.target.value });
  }

  updateValueRole(e) {
    this.setState({ roleReg: e.target.value });
  }

  updateValueMail(e) {
    this.setState({ mailReg: e.target.value });
  }

  updateValuePassword(e) {
    this.setState({ passwordReg: e.target.value });
  }

  register = () => {
    console.log("je suis bien dans register!");
    Axios.post(`${process.env.REACT_APP_API}/api/users`, {
      firstname: this.state.firstnameReg,
      lastname: this.state.lastnameReg,
      role: this.state.role,
      email: this.state.mailReg,
      password: this.state.passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  render() {
    return (
        <ChakraProvider> 
        <Box w="50%" mx="auto">
        <Stack maxWidth={1200} margin="auto" spacing={5} marginTop={5}>
        <FormControl>
          <FormLabel htmlFor="firstname">FirstName</FormLabel>
          <Input
            type="text"
            id="firstname"
            autocomplete="off"
            bgColor="white"
            border="2px"
            borderStyle="solid"
            borderColor="warmGrey.500"
            color="black"
            onChange={this.updateValueFirstName}
          />
          <FormLabel htmlFor="lastname">LastName</FormLabel>
          <Input
            type="text"
            id="lastname"
            autocomplete="off"
            bgColor="white"
            border="2px"
            borderStyle="solid"
            borderColor="warmGrey.500"
            color="black"
            onChange={this.updateValueLastName}
          />
          <FormLabel htmlFor="role">Role</FormLabel>
          <Select onChange={this.updateValueRole}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Select>
          <FormLabel htmlFor="mail">Mail</FormLabel>
          <Input
            isRequired
            type="email"
            id="email"
            autocomplete="off"
            aria-describedby="email-helper-text"
            bgColor="white"
            border="2px"
            borderStyle="solid"
            borderColor="warmGrey.500"
            color="black"
            onChange={this.updateValueMail}
          />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            size="md"
            autocomplete="off"
            aria-describedby="password-helper-text"
            bgColor="white"
            border="2px"
            borderStyle="solid"
            borderColor="warmGrey.500"
            color="black"
            onChange={this.updateValuePassword}
          />
          <br />
          <Center h="100px">
            <Button colorScheme="teal" onClick={() => this.register()} variant="solid">Register</Button>
          </Center>
        </FormControl>
        </Stack>
        </Box>
        </ChakraProvider>
    );
  }
}
