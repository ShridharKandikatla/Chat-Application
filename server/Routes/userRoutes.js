const express = require('express');
const {
  loginController,
  registerController,
  fetchAllUser,
} = require('../Controllers/userController');
const { protect } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.get('/fetchUsers', protect, fetchAllUser);

module.exports = router;
