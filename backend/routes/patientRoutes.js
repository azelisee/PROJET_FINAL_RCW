const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/', patientController.createPatient);

router.get('/', patientController.getPatients);

router.get('/:id', patientController.getPatientById);

router.put('/:id,:id', patientController.updatePatient);

router.delete('/:id,:id', patientController.deletePatient);

module.exports = router;
