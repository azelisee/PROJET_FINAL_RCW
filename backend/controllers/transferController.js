const initTransferModel = require('../models/transferModel');
const connectToDatabase = require('../config/databases');

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

        console.log('Recorded in MongoDB Atlas:', transfer);
        res.status(201).json({ message: 'Success: transfer made!', transfer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getTransfers = async (req, res) => {
    try {
        const transfers = await TransferModel.find();
        console.log('Records from MongoDB Atlas:', transfers);
        res.status(200).json(transfers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getTransferById = async (req, res) => {
    try {
        const transfer = await TransferModel.findById(req.params.id);
        if (transfer) {
            console.log('Record from MongoDB Atlas:', transfer);
            res.status(200).json(transfer);
        } else {
            console.log('No transfer found');
            res.status(404).json({ message: 'No transfer found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateTransfer = async (req, res) => {
    try {
        const transfer = await TransferModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (transfer) {
            console.log('Updated in MongoDB Atlas:', transfer);
            res.status(200).json({ message: 'Transfer data updated', transfer });
        } else {
            console.log('Transfer not found');
            res.status(404).json({ message: 'Transfer not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTransfer = async (req, res) => {
    try {
        const transfer = await TransferModel.findByIdAndDelete(req.params.id);
        if (transfer) {
            console.log('Deleted from MongoDB Atlas:', transfer);
            res.status(200).json({ message: 'Transfer deleted', transfer });
        } else {
            console.log('Transfer not found');
            res.status(404).json({ message: 'Transfer not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
