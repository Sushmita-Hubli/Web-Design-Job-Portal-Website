import React, { useState } from 'react';
import axios from 'axios';
import Navbar1 from "../Components/Navbar1";
import './AddJobs.css';

const AddJobs = () => {
    const [formData, setFormData] = useState({
        companyname: '',
        jobrole: '',
        description: '',
        applylink: '',
        salary: '',
        profileImage: null,
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handleFileChange = (e) => {
        setFormData({
          ...formData,
          profileImage: e.target.files[0],
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('companyname', formData.companyname);
        formDataToSubmit.append('jobrole', formData.jobrole);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('applylink', formData.applylink);
        formDataToSubmit.append('salary', formData.salary);
        if (formData.profileImage) {
          formDataToSubmit.append('profileImage', formData.profileImage);
        }
    
        try {
          await axios.post('http://localhost:4119/company/create', formDataToSubmit, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          alert('Job posted successfully');

          // Clear the form fields
    setFormData({
        companyname: '',
        jobrole: '',
        description: '',
        applylink: '',
        salary: '',
        profileImage: null,
      });

      // Optionally reset the file input element
    document.getElementById('profileImage').value = '';
        } catch (error) {
          alert('Error posting job');
        }
      };

  return (
    <div>
       <Navbar1/>
      {/* Add your form or content for adding jobs here */}
      <div className="add-job-form">
      <h1>Add Job</h1>
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="companyname">Company Name</label>
          <input
            type="text"
            id="companyname"
            name="companyname"
            value={formData.companyname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="jobrole">Job Role</label>
          <input
            type="text"
            id="jobrole"
            name="jobrole"
            value={formData.jobrole}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="applylink">Apply Link</label>
          <input
            type="url"
            id="applylink"
            name="applylink"
            value={formData.applylink}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Add Job</button>
      </form>
    </div>
    </div>

  );
};

export default AddJobs;
