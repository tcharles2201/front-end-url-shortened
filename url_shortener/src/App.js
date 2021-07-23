import logo from './logo.svg';
import './App.css';
import { DashboardLinks } from "./components/links/DashboardLinks";
import "./App.css";
import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./header";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/Login/SignIn";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [urlObtained, setOriginalLink] = useState("");
  function getBaseUrlFromApp() {
    axios
      .get(`${process.env.REACT_APP_API}${window.location.pathname}`)
      .then((response) => {
        setOriginalLink(response.data.url);
      });
  }

  function isRedirect(){
    return (window.location.href.match(`${process.env.REACT_APP_HOST}/redirect/`));
  }

  if (window.location.href.match(`${process.env.REACT_APP_HOST}/redirect/`)) {
    getBaseUrlFromApp();
    if (urlObtained === "") {
      console.error("vide " + urlObtained);
    } else {
      window.location.replace(urlObtained);
    }
  }

  const [shouldRenderHeader, setShouldRenderHeader] = useState(false);

  console.log(process.env);
  return (
    <ChakraProvider>
      {!isRedirect() && <Header renderHeader={shouldRenderHeader}  />}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login"  render={() => <SignIn setRenderHeader={setShouldRenderHeader} />} />
          <Route exact path="/links" component={DashboardLinks} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
