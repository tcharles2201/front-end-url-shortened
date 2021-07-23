import React, { useRef, useState } from "react";
import { withRouter } from "react-router";

function Logout(props){
    window.localStorage.removeItem("token");
    props.history.replace("/");
    props.setRenderApp(true);
    return (<div></div>)
}

export default withRouter(Logout);