require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const messageRoutes = require('./Routes/messRoutes');
const { default: mongoose } = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors({
  origin:["https://chat-application-unpr.onrender.com",
          "https://chat-application-v61q.vercel.app/"],
  credentials:true
}));
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err.message);
  });

server = app.listen(process.env.PORT || 5000, () => {
  console.log('Server started on port 5000');
});

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
  pingTimeout: 60000,
});

io.on('connection', (socket) => {
  socket.on('setup', (user) => {
    socket.join(user.data._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
  });

  socket.on('new message', (newMessageStatus) => {
    if (!newMessageStatus.chat.users)
      return console.log('chat.users not defined');
    newMessageStatus.chat.users.forEach((user) => {
      if (user._id == newMessageStatus.sender._id) return;
      socket.in(user._id).emit('message recieved', newMessageStatus);
    });
  });
});
