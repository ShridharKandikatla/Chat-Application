require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const { default: mongoose } = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get('/', (req, res) => {
  console.log('Hello World');
  res.send('Hello World');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server started on port 5000');
});
