const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/', doctorController.createDoctor);

router.get('/', doctorController.getDoctors);

router.get('/:id', doctorController.getDoctorById);

router.put('/:id1,:id2', doctorController.updateDoctor);

router.delete('/:id1,:id2', doctorController.deleteDoctor);

module.exports = router;
