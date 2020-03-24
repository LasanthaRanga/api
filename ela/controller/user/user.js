const con = require('../../util/sequl');
const user = con.import('../../models/user');
const utype = con.import('../../models/utype');
const priv = con.import('../../models/privilages');
const uhp = con.import('../../models/user_has_privilages');
const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../util/con');

exports.getPrivilages = (req, res, next) => {
    try {
        console.log('user ' + req.body.userid);
        db.execute("SELECT privilages.id,privilages.title,privilages.url,privilages.icon,user_has_privilages.userid FROM user_has_privilages INNER JOIN privilages ON user_has_privilages.privid=privilages.id WHERE user_has_privilages.userid=" + req.body.userid + " ORDER BY privilages.id ASC",
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

exports.hasprivilage = (req, res, next) => {
    let param = { uid: req.body.uid }
    try {
        db.execute("SELECT privilages.id,privilages.title,privilages.url,privilages.icon,privilages.`status` FROM privilages WHERE privilages.`status`=1  ORDER BY privilages.id ASC", (err, rows, fildData) => {
            if (!err) {
                let array = [];

                async function processArray() {
                    console.log("calling ==========");
                    await iterate();
                    console.log("Finish =============");
                }
                let x = 0;
                let y = rows.length;
                rows.forEach(element => {
                    db.execute("SELECT user_has_privilages.id FROM user_has_privilages WHERE user_has_privilages.userid='" + param.uid + "' AND user_has_privilages.privid='" + element.id + "'", (err, row, fildData) => {
                        if (!err) {
                            if (row.length > 0) {
                                element.activ = true;
                                array.push(element);

                            } else {
                                element.activ = false;
                                array.push(element);
                            }
                            // console.log(element);
                            x++;
                            if (x === y) {
                                // console.log("true  " + x + " " + y);
                                res.send(array);
                            }
                        } else {
                            console.log(err);
                        }
                    });
                });
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);


    }
}



exports.setPrivilage = (req, res, next) => {
    try {
        let param = {
            uid: req.body.uid,
            pid: req.body.pid
        };

        uhp.create({ userid: param.uid, privid: param.pid }).then(result => {
            res.send(result);
        });
    } catch (error) {
        console.log(error);
    }
}


exports.deletePrivilage = (req, res, next) => {
    try {
        let param = {
            uid: req.body.uid,
            pid: req.body.pid
        };
        uhp.destroy({
            where: { userid: param.uid, privid: param.pid }
        }).then(result => {
            console.log(result);
            res.status(200);
            res.send({ mg: 'OK' });
        });
    } catch (error) {
        console.log(error);
    }
}


exports.signup = (req, res, next) => {
    try {
        user.findOne({
            where: { username: req.body.username }
        }).then(use => {
            if (use) {
                console.log(use);
                return res.status(409).json({
                    error: 'user exxist'
                });
            } else {
                bcript.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return status(500).json({
                            error: err
                        })
                    } else {
                        user.create({
                            username: req.body.username,
                            password: hash,
                            nic: req.body.nic,
                            fullname: req.body.fullname,
                            mobile: req.body.mobile,
                            type: 2,
                            isactive: req.body.isactive
                        }).then(result => {
                            res.status(200).send(result);
                        });
                    }
                });

            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }
};

exports.login = (req, res, next) => {


    console.log(req.body);


    try {
        user.findOne(
            {
                where: { username: req.body.username }
            }
        ).then(use => {
            if (use) {
                //
                bcript.compare(req.body.password, use.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({ message: 'user name or password is wrong' });
                    }
                    if (result) {
                        if (use.isactive === 1) {
                            const token = jwt.sign({
                                uid: use.id,
                                fullname: use.fullname,
                                nic: use.nic,
                                mobile: use.mobile,
                            },
                                process.env.JWT_KEY,
                                {
                                    expiresIn: "1h"
                                },

                            );
                            return res.status(200).json({
                                mg: "Auth Successfull",
                                token: token
                            });
                        } else {
                            return res.status(401).json({ message: 'user deactivated' });
                        }
                    }
                    return res.status(401).json({ message: 'user name or password is wrong' });
                });
            } else {
                //no user
                return res.status(401).json({ message: 'user name or password is wrong' });
            }

        });
    } catch (error) {

    }
};



exports.check = (req, res, next) => {

    utype.sync().then(
        utype.create({
            utype: 'Ela Kiri',
            status: 1
        }).then((err) => {
            console.log(err);
        })
    );

    res.status(200).send({ 'OK': 'OKKKK' });

};


exports.getUsers = (req, res, next) => {
    let active = req.body.activ;
    try {
        user.findAll({
            where: {
                isactive: active
            }
        }).then(users => {
            return res.status(200).json(users);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.getUser = (req, res, next) => {
    let id = req.body.id;
    try {
        db.execute("SELECT `user`.id,`user`.username,`user`.nic,`user`.fullname,`user`.mobile,`user`.type,`user`.isactive,`user`.createdAt,`user`.updatedAt,utype.utype FROM `user` INNER JOIN utype ON `user`.type=utype.id WHERE `user`.id=" + id, (err, rows, fildData) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
        //  user.findAll({
        //      where: {
        //          id: id
        //      }
        //  }).then(users => {
        //      return res.status(200).json(users);
        //  });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


exports.getUserTypes = (req, res, next) => {
    try {
        db.execute("SELECT utype.id, utype.utype FROM utype", (error, rows, fildData) => {
            if (!error) {
                res.send(rows);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


exports.changeUserType = (req, res, next) => {
    try {
        console.log(req.body.type +   "        "+ req.body.uid );
        user.update(
            { type: req.body.type },
            { returning: true, where: { id: req.body.uid } }
        ).then((rowsUpdated) => {
            res.send(rowsUpdated)
        }).catch(next)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};