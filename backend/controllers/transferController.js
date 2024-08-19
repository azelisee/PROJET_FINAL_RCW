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

        console.log('Recorded in MongoDB Atlas : ',transfer);
        res.send('Success : transfer made !!!',transfer);
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
};
exports.getTransfers = async (req, res) => {
    try {
        const transfers = await TransferModel.find();
        console.log('Records from MongoDB Atlas : ',transfers);
        res.send(transfers);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};

exports.getTransferById = async (req, res) => {
    try {
        const transfer = await TransferModel.findById(req.params.id);
        if (transfer) {
            console.log(`Record from MongoDB Atlas:`, transfer);
            res.send(transfer);
        } else {
            console.log('No transfer found');
            res.send('No transfer found');
        }
    } catch (error) {
        console.log(error);
        res.send({error: error.message});
    }
};

exports.updateTransfer = async (req, res) => {
    try {
        const transfer = await TransferModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!transfer) {
            res.send('Transfer not found');
        }
        console.log('Updated in MongoDB Atlas:', transfer);
        res.send('Transfer data updated :',transfer);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};

exports.deleteTransfer = async (req, res) => {
    try {
        const id = await TransferModel.findByIdAndDelete(req.params.id);
        if (!id) {
            res.send('Transfer not found');
        }
        console.log('Deleted from MongoDB Atlas:', id);
        res.send('Transfer deleted : ',id);
    } catch (error) {
        console.log('Deleted from MongoDB Atlas:', id);
        res.send({ message: error.message });
    }
};
