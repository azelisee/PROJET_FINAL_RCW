const Patient = require('../models/patient');

exports.createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json({
            status: "success",
            message: `The patient ${patient.name} has been registered successfully!`,
            data: patient
        });
        console.log(patient);
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
        console.log(error);
    }
};


exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate('currentRoom');
        res.status(201).json({
            status: "success",
            message: `Showing ${patients.length}`,
            data: patients
        });
        console.log(patients);
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
        console.log(error);
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('currentRoom');
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(201).json({
            status: "success",
            message: `Your patient has been successfully found !`,
            data: patient
        });
        console.log(patient);
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
        console.log(error);
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(201).json({
            status: "success",
            message: `Your patient has been updated !`,
            data: patient
        });
        console.log(patient);
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
        console.log(error);
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(201).json({
            status: "success",
            message: `The patient ${patient.name} has been removed!`,
            data: patient
        });
        console.log(patient);
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
        console.log(error);
    }
};
