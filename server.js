

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const booksRouter = require('./routes/books');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://tdylanw:Dylan94DATABASE.1a1@atlascluster.qzj2ibs.mongodb.net/Library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('Failed to connect to MongoDB', err));

app.use('/books', booksRouter);

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
