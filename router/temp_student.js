const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const temp_student = require('../controller/tem_student/temp_student');


router.post("/getStudent", temp_student.getStudent);
router.post("/createStudent",temp_student.createStudent);



module.exports = router;