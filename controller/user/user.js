const con = require('../../util/sequl');
const user = con.import('../../models/user');
const utype = con.import('../../models/utype');
const priv = con.import('../../models/privilages');
const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getPrivilages = (req, res, next) => {
    try {
        priv.findAll({
            where: {
                status: 1
            }
        }).then(privilages => {
            return res.status(200).json(privilages);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
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