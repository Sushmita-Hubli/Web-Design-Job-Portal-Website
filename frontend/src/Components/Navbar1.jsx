import React from 'react';
import './Navbar/Navbar.css';
import { Link, useNavigate } from "react-router-dom";

const Navbar1 = () => {

    const navigate = useNavigate();  // Initialize useNavigate

    // Handle logout and redirect
    const handleLogout = () => {
        // Perform any logout actions here, like clearing session data
        navigate('/');  // Redirect to login page
    };


    return (
        <div className="navbar">
            <div className="navbar-logo">
            JobPortal
            </div>
            <ul className="navbar-links">
           
            <li className='one'> <Link to="/adminemployees">Home</Link></li>
            <li className='two'> <Link to="/addjobs">Add Jobs</Link></li>
         
               
               <li>
                   <button onClick={handleLogout} className="logout-button">Logout</button>
               </li> 
            </ul>
        </div>
    );
}

export default Navbar1;
