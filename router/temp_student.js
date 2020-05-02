const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const temp_student = require('../controller/tem_student/temp_student');


router.post("/getStudent", temp_student.getStudent);
router.post("/createStudent", temp_student.createStudent);
router.post("/getStudentById", temp_student.getStudentById);
router.post("/changeStudentStatus", temp_student.changeStudentStatus);





module.exports = router;