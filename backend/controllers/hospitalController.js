const initHospitalModel = require('../models/hospitalModel');
const connectToDatabase = require('../config/databases');

let db, HospitalModel;
const initDatabases = async () => {
    db = await connectToDatabase();
    HospitalModel = initHospitalModel(db);
};
initDatabases();

exports.createHospital = async (req, res) => {
    try {
        const existingAddress = await HospitalModel.findOne({ address: req.body.address});
        const existingPhone = await HospitalModel.findOne({ phone: req.body.phone });
        if (existingAddress || existingPhone) {
            return res.status(400).json({ message: 'Hospital with this address or phone number already exists' });
        }
        const hospital = new HospitalModel(req.body);
        await hospital.save();

        console.log('Recorded in MongoDB Atlas : ', hospital);
        res.status(201).json({ message: 'New Hospital recorded', hospital });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getHospitals = async (req, res) => {
    try {
        const hospitals = await HospitalModel.find();
        console.log('Records from MongoDB: ', hospitals);
        res.status(200).json(hospitals);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getHospitalById = async (req, res) => {
    try {
        const hospital = await HospitalModel.findById(req.params.id);
        if (hospital) {
            console.log(`Record from MongoDB Atlas:`, hospital);
            res.status(200).json(hospital);
        } else {
            console.log('No hospital found');
            res.status(404).json({ message: 'No hospital found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateHospital = async (req, res) => {
    try {
        const hospital = await HospitalModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        console.log('Updated in MongoDB Atlas:', hospital);
        res.status(200).json({ message: 'Hospital data updated', hospital });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteHospital = async (req, res) => {
    try {
        const id = req.params.id;
        const hospital = await HospitalModel.findByIdAndDelete({_id: id});
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        console.log('Deleted from MongoDB Atlas:', hospital);
        res.status(200).json({ message: 'Hospital deleted', hospital });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
