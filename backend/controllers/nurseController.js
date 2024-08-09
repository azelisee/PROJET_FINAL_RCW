const initNurseModel = require('../models/nurseModel');
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
        const email = nurseData.email;

        const existingNurseAtlas = await NurseModel1.findOne({ email });
        const existingNurseCompass = await NurseModel2.findOne({ email });
        if (existingNurseAtlas || existingNurseCompass) {
            return res.status(400).send({ message: 'Error: A nurse with this email already exists in one of the databases.' });
        }
        const nurse1 = new NurseModel1(nurseData);
        const nurse2 = new NurseModel2(nurseData);

        await nurse1.save();
        await nurse2.save();

        res.status(201).send({ message: 'Congratulations : A New Nurse registered !!!' });
        console.log('Recorded in MongoDB Atlas : ', nurse1);
        console.log('\nRecorded in MongoDB Compass : ', nurse2);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getNurses = async (req, res) => {
    try {
        const nursesAtlas = await NurseModel1.find();
        const nursesCompass = await NurseModel2.find();

        const nurses = nursesAtlas.map(atlasNurse => {
            const compassNurse = nursesCompass.find(compass => compass.email === atlasNurse.email);
            return {
                id1: atlasNurse._id,
                id2: compassNurse ? compassNurse._id : null,
                name: atlasNurse.name,
                email: atlasNurse.email,
            };
        });
        res.status(200).send({ nurses });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getNurseById = async (req, res) => {
    try {
        const nurse1 = await NurseModel1.findById(req.params.id);
        //const nurse2 = await NurseModel2.findById(req.params.id);

        if (nurse1) {
            res.status(200).json({nurse1 : nurse1});
            console.log(`Data from MongoDB Atlas : ${nurse1}`);
            //console.log(`Data from MongoDB Compass : ${nurse2}`);
        } else {
            res.status(404).json({ error: 'Nurse not found' });
            console.log('Nurse not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log( error);
    }
};
exports.updateNurse = async (req, res) => {
    try {
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for updating.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const nurseData = req.body;

        const nurse1 = await NurseModel1.findByIdAndUpdate(atlasId, nurseData, { new: true });
        const nurse2 = await NurseModel2.findByIdAndUpdate(compassId, nurseData, { new: true });
        if (!nurse1 || !nurse2) {
            return res.status(404).send({ message: 'Nurse not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Nurse data updated in both databases' });
        console.log('Updated in MongoDB Atlas:', nurse1);
        console.log('Updated in MongoDB Compass:', nurse2);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteNurse = async (req, res) => {
    try {
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for deletion.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const atlasResult = await NurseModel1.findByIdAndDelete(atlasId);
        const compassResult = await NurseModel2.findByIdAndDelete(compassId);
        if (!atlasResult || !compassResult) {
            return res.status(404).send({ message: 'Nurse not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Nurse deleted from both databases' });
        console.log('Deleted from MongoDB Atlas:', atlasId);
        console.log('Deleted from MongoDB Compass:', compassId);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
