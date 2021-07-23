import logo from './logo.svg';
import './App.css';
import Register from './component/register.js';
import Login from './component/login.js';
import { ChakraProvider } from "@chakra-ui/react"
import { DashboardLinks } from "./components/links/DashboardLinks";
import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./header";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [urlObtained, setOriginalLink] = useState("");
  function getBaseUrlFromApp() {
    axios
      .get(`http://localhost:8125${window.location.pathname}`)
      .then((response) => {
        setOriginalLink(response.data.url);
      });
  }

  if (window.location.href.match("http://localhost:3000/redirect/")) {
    getBaseUrlFromApp();
    if (urlObtained === "") {
      console.error("vide " + urlObtained);
    } else {
      window.location.replace(urlObtained);
    }

    // window.location.replace(urlObtained) ;
  }

  return (
    <ChakraProvider>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
