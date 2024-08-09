const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/', roomController.createRoom);

router.get('/', roomController.getRooms);

router.get('/:id', roomController.getRoomById);

router.put('/:id1,:id2', roomController.updateRoom);

router.delete('/:id1,:id2', roomController.deleteRoom);

module.exports = router;
