const initTransferModel = require('../models/transferModel');
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

        res.status(201).send({ message: 'Success : transfer made !!!' });
        console.log('Recorded in MongoDB Atlas : ',transfer1);
        console.log('\nRecorded in MongoDB Compass : ',transfer2);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getTransfers = async (req, res) => {
    try {
        const transfers1 = await TransferModel1.find();
        //const transfers2 = await TransferModel2.find();

        if (transfers1.length > 0) {
            res.status(200).json({transfers1 : transfers1});
            console.log(`Records from MongoDB Atlas : ${transfers1}`);
            //console.log(`Records from MongoDB Compass : ${transfers2}`);
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
        //const transfer2 = await TransferModel2.findById(req.params.id);

        if (transfer1) {
            res.status(200).json({ transfer1 : transfer1 });
            console.log(`Record from MongoDB Atlas:`, transfer1);
            //console.log(`Record from MongoDB Compass : ${transfer2}`);
        } else {
            res.status(404).json({ error: 'No transfer found' });
            console.log('No transfer found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.updateTransfer = async (req, res) => {
    try {
        const transferData = req.body;
        const ids = req.params.id.split(',');
        console.log('\nExtracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('HELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];

        const transfer1 = await TransferModel1.findByIdAndUpdate(atlasId, transferData);
        const transfer2 = await TransferModel2.findByIdAndUpdate(compassId, transferData);

        res.status(200).send({ message: 'Success : transfer data well updated !!!' });
        console.log('Recorded in MongoDB Atlas : ',transfer1);
        console.log('\nRecorded in MongoDB Compass : ',transfer2);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.deleteTransfer = async (req, res) => {
    try {
        const ids = req.params.id.split(',');
        console.log('\nExtracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('HELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];
        await TransferModel1.findByIdAndDelete(atlasId);
        await TransferModel2.findByIdAndDelete(compassId);

        res.status(200).send({ message: 'Success : the transfer has been cancelled !!!' });
        console.log('Recorded in MongoDB Atlas : ', atlasId);
        console.log('\nRecorded in MongoDB Compass : ', compassId);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
