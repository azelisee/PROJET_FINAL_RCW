const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');

router.post('/', transferController.createTransfer);

router.get('/', transferController.getTransfers);

router.get('/:id', transferController.getTransferById);

router.put('/:id1,:id2', transferController.updateTransfer);

router.delete('/:id1,:id2', transferController.deleteTransfer);

module.exports = router;
