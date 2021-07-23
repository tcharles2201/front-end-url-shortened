import React, { Component } from 'react';
import Axios from 'axios';
import { ChakraProvider } from "@chakra-ui/react";
import { Stack, Text, useToast } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Input, FormControl, FormLabel, Select, Switch } from '@chakra-ui/react';

export default class Login extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         mailReg: 'xxx@gmail.com',
         passwordReg: 'xxxx'
      }
      this.updateValueMail = this.updateValueMail.bind(this);
      this.updateValuePassword = this.updateValuePassword.bind(this);
      this.login = this.login.bind(this);
   }

   updateValueMail(e) {
      this.setState({ mailReg: e.target.value })
   }

   updateValuePassword(e) {
    this.setState({ passwordReg: e.target.value })
   }

  login = () => {
      Axios.post(`${process.env.REACT_APP_API}/api/users/login`, {
        email: this.state.mailReg,
        password: this.state.passwordReg
      }).then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
      });
  };

   render() {
      return(
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
                  onClick={this.login}>Login</Button>
            </FormControl>
         </ChakraProvider>)
   }
}