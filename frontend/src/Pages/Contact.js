import React, { useState } from 'react';
import './Contact.css';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';


function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Message sent by ${form.name}`);
    };

    return (
        <div className="contact-container">
            <Navbar></Navbar>
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required />

                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />

                <label>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required></textarea>

                <button type="submit">Send Message</button>
            </form>
            <Footer/>
        </div>
    );
}

export default Contact;
