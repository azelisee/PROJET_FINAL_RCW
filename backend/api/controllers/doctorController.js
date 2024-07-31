const Doctor = require('../models/doctor');

exports.createDoctor = async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json(doctor);
        console.log(doctor);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('department');
        res.status(200).json(doctors);
        console.log(doctors);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('department');
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json(doctor);
        console.log(doctors)
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json(doctor);
        console.log(doctor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
        console.log(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
