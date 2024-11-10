/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import emailjs from '@emailjs/browser'; 
import './RentPage.css'; 
// const service_id = import.meta.env.VITE_SERVICE_ID;
// const template_id = import.meta.env.VITE_TEMPLATE_ID;
// const public_key = import.meta.env.VITE_PUBLIC_KEY;




function RentPage() {
  const [form, setForm] = useState({ name: '', email: '', date: '', time: ''});
  const [minDate, setMinDate] = useState('');

  const location = useLocation();
  const movie = location.state || {};
  const { image, title, genre, year, rating, price } = movie;

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const minDateString = today.toISOString().split('T')[0];
    setMinDate(minDateString);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare email parameters
    // const emailParams = {
    //   name: form.name,
    //   email: form.email,
    //   date: form.date,
    //   time: form.time,
    //   title: title,
    //   price: price
    // };

    // // Send email using EmailJS
    // emailjs
    //   .send(
    //     service_id,  // Replace with your service ID
    //     template_id, // Replace with your template ID
    //     emailParams,
    //     public_key   // Replace with your public key
    //   )
    //   .then(
    //     (response) => {
    //       console.log('Email sent successfully!', response.status, response.text);
    //       alert(`Thank you, ${form.name}! Your movie is reserved for pickup on ${form.date} at ${form.time}.`);
    //     },
    //     (error) => {
    //       console.error('Failed to send email:', error);
    //       alert('Sorry, something went wrong. Please try again later.');
    //     }
    //   );

    // Reset form fields
    setForm({ name: '', email: '', date: '', time: '' });
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour}:00`, `${hour}:30`);
    }
    return slots;
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
  };

  return (
    <div className="movie-page">
      <div className="form-section">
        <h2>Pickup Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Pickup Date:</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              min={minDate}
              className="date-input"
              onKeyDown={handleKeyDown} 
              required
            />
          </div>

          <div className="form-group">
            <label>Pickup Time:</label>
            <select
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            >
              <option value="">Select a time</option>
              {generateTimeSlots().map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <button type="submit">Request For Pickup</button>
        </form>
      </div>

      <div className="movie-info-section">
        <img
          src={image}
          alt={`${title} Poster`}
          className="movie-poster"
        />
        <div className="movie-details">
          <h1>{title}</h1>
          <p><strong>Genre:</strong> {genre}</p>
          <p><strong>Year:</strong> {year}</p>
          <p><strong>Rating:</strong> {rating}/10</p>
          <p><strong>Price:</strong> ${price}</p>
        </div>
      </div>
    </div>
  );
}

export default RentPage;
