const express = require('express');
const user = require('../controllers/user.controller');
const verifyToken = require('../middleware/verifytoken');
const router = express.Router();
router.get('/', verifyToken , user.getAllUsers);
router.post('/register', user.register);
router.post('/login', user.login);
module.exports = router;