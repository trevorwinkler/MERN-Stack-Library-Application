import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookList() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const availableResponse = await axios.get('http://localhost:3000/books/available');
      setAvailableBooks(availableResponse.data);

      const checkedOutResponse = await axios.get('http://localhost:3000/books/checked-out');
      setCheckedOutBooks(checkedOutResponse.data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

return (
  <div>
    <h2>Available Books</h2>
    <ul>
      {availableBooks.map(book => (
        <li key={book._id}>
          {book.title} by {book.author}
        </li>
      ))}
    </ul>
    <h2>Checked Out Books</h2>
    <ul>
      {checkedOutBooks.map(book => (
        <li key={book._id}>
          {book.title} by {book.author} - Checked out by {book.checkedOutBy} until {new Date(book.dueDate).toLocaleDateString()}
        </li>
      ))}
    </ul>
  </div>
);
}

export default BookList;
