const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const course = require('../controller/course/course');


router.post("/getCourse", course.getCourse);
router.post("/getStatus", course.getStatus);



module.exports = router;