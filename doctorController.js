const initDoctorModel = require('../models/doctorModel');
const connectToDatabase = require('../config/databases');
const bcrypt = require('bcrypt');

let db, DoctorModel;

const initDatabases = async () => {
    db = await connectToDatabase();
    DoctorModel = initDoctorModel(db);
};
initDatabases();

exports.createDoctor = async (req, res) => {
    try {
        const existingDoctor = await DoctorModel.findOne({ email: req.body.email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'A doctor with this email already exists' });
        }
        const doctor = new DoctorModel(req.body);
        await doctor.save();

        console.log('Recorded in MongoDB Atlas : ', doctor);
        res.status(201).json({ message: 'New Doctor recorded', doctor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getDoctors = async (req, res) => {
    try {
        const doctors = await DoctorModel.find();
        console.log(`Records from MongoDB Atlas:`, doctors);
        res.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await DoctorModel.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        console.log(`Record from MongoDB Atlas:`, doctor);
        res.status(200).json(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }
        const doctor = await DoctorModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        console.log('Updated in MongoDB Atlas:', doctor);
        res.status(200).json({ message: 'Doctor updated', doctor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await DoctorModel.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        console.log('Deleted from MongoDB Atlas:', doctor);
        res.status(200).json({ message: 'Doctor deleted', doctor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
