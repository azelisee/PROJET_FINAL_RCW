const express = require('express');
const router = express.Router();
const { loginDoctor, loginNurse, loginStaff } = require('../controllers/authController');

router.post('/login/doctor', loginDoctor);

router.post('/login/nurse', loginNurse);

router.post('/login/staff', loginStaff);

module.exports = router;
