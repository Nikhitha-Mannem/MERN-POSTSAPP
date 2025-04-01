import {useNavigate} from "react-router-dom";
import {useEffect,useContext } from 'react';
import { AuthContext } from "../Context/AuthContext";
const Home=()=>{
    const Navigate=useNavigate()
    const {setAuthState}=useContext(AuthContext);

    const isLoggedIn=localStorage.getItem("accessKey");
    
    useEffect(()=>{
        if(isLoggedIn){
            //setAuthState((prev) => ({ ...prev, isAuthorized: true, username: username }));


            Navigate('/posts');
        }
        
    },[])

    return isLoggedIn ? null : (
        <div className="center-message">
            <h1>Welcome to Posts App</h1>
            <p>Please Login to Continue!!</p>
        </div>
    );

    
}
export default Home;