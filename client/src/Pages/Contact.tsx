import React, { useState } from 'react';
// import './ContactUs.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate an API or EmailJS here
    alert("Thanks for contacting us, " + formData.name + "!");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container text-white">
      <div className="contact-box text-center">
        <h1 className='text-4xl p-4 font-bold'>Contact Us</h1>
        <p>We'd love to hear from you. Fill the form and we’ll get back to you shortly.</p>
        <form onSubmit={handleSubmit} className="contact-form grid grid-cols-1 gap-4 my-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="m-4 rounded-2xl p-4 bg-white text-black"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="m-4 rounded-2xl p-4  bg-white text-black"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="m-4 rounded-2xl p-4 bg-white text-black"
            required
          />
          <button type="submit" className='bg-white text-black m-4 p-2 rounded-2xl'>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;