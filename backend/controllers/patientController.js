const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const initPatientModel = require('../models/patientModel');
const connectToDatabase  = require('../config/databases');
const dotenv = require('dotenv');
dotenv.config({path: '../config/.env'});

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
            res.send ('A patient with this email already exists');
        }
        const patient = new PatientModel(req.body);
        await patient.save();

        console.log('Recorded in MongoDB Atlas: ', patient);
        res.send('Success: A new patient has been admitted!', patient);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userRole = decoded.role;

        const allowedFieldsForPatient = ['name', 'title', 'age', 'email', 'password', 'tel', 'address', 'dateOfBirth', 'gender'];
        const allowedFieldsForDoctor = ['bloodType', 'medicalFolders', 'consultationHistory', 'treatments', 'currentRoom'];

        let updateData = req.body;
        if (userRole === 'Patient') {
            // Filter the updateData to include only allowed fields for patients
            updateData = Object.keys(updateData)
                .filter(key => allowedFieldsForPatient.includes(key))
                .reduce((obj, key) => {
                    obj[key] = updateData[key];
                    return obj;
                }, {});
        } else if (userRole === 'Doctor') {
            // Filter the updateData to include only allowed fields for doctors
            updateData = Object.keys(updateData)
                .filter(key => allowedFieldsForDoctor.includes(key))
                .reduce((obj, key) => {
                    obj[key] = updateData[key];
                    return obj;
                }, {});
        } else {
            res.send('Unauthorized to update patient data');
        }
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }
        const updatedPatient = await PatientModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (updatedPatient) {
            console.log('Patient has been updated : ', updatedPatient);
            res.send ('Patient has been updated : ',updatedPatient);
        } else {
            console.log('Patient not found');
            res.send ('Patient not found');
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

exports.getPatients = async (req, res) => {
    try {
        const patients = await PatientModel.find();
        console.log(`Records from MongoDB Atlas:`, patients);
        res.send(patients);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};
exports.getPatientById = async (req, res) => {
    try {
        const patient = await PatientModel.findById(req.params.id);
        console.log(`Record from MongoDB Atlas:`, patient);
        res.send (patient);
    } catch (error) {
        console.log(error);
        res.send ({error: error.message});
    }
};
exports.deletePatient = async (req, res) => {
    try {
        const id = await PatientModel.findByIdAndDelete(req.params.id);
        if (id) {
            console.log('Patient deleted successfully : ',id);
            res.send ('Patient deleted successfully : ',id);
        } else {
            console.error('Patient not found', error);
            res.send ('Patient not found');
        }
    } catch (error) {
        console.error('Error during patient deletion:', error);
        res.send ('An error occurred while deleting the patient');
    }
};



