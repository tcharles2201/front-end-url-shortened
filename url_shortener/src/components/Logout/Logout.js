import { withRouter } from "react-router";

function Logout(props){
    window.localStorage.removeItem("token");
    props.history.replace("/");
    this.props.setRenderApp(true);
    return (<div></div>)
}

export default withRouter(Logout);