import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/login`, { username, password });

            if (response.status === 200) {
                localStorage.setItem('username', username);
                login({ username });
                navigate('/');
            }
            else{
                alert('Invalid credentials');
            }
        } catch (error){
            console.error("Login error:", error);
            alert('An error occurred, please try again.');
        }
    };

    return (  
        <div className="login-page">
            <form form="true" onSubmit={handleLogin}>
            <div>
                <img className = "logo" src="./game_logo.png" alt="game_logo"/>
                
                <h4 className="form-label mt-4">Username</h4>
                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleTextarea" 
                    placeholder="Enter username" 
                    value = {username}
                    onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <h4 className="form-label mt-4">Password</h4>
                <input 
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder="Password" 
                    autoComplete="off" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            </div>
                <p style={{ fontSize: "0.9rem", marginTop: "7px", marginBottom: "5px" }}>
                <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
                    Create Account
                </Link></p>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
 
export default Login;