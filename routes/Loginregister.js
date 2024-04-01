const express = require('express');
const router = express.Router();
const { Register, Login, PassForgot, OtpSent, OtpVerify } = require('../Controller/Loginregister');

router.post('/Register', Register);
router.post('/PassForgot', PassForgot);
router.post('/OtpSent', OtpSent);
router.post('/OtpVerify', OtpVerify);
router.get('/Login', Login);

module.exports = router;