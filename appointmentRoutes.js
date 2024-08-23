const express = require('express');
const router = express.Router();
const { requestAppointment, confirmAppointment } = require('../controllers/appointmentController');

// Route to handle appointment requests
router.post('/request-appointment', requestAppointment);

// Route to handle appointment confirmations
router.post('/confirm-appointment', confirmAppointment);

module.exports = router;
