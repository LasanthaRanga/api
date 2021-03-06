const con = require('../../util/sequl');
const course = con.import('../../models/course');
const student = con.import('../../models/temp_student');
const status = con.import('../../models/status_student');
const db = require('../../util/con');

exports.getCourse = (req, res, next) => {
    try {      
        db.execute("SELECT course.idCourse,course.course_name FROM course WHERE course.isactive=1",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getStatus = (req, res, next) => {
    try {      
        db.execute("SELECT status_student.idStatus,status_student.status_name FROM status_student",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

