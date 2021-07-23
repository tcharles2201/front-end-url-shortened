import React from "react";
import Axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input, FormControl, FormLabel, Select } from "@chakra-ui/react";

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
    Axios.post("http://localhost:8125/api/users", {
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
        <FormControl>
          <FormLabel>FirstName</FormLabel>
          <Input
            type="text"
            id="1"
            bgColor="white"
            border="2px"
            borderStyle="solid"
            borderColor="warmGrey.500"
            color="black"
            onChange={this.updateValueFirstName}
          />
          <FormLabel>LastName</FormLabel>
          <Input
            type="text"
            id="2"
            bgColor="white"
            border="2px"
            borderStyle="solid"
            borderColor="warmGrey.500"
            color="black"
            onChange={this.updateValueLastName}
          />
          <FormLabel>Role</FormLabel>
          <Select onChange={this.updateValueRole}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Select>
          <FormLabel>Mail</FormLabel>
          <Input
            type="text"
            id="1"
            bgColor="white"
            border="2px"
            borderStyle="solid"
            borderColor="warmGrey.500"
            color="black"
            onChange={this.updateValueMail}
          />
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            id="2"
            bgColor="white"
            border="2px"
            borderStyle="solid"
            borderColor="warmGrey.500"
            color="black"
            onChange={this.updateValuePassword}
          />
          <Button
            border="2px"
            borderStyle="solid"
            borderColor="white"
            fontFamily="Playball"
            color="white"
            bgColor="warmGrey.500"
            fontWeight="10"
            fontSize="1.2rem"
            _hover="warmGrey.200"
            onClick={this.register}
          >
            Register
          </Button>
        </FormControl>
      </ChakraProvider>
    );
  }
}
