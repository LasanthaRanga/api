const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const userController = require('../controller/user/user');


router.post("/login", userController.login);
router.post('/signup', userController.signup);
router.post('/privilages', userController.getPrivilages);
router.post('/hasprivilage', checkAuth, userController.hasprivilage);
router.post('/setprivilage', checkAuth, userController.setPrivilage);
router.post('/deletePrivilage', checkAuth, userController.deletePrivilage);
router.post('/getUsers', checkAuth, userController.getUsers);
router.post('/getUser', checkAuth, userController.getUser);
router.post('/getUserTypes', checkAuth, userController.getUserTypes);
router.post('/changeUserType', checkAuth, userController.changeUserType);
router.post('/', checkAuth, userController.check);

module.exports = router;
