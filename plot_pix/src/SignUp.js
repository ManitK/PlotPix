import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5001/api/signup', { email, username, password });

            if (response.data.success) {
                navigate('/');
            } else {
                alert('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error("Signup failed", error);
            alert('An error occurred, please try again.');
        }
    };

    return (
        <div className="signup-page">
            <form onSubmit={handleSignup}>
                <div>
                    <img className="logo" src="./game_logo.png" alt="game_logo" />
                    <h4 className="form-label mt-4">Email address</h4>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <h4 className="form-label mt-4">Username</h4>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div>
                    <h4 className="form-label mt-4">Password</h4>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default SignUp;
