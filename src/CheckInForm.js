import React, { useState } from 'react';
import axios from 'axios';

function CheckInForm() {
  const [isbn, setIsbn] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:3000/books/check-in', { isbn });
    alert('Book checked in successfully!');
    setIsbn('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Check In a Book</h2>
      <div>
        <label>ISBN:</label>
        <input type="text" value={isbn} onChange={e => setIsbn(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CheckInForm;
