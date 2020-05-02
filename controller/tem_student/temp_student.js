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

exports.getStudentById = (req, res, next) => {
    try {
        db.execute("SELECT temp_student.idStudent,temp_student.`name`,temp_student.nic,temp_student.mob1," +
            "temp_student.mob2,temp_student.description,temp_student.other1,temp_student.other2,temp_student.course," +
            "temp_student.city,temp_student.isActive,temp_student.createdAt,temp_student.updatedAt FROM temp_student WHERE temp_student.idStudent=" + req.body.id,
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

exports.changeStudentStatus = (req, res, next) => {

    const status = req.body.status;
    console.log(status + " == asdf");

    if (status > 0) {

        try {
            st_change.create({
                temp_id: req.body.temp_id,
                status_id: req.body.status,
                student_id: req.body.student_id,
                description: req.body.des,
                other: req.body.other,
                user: req.body.user
            }).then(result => {
                res.send(result);
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    } else {

        try {
            db.execute("SELECT status_change.idStchange,status_change.status_id FROM status_change WHERE status_change.temp_id= '" + req.body.temp_id + "' ORDER BY status_change.idStchange DESC LIMIT 1", (err, row, next) => {
                let status = 0;
                if (row[0]) {
                    let status = row[0].status_id;
                    st_change.create({
                        temp_id: req.body.temp_id,
                        status_id: status,
                        student_id: req.body.student_id,
                        description: req.body.des,
                        other: req.body.other,
                        user: req.body.user
                    }).then(result => {
                        res.send(result);
                    });
                } else {
                    st_change.create({
                        temp_id: req.body.temp_id,
                        status_id: status,
                        student_id: req.body.student_id,
                        description: req.body.des,
                        other: req.body.other,
                        user: req.body.user
                    }).then(result => {
                        res.send(result);
                    });
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    }


}