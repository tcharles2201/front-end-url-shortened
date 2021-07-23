import "./App.css";
import { DashboardLinks } from "./components/links/DashboardLinks";
import "./App.css";
import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./header";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/Login/SignIn";

import { ChakraProvider, Heading } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Logout from "./components/Logout/Logout";

function App() {
  const [urlObtained, setOriginalLink] = useState("");
  const [errorShortened, setErrorShortened] = useState("");

  function getBaseUrlFromApp() {
    axios
      .get(`${process.env.REACT_APP_API}${window.location.pathname}`)
      .then((response) => {
        setOriginalLink(response.data.url);
        setErrorShortened(undefined);
      }).catch((error) => {
          setOriginalLink("");
          setErrorShortened("The link has expired");
      });
  }

  function isRedirect() {
    return window.location.href.match(
      `${process.env.REACT_APP_HOST}/redirect/`
    );
  }

  if (window.location.href.match(`${process.env.REACT_APP_HOST}/redirect/`)) {
    getBaseUrlFromApp();
    if (urlObtained === "") {
      console.error("vide " + urlObtained);
    } else {
      window.location.replace(urlObtained);
    }
  }




  const [shouldRenderApp, setShouldRenderApp] = useState(false);

  console.log(process.env);
  return (
    <ChakraProvider>
      {!isRedirect() && <Header renderApp={shouldRenderApp} />}
      {isRedirect() && errorShortened && <Heading>{errorShortened}</Heading> }
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path="/login"
            render={() => <SignIn renderApp={shouldRenderApp} setRenderApp={setShouldRenderApp} />}
          />
          <Route exact path="/links" component={DashboardLinks} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
