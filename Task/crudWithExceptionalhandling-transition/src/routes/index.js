const express = require('express');
const { Health, signUp, login } = require('../controller/auth');
const { user, getUser, getUserV2  } = require('../controller/user');
const { authMiddleware } = require('../middleware/authorization');

const router = express.Router();

// health
router.get('/', Health);

// auth
router.post('/register', signUp);
router.post('/login', login);

// user profile
router.post('/user', authMiddleware, user);

//pagination
router.post('/getUser', getUser);
router.post('/getUserV2', getUserV2);

module.exports = router;