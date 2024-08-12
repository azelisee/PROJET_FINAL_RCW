const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const initDoctorModel = require('../models/doctorModel');
const initNurseModel = require('../models/nurseModel');

exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role === 'doctor') {
                const Doctor = initDoctorModel(req.conn1);
                req.user = await Doctor.findById(decoded.id).select('-password');
            } else if (decoded.role === 'nurse') {
                const Nurse = initNurseModel(req.conn1);
                req.user = await Nurse.findById(decoded.id).select('-password');
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});
