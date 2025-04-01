import {useNavigate} from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect } from "react";
const LogoutUser=()=>{
    const {setAuthState}=useContext(AuthContext);
    const navigate=useNavigate();
    useEffect(()=>{
        localStorage.removeItem('accessKey');
        localStorage.removeItem('username');
        setAuthState((prev) => ({ ...prev, isAuthorized: false, username: '' }));

        navigate('/');

    },[])
    

}

export default LogoutUser;