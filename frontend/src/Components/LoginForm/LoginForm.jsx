import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Initialize the useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4119/login', {
                username,
                password,
            }, { withCredentials: true }); // Enable cookies for session

            if (response.data.success) {
                const userType = response.data.userType; // Extract userType from response
// Save session state in localStorage
localStorage.setItem('isAuthenticated', 'true');
localStorage.setItem('userType', userType);

// Redirect based on userType
if (userType === 'admin') {
    navigate('/admin/employees'); // Admin-specific route
} else if (userType === 'employee') {
    navigate('/home'); // Employee-specific route
}

            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Login failed');
        }
    };

// Check session on component mount
useEffect(() => {
    const checkSession = async () => {
        const response = await axios.get('http://localhost:4119/check-session', { withCredentials: true });
        if (!response.data.loggedIn) {
            navigate('/');
        }
    };
    checkSession();
}, []);


    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder='Username' 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder='Password' 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <FaLock className='icon' />
                </div>
                


                {/* 
<div className="remember-forgot">
    <label><input type="checkbox" /> Remember me</label>
    <a href="#">Forgot password?</a>
</div> 
*/}


                <button type='submit'>Login</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="register-link">
                    {/* Add any additional links here */}
                </div>
            </form>
        </div>
    )
}

export default LoginForm;
