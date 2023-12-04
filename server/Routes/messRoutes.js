const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/authMiddleware');

router.route('/:chatId').get(protect, allMessages);
router.route('/').post(protect, sendMessage);

module.exports = router;
