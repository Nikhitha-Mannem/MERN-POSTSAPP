import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import styles from "./LoginUser.module.css";

const LoginUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setAuthState } = useContext(AuthContext);

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/auth/login", { username, password })
            .then(response => {
                if (response.data.Error) {
                    alert(response.data.Error);
                } else {
                    const accessKey = response.data.accessToken;
                    localStorage.setItem("accessKey", accessKey);
                    localStorage.setItem("username", username);
                    setAuthState((prev) => ({ ...prev, isAuthorized: true, username }));
                    navigate('/posts');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={login}>
                <h2 className={styles.loginTitle}>Login</h2>
                <input 
                    type='text' 
                    name="username" 
                    className={styles.loginInput} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username"
                />
                <input 
                    type='password' 
                    name="password" 
                    className={styles.loginInput} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                />
                <button type="submit" className={styles.loginButton}>Login</button>
            </form>
        </div>
    );
};

export default LoginUser;