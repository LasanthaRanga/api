const con = require('../../util/sequl');
const course = con.import('../../models/course');
const student = con.import('../../models/temp_student');
const status = con.import('../../models/status_student');
const db = require('../../util/con');

exports.getStudent = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT privilages.id,privilages.title,privilages.url,privilages.icon,user_has_privilages.userid FROM user_has_privilages INNER JOIN privilages ON user_has_privilages.privid=privilages.id ",
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