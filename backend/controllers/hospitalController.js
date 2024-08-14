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
        const existingHospital = await HospitalModel.findOne(req.body.address, req.body.phone);
        if (existingHospital) {
            return res.status(400).send('hospital with this address and phone number already exists');
        }
        const hospital = new HospitalModel1(req.body);
        await hospital.save();
        res.status(201).send('New Hospital recorded', hospital);
        console.log('Recorded in MongoDB Atlas : ', hospital);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.getHospitals = async (req, res) => {
    try {
        const hospitals = await HospitalModel.find();
        res.status(200).send(hospitals);
        console.log('Records from mongoDB : ',hospitals);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getHospitalById = async (req, res) => {
    try {
        const hospital = await HospitalModel.findById(req.params.id);
        if (hospital) {
            res.status(200).json(hospital);
            console.log(`Record from MongoDB Atlas:`, hospital);
        } else {
            res.status(404).json({ error: 'No hospital found' });
            console.log('No hospital found');
        }
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error);
    }
};

exports.updateHospital = async (req, res) => {
    try {
        const hospital = await HospitalModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hospital) {
            return res.status(404).send({ message: 'Hospital not found' });
        }
        res.status(200).send('Hospital data updated',hospital);
        console.log('Updated in MongoDB Atlas:', hospital);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteHospital = async (req, res) => {
    try {
        const id = await HospitalModel.findByIdAndDelete(req.params.id);
        if (!id) {
            return res.status(404).send('Hospital not found');
        }
        res.status(200).send('Hospital deleted : ',id);
        console.log('Deleted from MongoDB Atlas:', id);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
