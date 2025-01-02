import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5001/api/login', { username, password });

            if (response.status === 200) {
                navigate('/');
            }
            else{
                alert('Invalid credentials');
            }
        } catch (error){
            alert('An error occurred, please try again.');
        }
    };

    return (  
        <div className="login-page">
            <form>
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
                    autocomplete="off" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            </div>
                <p style={{ fontSize: "0.9rem", marginTop: "7px", marginBottom: "5px" }}>
                <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
                    Create Account
                </Link></p>

                <button type="button" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
 
export default Login;