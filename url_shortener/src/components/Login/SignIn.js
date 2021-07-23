import React from "react";
import Axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";
import { withRouter } from "react-router";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mailReg: "xxx@gmail.com",
      passwordReg: "xxxx",
    };
    this.updateValueMail = this.updateValueMail.bind(this);
    this.updateValuePassword = this.updateValuePassword.bind(this);
    this.login = this.login.bind(this);
  }

  updateValueMail(e) {
    this.setState({ mailReg: e.target.value });
  }

  updateValuePassword(e) {
    this.setState({ passwordReg: e.target.value });
  }

  login = () => {
    Axios.post(`${process.env.REACT_APP_API}/api/users/login`, {
      email: this.state.mailReg,
      password: this.state.passwordReg,
    }).then((response) => {
      console.log(response);
      window.localStorage.setItem("token", response.data.token);
      this.props.history.push("/links");
      this.props.setRenderHeader(true);
      console.log("ok");
    });
  };

  render() {
    return (
      <ChakraProvider>
        <FormControl>
          <FormLabel>Identifiant</FormLabel>
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
            onClick={this.login}
          >
            Login
          </Button>
        </FormControl>
      </ChakraProvider>
    );
  }
}

export default withRouter(SignIn);
