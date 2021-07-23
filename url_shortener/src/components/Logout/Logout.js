import { withRouter } from "react-router";

function Logout(props){
    window.localStorage.removeItem("token");
    const { renderApp, setRenderApp } = props;

    setRenderApp(!renderApp);
}

export default withRouter(Logout);