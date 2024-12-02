import React, { useState, useEffect } from 'react';
import './JobListing.css'; // Ensure the CSS file is imported
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

function JobListing() {
  const [companies, setCompanies] = useState([]); // State to store companies
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  
  // Fetch companies data when the component mounts
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:4119/company/getAll'); // API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the response as JSON
        setCompanies(data); // Store companies in state
      } catch (error) {
        setError(error.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchCompanies(); // Call the fetch function
  }, []); // Empty dependency array to run the effect only once when component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an issue with the fetch
  }

  return (
    <div className="job-listing-container">
      <Navbar />
      <div className='maincontainer'>
      <h1 className='headingofpage'>Job Listings</h1>
      <div className="job-listing-wrapper">
        {companies.length > 0 ? (
          companies.map((company) => (
            <div key={company._id} className="job-listing">
              <h2>{company.companyname}</h2>
              <p><strong>Job Role:</strong> {company.jobrole}</p>
              <p><strong>Description:</strong> {company.description}</p>
              <p><strong>Salary:</strong> {company.salary}</p>
              <p>
                  <a href={company.applylink} target="_blank" rel="noopener noreferrer">
                    <button className="apply-button">Apply Now</button>
                  </a>
                </p>
                   </div>
          ))
        ) : (
          <p>No job listings available.</p>
        )}
      </div>
      </div>
      <Footer/>
    </div>
  );
}

export default JobListing;
