import React from 'react';
import './About.css';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

function About() {
    return (
        <div className="about-container">
            <Navbar />
            <div className="about-content">
                <h1>About Us</h1>
                <p className='para'>
                    JobPortal is a leading platform that connects job seekers with top companies across various industries. We aim to simplify the job search process by providing an intuitive and user-friendly platform that matches job seekers with their ideal positions. 
                    <br /><br />
                    Our platform brings together a diverse set of companies and industries, from startups to established enterprises. We provide detailed company profiles, job descriptions, salary insights, and application instructions to ensure job seekers have all the information they need to make informed decisions.
                    <br /><br />
                    At JobPortal, we believe in creating long-term success by fostering connections that lead to meaningful careers. Join us today, and take the first step towards a brighter professional future.
                </p>
                
            </div>
            <Footer/>
        </div>
        
    );
}

export default About;
