import React, { useState, useEffect } from 'react';
import './CompanyShowcase.css';
import Navbar from '../Components/Navbar/Navbar';
import axios from 'axios';
import Footer from '../Components/Footer/Footer';


function CompanyShowcase() {

    const [companies, setCompanies] = useState([]);

    
    useEffect(() => {
        // Fetch companies from the backend
        axios.get('http://localhost:4119/company/getAll')
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => console.error("Error fetching companies:", error));
    }, []);



    return (
        <div className="company-showcase-container">
            <Navbar />
            <h1>Our Partner Companies</h1>
            <div className="company-cards">
                {companies.map((company) => (
                    <div key={company._id} className="company-card">
                        {company.profileImage ? (
                            <img 
                                src={`http://localhost:4119${company.profileImage}`} 
                                alt={company.companyname} 
                                className="company-image"
                            />
                        ) : (
                            <img 
                                src="/path/to/default/logo.png" // Path to your default image
                                alt="Default logo" 
                                className="company-image"
                            />
                        )}
                        <h2>{company.companyname}</h2>
                       
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
}

export default CompanyShowcase;
