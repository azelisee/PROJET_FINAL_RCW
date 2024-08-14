const initTransferModel = require('../models/transferModel');
const connectToDatabase  = require('../config/databases');

let db, TransferModel;
const initDatabases = async () => {
    db = await connectToDatabase();
    TransferModel = initTransferModel(db);
};
initDatabases();

exports.createTransfer = async (req, res) => {
    try {
        const transfer = new TransferModel(req.body);
        await transfer.save();
        res.status(201).send('Success : transfer made !!!',transfer);
        console.log('Recorded in MongoDB Atlas : ',transfer);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getTransfers = async (req, res) => {
    try {
        const transfers = await TransferModel.find();
        res.status(200).send(transfers);
        console.log('Records from MongoDB Atlas : ',transfers);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getTransferById = async (req, res) => {
    try {
        const transfer = await TransferModel.findById(req.params.id);
        if (transfer) {
            res.status(200).json(transfer);
            console.log(`Record from MongoDB Atlas:`, transfer);
        } else {
            res.status(404).json({ error: 'No transfer found' });
            console.log('No transfer found');
        }
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error);
    }
};

exports.updateTransfer = async (req, res) => {
    try {
        const transfer = await TransferModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!transfer) {
            return res.status(404).send('Transfer not found');
        }
        res.status(200).send('Transfer data updated :',transfer);
        console.log('Updated in MongoDB Atlas:', transfer);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteTransfer = async (req, res) => {
    try {
        const id = await TransferModel.findByIdAndDelete(req.params.id);
        if (!id) {
            return res.status(404).send({ message: 'Transfer not found' });
        }
        res.status(200).send('Transfer deleted : ',id);
        console.log('Deleted from MongoDB Atlas:', id);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
