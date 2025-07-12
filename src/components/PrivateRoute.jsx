import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const {children} = props;
    const isValidKey = (sessionStorage.getItem('ApiKey')!==null || sessionStorage.getItem("selectedModel")==="mistral")  
    return isValidKey ? <>{children}</> : <Navigate replace={true} to="/"/>

}
export default PrivateRoute;