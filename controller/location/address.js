const con = require('../../util/sequl');

const city = con.import('../../models/city');
const distric = con.import('../../models/distric');

const db = require('../../util/con');

exports.getDistrics = (req, res, next) => {
    try {
        db.execute("SELECT distric.iddistric,distric.distric_english FROM distric ORDER BY distric.distric_english ASC",
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

exports.getCitys = (req, res, next) => {

    try {
        db.execute("SELECT city.idcity,city.city_english FROM city WHERE city.distric_iddistric='" + req.body.id + "' ORDER BY city.city_english ASC",
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
