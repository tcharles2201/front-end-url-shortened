import React from "react";
import Axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input, FormControl, FormLabel, Center, Box } from "@chakra-ui/react";
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
      this.props.setRenderApp(!this.props.renderApp);
      console.log("ok");
    });
  };

  render() {
    return (
      <ChakraProvider>
         <Box w="50%" mx="auto">
        <FormControl>
          <FormLabel>Identifiant</FormLabel>
          <Input
            type="text"
            id="1"
            isFullWidth="false"
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
          <br />
          <Center h="100px">
            <Button 
            colorScheme="teal" 
            variant="solid" 
            fontSize="1.2rem"
            onClick={this.login}>Login</Button>
          </Center>
        </FormControl>
        </Box>
      </ChakraProvider>
    );
  }
}

export default withRouter(SignIn);
