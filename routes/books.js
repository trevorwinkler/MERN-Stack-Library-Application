const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); 

module.exports = router;

function getRandomDateIn2024() {
  const year = 2024;
  const start = new Date(year, 0, 1); // Jan 1, 2024
  const end = new Date(year + 1, 0, 1); // Jan 1, 2025
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
// List all available books
router.get('/available', async (req, res) => {
    try {
      const books = await Book.find({ status: true });
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // List all checked-out books
  router.get('/checked-out', async (req, res) => {
    try {
      const books = await Book.find({ status: false });
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  


router.post('/check-out', async (req, res) => {
    const { isbn, checkedOutBy, dueDate } = req.body;
    console.log("Request received to check out book:", req.body);  
    try {
        const book = await Book.findOneAndUpdate({ isbn }, {
            status: false,
            checkedOutBy,
            dueDate: new Date(dueDate)
        }, { new: true });
        console.log("Updated book:", book);  
        res.json(book);
    } catch (err) {
        console.error("Error checking out the book:", err);
        res.status(500).json({ message: "Error checking out the book", error: err });
    }
});


router.post('/check-in', async (req, res) => {
  const { isbn } = req.body;
  try {
      const book = await Book.findOneAndUpdate(
          { isbn },
          {
              status: true, 
              checkedOutBy: "Nobody",
              dueDate: getRandomDateIn2024()
          },
          { new: true }
      );
      if (!book) {
          return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
  } catch (err) {
      console.error("Error checking in the book:", err);
      res.status(500).json({ message: "Error checking in the book", error: err });
  }
});