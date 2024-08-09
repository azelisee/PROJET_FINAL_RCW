const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurseController');

router.post('/', nurseController.createNurse);

router.get('/', nurseController.getNurses);

router.get('/:id', nurseController.getNurseById);

router.put('/:id1,:id2', nurseController.updateNurse);

router.delete('/:id1,:id2', nurseController.deleteNurse);

module.exports = router;
