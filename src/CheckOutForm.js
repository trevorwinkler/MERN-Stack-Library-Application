import React, { useState } from 'react';
import axios from 'axios';

function CheckOutForm() {
  const [isbn, setIsbn] = useState('');
  const [checkedOutBy, setCheckedOutBy] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:3000/books/check-out', { isbn, checkedOutBy, dueDate });
    alert('Book checked out successfully!');
    setIsbn('');
    setCheckedOutBy('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Check Out a Book</h2>
      <div>
        <label>ISBN:</label>
        <input type="text" value={isbn} onChange={e => setIsbn(e.target.value)} required />
      </div>
      <div>
        <label>Checked Out By:</label>
        <input type="text" value={checkedOutBy} onChange={e => setCheckedOutBy(e.target.value)} required />
      </div>
      <div>
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CheckOutForm;
