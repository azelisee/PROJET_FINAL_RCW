const initDoctorModel = require('../models/doctorModel');
const connectToDatabase = require('../config/databases');

let db, DoctorModel;

const initDatabases = async () => {
    db = await connectToDatabase();
    DoctorModel = initDoctorModel(db);
};
initDatabases();

exports.createDoctor = async (req, res) => {
    try {
        const existingDoctor = await DoctorModel.findOne({email : req.body.email});
        if (existingDoctor) {
            return res.status(400).send('A doctor with this email already exists');
        }
        const doctor = new DoctorModel(req.body);
        await doctor.save();
        res.status(201).json('New Doctor recorded', doctor);
        console.log('Recorded in MongoDB Atlas : ', doctor);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.getDoctors = async (req, res) => {
    try {
        const doctors = await DoctorModel.find();
        res.json(doctors);
        console.log(`Records from MongoDB Atlas:`, doctors);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await DoctorModel.findById(req.params.id);
        res.json(doctor);
        console.log(`Record from MongoDB Atlas:`, doctor);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error);
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
            return res.status(404).send('Doctor not found');
        }
        res.json('Doctor updated',doctor);
        console.log('Updated in MongoDB Atlas:', doctor);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const id = await DoctorModel.findByIdAndDelete(req.params.id);
        if (!id) {
            return res.status(404).send('Doctor not found');
        }
        res.status(200).send('Doctor deleted',id);
        console.log('Deleted from MongoDB Atlas:', id);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
