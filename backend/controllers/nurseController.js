const initNurseModel = require('../models/nurse');
const { connectToDatabase1, connectToDatabase2 } = require('../config/databases');

let db1, db2, NurseModel1, NurseModel2;

const initDatabases = async () => {
    db1 = await connectToDatabase1();
    db2 = await connectToDatabase2();
    NurseModel1 = initNurseModel(db1);
    NurseModel2 = initNurseModel(db2);
};
initDatabases();

exports.createNurse = async (req, res) => {
    try {
        const nurseData = req.body;
        const nurse1 = new NurseModel1(nurseData);
        const nurse2 = new NurseModel2(nurseData);

        await nurse1.save();
        await nurse2.save();

        res.status(201).send({ message: 'Nurse created in both databases' });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getNurses = async (req, res) => {
    try {
        const nurses1 = await NurseModel1.find();
        const nurses2 = await NurseModel2.find();

        if (nurses1) {
            res.status(200).json(`Records from MongoDB Atlas : ${nurses1}`);
            console.log(`Records from MongoDB Atlas : ${nurses1}`);
        } else if (nurses2) {
            res.status(200).json(`Records from MongoDB Compass : ${nurses2}`);
            console.log(`Records from MongoDB Compass : ${nurses2}`);
        } else {
            res.status(404).json({ error: 'Nurse not found' });
            console.log('Nurse not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getNurseById = async (req, res) => {
    try {
        const nurse1 = await NurseModel1.findById(req.params.id);
        const nurse2 = await NurseModel2.findById(req.params.id);

        if (nurse1) {
            res.status(200).json(`Data from MongoDB Atlas : ${nurse1}`);
            console.log(`Data from MongoDB Atlas : ${nurse1}`);
        } else if (patient2) {
            res.status(200).json(`Data from MongoDB Compass : ${nurse2}`);
            console.log(`Data from MongoDB Compass : ${nurse2}`);
        } else {
            res.status(404).json({ error: 'Patient not found' });
            console.log('Patient not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log( error);
    }
};
exports.updateNurse = async (req, res) => {
    try {
        const nurseData = req.body;
        const ids = req.params.id.split(',');
        console.log('Extracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('\nHELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];

        await NurseModel1.findByIdAndUpdate(atlasId, nurseData);
        await NurseModel2.findByIdAndUpdate(compassId, nurseData);

        res.status(200).send({ message: 'Nurse updated in both databases' });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.deleteNurse = async (req, res) => {
    try {
        const ids = req.params.id.split(',');
        console.log('Extracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('\nHELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];

        await NurseModel1.findByIdAndDelete(atlasId);
        await NurseModel2.findByIdAndDelete(compassId);

        res.status(200).send({ message: 'Nurse deleted from both databases' });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
