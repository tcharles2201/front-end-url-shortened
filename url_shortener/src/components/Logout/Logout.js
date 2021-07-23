import { withRouter } from "react-router";

function Logout(props){
    window.localStorage.removeItem("token");

    props.history.replace("/");
}

export default withRouter(Logout);