const express = require('express');
const {
  accessChat,
  fetchChats,
  createGroupChat,
  fetchGroups,
  groupExit,
  addSelfToGroup,
} = require('../Controllers/chatController');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, accessChat);
router.get('/', protect, fetchChats);
router.post('/createGroup', protect, createGroupChat);
router.get('/fetchGroups', protect, fetchGroups);
router.put('/groupexit', protect, groupExit);
router.put('/addSelfToGroup', protect, addSelfToGroup);

module.exports = router;
