const initPatientModel = require('../models/patientModel');
const connectToDatabase  = require('../config/databases');

let db, PatientModel;
const initDatabases = async () => {
    db = await connectToDatabase();
    PatientModel = initPatientModel(db);
};
initDatabases();

exports.createPatient = async (req, res) => {
    try {
        const existingPatient = await PatientModel.findOne({ email: req.body.email });
        if (existingPatient) {
            return res.status(400).send('A patient with this email already exists');
        }
        const patient = new PatientModel(req.body);
        await patient.save();
        console.log('Recorded in MongoDB Atlas: ', patient);
        res.status(201).send({ message: 'Success: A new patient has been admitted!', patient });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const updatedPatient = await PatientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedPatient) {
            res.status(200).json(updatedPatient);
        } else {
            res.status(404).json('Patient not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPatients = async (req, res) => {
    try {
        const patients = await PatientModel.find();
        res.status(200).json(patients);
        console.log(`Records from MongoDB Atlas:`, patients);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.getPatientById = async (req, res) => {
    try {
        const patient = await PatientModel.findById(req.params.id);
        res.json(patient);
        console.log(`Record from MongoDB Atlas:`, patient);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error);
    }
};
exports.deletePatient = async (req, res) => {
    try {
        const id = await PatientModel.findByIdAndDelete(req.params.id);
        if (id) {
            res.status(200).json('Patient deleted successfully : ',id);
            console.log('Patient deleted successfully : ',id);
        } else {
            res.status(404).json('Patient not found');
        }
    } catch (error) {
        res.status(500).json('An error occurred while deleting the patient');
        console.error('Error during patient deletion:', error);
    }
};



