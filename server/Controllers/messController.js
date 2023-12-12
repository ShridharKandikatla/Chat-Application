const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const Message = require('../Models/messageModel');
const Chat = require('../Models/chatModel');

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate([
      { path: 'sender', select: 'name email' },
      'receiver',
      'chat',
    ]);
    res.send(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log('Invalid data passed into request');
    return res.sendStatus(400);
  }
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate('sender', 'name');
    message = await message.populate('chat');
    message = await message.populate('receiver');
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name email',
    });

    await Chat.updateMany(
      { _id: req.body.chatId },
      { latestMessage: message }
    );
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  allMessages,
  sendMessage,
};
