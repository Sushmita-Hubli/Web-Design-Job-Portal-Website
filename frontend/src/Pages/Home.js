import React from 'react';
import './Home.css';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

function Home() {
    return (
        <div className="home-container">
            <Navbar />
            <div className="home-content">
                <h1>Welcome to the JobPortal</h1>
                <p>Your one-stop platform to connect with top companies and explore exciting career opportunities.</p>
              
            </div>
            <Footer/>
        </div>
    );
}

export default Home;
