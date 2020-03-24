const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const address = require('../controller/location/address');


router.post("/getDistricts", address.getDistrics);
router.post("/getCitys", address.getCitys);



module.exports = router;

