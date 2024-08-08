const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

router.post('/', hospitalController.createHospital);

router.get('/', hospitalController.getHospitals);

router.get('/:id', hospitalController.getHospitalById);

router.put('/:id,:id', hospitalController.updateHospital);

router.delete('/:id,:id', hospitalController.deleteHospital);

module.exports = router;
