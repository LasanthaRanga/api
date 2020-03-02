const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const userController = require('../controller/user/user');


router.post("/login", userController.login);
router.post('/signup', userController.signup);
router.post('/privilages', checkAuth, userController.getPrivilages);
router.post('/getUsers',checkAuth, userController.getUsers);
router.post('/', checkAuth, userController.check);

module.exports = router;
