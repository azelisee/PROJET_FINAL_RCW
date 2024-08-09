const initPatientModel = require('../models/patientModel');
const { connectToDatabase1, connectToDatabase2 } = require('../config/databases');

let db1, db2, PatientModel1, PatientModel2;

const initDatabases = async () => {
    db1 = await connectToDatabase1();
    db2 = await connectToDatabase2();
    PatientModel1 = initPatientModel(db1);
    PatientModel2 = initPatientModel(db2);
};
initDatabases();

exports.createPatient = async (req, res) => {
    try {
        const patientData = req.body;
        const patient1 = new PatientModel1(patientData);
        const patient2 = new PatientModel2(patientData);

        await patient1.save();
        await patient2.save();

        res.status(201).send({ message: 'Success : A new Patient has been admitted !!!'});
        console.log('Recorded in MongoDB Atlas : ', patient1);
        console.log('\nRecorded in MongoDB Compass : ', patient2);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.updatePatient = async (req, res) => {
    try {
        const patientData = req.body;
        const ids = req.params.id.split(',');
        console.log('\nExtracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('HELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];

        const patient1 = await PatientModel1.findByIdAndUpdate(atlasId, patientData);
        const patient2 = await PatientModel2.findByIdAndUpdate(compassId, patientData);

        res.status(200).send({ message: 'Update successful : Everything is alright !!!'});
        console.log('Recorded in MongoDB Atlas : ', patient1);
        console.log('\nRecorded in MongoDB Compass : ', patient2);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.deletePatient = async (req, res) => {
    try {
        const ids = req.params.id.split(',');
        console.log('\nExtracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('HELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];

        await PatientModel1.findByIdAndDelete(atlasId);
        await PatientModel2.findByIdAndDelete(compassId);

        res.status(200).send({ message: 'Success : Patient cleared from databases' });
        console.log('Recorded in MongoDB Atlas : ', atlasId);
        console.log('\nRecorded in MongoDB Compass : ', compassId);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.getPatients = async (req, res) => {
    try {
        const patients1 = await PatientModel1.find();
        //const patients2 = await PatientModel2.find();

        if (patients1.length > 0) {
            res.status(200).json({ patients: patients1 });
            console.log(`Records from MongoDB Atlas:`, patients1);
            //console.log(`Records from MongoDB Compass : ${patients2}`);
        } else {
            res.status(404).json({ error: 'No patients found' });
            console.log('No patients found');
        }

    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error);
    }
};
exports.getPatientById = async (req, res) => {
    try {
        const patient1 = await PatientModel1.findById(req.params.id);
        //const patient2 = await PatientModel2.findById(req.params.id);

        if (patient1) {
            res.status(200).json({ patient: patient1 });
            console.log(`Record from MongoDB Atlas:`, patient1);
            //console.log(`Record from MongoDB Compass : ${patient2}`);
        } else {
            res.status(404).json({ error: 'No patients found' });
            console.log('No patients found');
        }
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error);
    }
};

