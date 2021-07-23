import React, { Component } from "react";

import {
  List,
  ListItem,
  ListIcon,
  Box,
  Heading,
  Button,
} from "@chakra-ui/react";
import MdCheckCircle from "@material-ui/icons/CheckCircle";

import PostLink from "./PostLink";
import { verify } from "jsonwebtoken";
import { withRouter } from "react-router";

class Home extends Component {
  componentDidMount() {
    const token = window.localStorage.getItem("token");

    console.log(token);
    if (!token) {
      return;
    }
    const data = verify(token, process.env.REACT_APP_SECRET);

    if (data && data.id) {
      this.props.history.replace("/links");
    }
  }

  render() {
    return (
      <React.Fragment>
        <PostLink />
        <Box
          margin="auto"
          marginTop="30px"
          p={10}
          maxWidth="60%"
          borderWidth={5}
          borderColor="blue"
          width="full"
        >
          <Box maxW="32rem" align="center" margin="auto" paddingTop="10px">
            <Heading mb={4}>Create a free account to enjoy: </Heading>
            <List fontSize="xl" spacing={3} align="center">
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Easy Link Shortening
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Full Link History
              </ListItem>
            </List>
            <Button
              size="lg"
              onClick={() => this.props.history.push("/signup")}
              colorScheme="green"
              mt="24px"
            >
              Create a free account
            </Button>
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
