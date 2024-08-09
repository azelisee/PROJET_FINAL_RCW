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
        const email = patientData.email;

        const existingPatientAtlas = await PatientModel1.findOne({ email });
        const existingPatientCompass = await PatientModel2.findOne({ email });

        if (existingPatientAtlas || existingPatientCompass) {
            return res.status(400).send({ message: 'Error: A patient with this email already exists in one or both databases.' });
        }
        const patient1 = new PatientModel1(patientData);
        const patient2 = new PatientModel2(patientData);

        await patient1.save();
        await patient2.save();
        res.status(201).send({ message: 'Success : A new Patient has been admitted !!!' });
        console.log('Recorded in MongoDB Atlas : ', patient1);
        console.log('\nRecorded in MongoDB Compass : ', patient2);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for updating.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const patientData = req.body;

        const patient1 = await PatientModel1.findByIdAndUpdate(atlasId, patientData, { new: true });
        const patient2 = await PatientModel2.findByIdAndUpdate(compassId, patientData, { new: true });
        if (!patient1 || !patient2) {
            return res.status(404).send({ message: 'Patient not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Update successful: Patient data updated in both databases.' });
        console.log('Updated in MongoDB Atlas:', patient1);
        console.log('Updated in MongoDB Compass:', patient2);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.getPatients = async (req, res) => {
    try {
        const patientsAtlas = await PatientModel1.find({});
        const patientsCompass = await PatientModel2.find({});

        // Associez chaque patient d'Atlas à un patient de Compass par un champ commun
        const patients = patientsAtlas.map(atlasPatient => {
            const compassPatient = patientsCompass.find(compass => compass.email === atlasPatient.email);
            return {
                id1: atlasPatient._id,
                id2: compassPatient ? compassPatient._id : null,
                name: atlasPatient.name,
                email: atlasPatient.email,
            };
        });
        res.status(200).send({ patients });
    } catch (error) {
        res.status(500).send({ message: error.message });
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
            res.status(404).json({ error: 'No patient found' });
            console.log('No patient found');
        }
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error);
    }
};
exports.deletePatient = async (req, res) => {
    try {
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for deletion.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const atlasResult = await PatientModel1.findByIdAndDelete(atlasId);
        const compassResult = await PatientModel2.findByIdAndDelete(compassId);
        if (!atlasResult || !compassResult) {
            return res.status(404).send({ message: 'Patient not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Patient successfully deleted from both databases.' });
        console.log('Deleted from MongoDB Atlas:', atlasId);
        console.log('Deleted from MongoDB Compass:', compassId);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


