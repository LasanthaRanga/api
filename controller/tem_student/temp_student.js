const con = require('../../util/sequl');
const course = con.import('../../models/course');
const student = con.import('../../models/temp_student');
const status = con.import('../../models/status_student');
const st_change = con.import('../../models/status_change');
const db = require('../../util/con');

exports.getStudent = (req, res, next) => {
    try {
        db.execute("SELECT temp_student.idStudent,temp_student.`name`,temp_student.nic,temp_student.mob1,temp_student.mob2,temp_student.description, " +
            " temp_student.other1,temp_student.other2,temp_student.course,temp_student.city,temp_student.isActive,course.course_name,city.city_english, " +
            " distric.distric_english,distric.iddistric,city.idcity,course.idCourse FROM temp_student INNER JOIN course ON temp_student.course=course.idCourse " +
            " INNER JOIN city ON temp_student.city=city.idcity INNER JOIN distric ON city.distric_iddistric=distric.iddistric WHERE temp_student.isActive=1 ",
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

exports.createStudent = (req, res, next) => {
    try {
        student.create({
            name: req.body.name,
            nic: req.body.nic,
            mob1: req.body.mob1,
            mob2: req.body.mob2,
            city: req.body.city,
            description: req.body.description,
            other1: req.body.other1,
            other2: req.body.other2,
            course: req.body.course,
            isActive: req.body.status
        }).then(re => {
            console.log(re);
            console.log(re.idStudent);
            st_change.create({
                status_id: 1,
                temp_id: re.idStudent,
                description: 'Just Registered Temporary',
                other: '',
                user_id: req.body.user
            }).then(result => {
                res.send(result);
            })
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}