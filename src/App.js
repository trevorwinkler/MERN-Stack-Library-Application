import React from 'react';
import BookList from './BookList';
import CheckOutForm from './CheckOutForm';
import CheckInForm from './CheckInForm';

function App() {
  return (
    <div>
      <h1>Library System</h1>
      <BookList />
      <CheckOutForm />
      <CheckInForm />
    </div>
  );
}

export default App;
