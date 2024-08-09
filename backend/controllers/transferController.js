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
        const transfersAtlas = await TransferModel1.find();
        const transfersCompass = await TransferModel2.find();

        const transfers = transfersAtlas.map(atlasTransfer => {
            const compassTransfer = transfersCompass.find(compass => compass.transferDate === atlasTransfer.transferDate && compass.patient.equals(atlasTransfer.patient));
            return {
                id1: atlasTransfer._id,
                id2: compassTransfer ? compassTransfer._id : null,
                patient: atlasTransfer.patient,
                fromHospital: atlasTransfer.fromHospital,
                toHospital: atlasTransfer.toHospital,
                transferDate: atlasTransfer.transferDate,
            };
        });

        res.status(200).send({ transfers });
    } catch (error) {
        res.status(500).send({ message: error.message });
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
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for updating.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const transferData = req.body;

        const transfer1 = await TransferModel1.findByIdAndUpdate(atlasId, transferData, { new: true });
        const transfer2 = await TransferModel2.findByIdAndUpdate(compassId, transferData, { new: true });
        if (!transfer1 || !transfer2) {
            return res.status(404).send({ message: 'Transfer not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Transfer data updated in both databases' });
        console.log('Updated in MongoDB Atlas:', transfer1);
        console.log('Updated in MongoDB Compass:', transfer2);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteTransfer = async (req, res) => {
    try {
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for deletion.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const atlasResult = await TransferModel1.findByIdAndDelete(atlasId);
        const compassResult = await TransferModel2.findByIdAndDelete(compassId);
        if (!atlasResult || !compassResult) {
            return res.status(404).send({ message: 'Transfer not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Transfer deleted from both databases' });
        console.log('Deleted from MongoDB Atlas:', atlasId);
        console.log('Deleted from MongoDB Compass:', compassId);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
