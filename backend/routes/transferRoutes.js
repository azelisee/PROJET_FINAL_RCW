const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');

router.post('/', transferController.createTransfer);

router.get('/', transferController.getTransfers);

router.get('/:id', transferController.getTransferById);

router.put('/:id,:id', transferController.updateTransfer);

router.delete('/:id,:id', transferController.deleteTransfer);

module.exports = router;
