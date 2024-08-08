const initTransferModel = require('../models/transfer');
const { connectToDatabase1, connectToDatabase2 } = require('../config/databases');

let db1, db2, TransferModel1, TransferModel2;

const initDatabases = async () => {
    db1 = await connectToDatabase1();
    db2 = await connectToDatabase2();
    TransferModel1 = initTransferModel(db1);
    TransferModel2 = initTransferModel(db2);
};
initDatabases();

exports.createTransfer = async (req, res) => {
    try {
        const transferData = req.body;
        const transfer1 = new TransferModel1(transferData);
        const transfer2 = new TransferModel2(transferData);

        await transfer1.save();
        await transfer2.save();

        res.status(201).send({ message: 'Transfer created in both databases' });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getTransfers = async (req, res) => {
    try {
        const transfers1 = await TransferModel1.find();
        const transfers2 = await TransferModel2.find();

        if (transfers1) {
            res.status(200).json(`Records from MongoDB Atlas : ${transfers1}`);
            console.log(`Records from MongoDB Atlas : ${transfers1}`);
        } else if (transfers2) {
            res.status(200).json(`Records from MongoDB Compass : ${transfers2}`);
            console.log(`Records from MongoDB Compass : ${transfers2}`);
        } else {
            res.status(404).json({ error: 'Transfer not found' });
            console.log('Transfer not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getTransferById = async (req, res) => {
    try {
        const transfer1 = await TransferModel1.findById(req.params.id);
        const transfer2 = await TransferModel2.findById(req.params.id);

        if (transfer1) {
            res.status(200).json(`Data from MongoDB Atlas : ${transfer1}`);
            console.log(`Data from MongoDB Atlas : ${transfer1}`);
        } else if (transfer2) {
            res.status(200).json(`Data from MongoDB Compass : ${transfer2}`);
            console.log(`Data from MongoDB Compass : ${transfer2}`);
        } else {
            res.status(404).json({ error: 'Transfer not found' });
            console.log('Transfer not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.updateTransfer = async (req, res) => {
    try {
        const transferData = req.body;
        const transferId = req.params.id;

        await TransferModel1.findByIdAndUpdate(transferId, transferData);
        await TransferModel2.findByIdAndUpdate(transferId, transferData);

        res.status(200).send({ message: 'Transfer updated in both databases' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.deleteTransfer = async (req, res) => {
    try {
        const transferId = req.params.id;

        await TransferModel1.findByIdAndDelete(transferId);
        await TransferModel2.findByIdAndDelete(transferId);

        res.status(200).send({ message: 'Transfer removed from both databases' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
