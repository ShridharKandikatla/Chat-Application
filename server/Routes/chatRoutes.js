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

// router.post('/', protect, accessChat);
// router.get('/', protect, fetchChats);
// router.post('/createGroup', protect, createGroupChat);
// router.get('/fetchGroups', protect, fetchGroups);
// router.put('/groupexit', protect, groupExit);
router.put('/addSelfToGroup', protect, addSelfToGroup);

router.route('/access').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/createGroup').post(protect, createGroupChat);
router.route('/fetchGroups').get(protect, fetchGroups);
router.route('/groupExit').put(protect, groupExit);

module.exports = router;
