const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurseController');

router.post('/', nurseController.createNurse);

router.get('/', nurseController.getNurses);

router.get('/:id', nurseController.getNurseById);

router.put('/:id,:id', nurseController.updateNurse);

router.delete('/:id,:id', nurseController.deleteNurse);

module.exports = router;
