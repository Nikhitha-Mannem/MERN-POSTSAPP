import axios from 'axios';
import {useState,useEffect} from 'react';


const Profile=()=>{
    const [user,setUser]=useState('')
    useEffect(()=>{
        axios.get("http://localhost:3001/auth/userdetails",{headers:{"accessToken":localStorage.getItem("accessKey")}})
        .then(response=>{
            console.log(response.data);
            setUser(response.data.userDetails)

        })
        .catch(error=>console.log(error))


    },[])
    return (<h1 className="center-message">Hello {user.username}</h1>)

}
export default Profile;