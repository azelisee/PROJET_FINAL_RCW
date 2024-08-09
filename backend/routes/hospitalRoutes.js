const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

router.post('/', hospitalController.createHospital);

router.get('/', hospitalController.getHospitals);

router.get('/:id', hospitalController.getHospitalById);

router.put('/:id1,:id2', hospitalController.updateHospital);

router.delete('/:id1,:id2', hospitalController.deleteHospital);

module.exports = router;
