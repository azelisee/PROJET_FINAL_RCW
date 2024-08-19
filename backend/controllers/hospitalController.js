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
            res.send('hospital with this address and phone number already exists');
        }
        const hospital = new HospitalModel(req.body);
        await hospital.save();

        console.log('Recorded in MongoDB Atlas : ', hospital);
        res.send('New Hospital recorded', hospital);
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
};
exports.getHospitals = async (req, res) => {
    try {
        const hospitals = await HospitalModel.find();
        console.log('Records from mongoDB : ',hospitals);
        res.send(hospitals);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};
exports.getHospitalById = async (req, res) => {
    try {
        const hospital = await HospitalModel.findById(req.params.id);
        if (hospital) {
            console.log(`Record from MongoDB Atlas:`, hospital);
            res.send(hospital);
        } else {
            console.log('No hospital found');
            res.send('No hospital found');
        }
    } catch (error) {
        console.log(error);
        res.send({error: error.message});
    }
};

exports.updateHospital = async (req, res) => {
    try {
        const hospital = await HospitalModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hospital) {
            res.send('Hospital not found');
        }
        console.log('Updated in MongoDB Atlas:', hospital);
        res.send('Hospital data updated',hospital);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};

exports.deleteHospital = async (req, res) => {
    try {
        const id = await HospitalModel.findByIdAndDelete(req.params.id);
        if (!id) {
            res.send('Hospital not found');
        }
        console.log('Deleted from MongoDB Atlas:', id);
        res.send('Hospital deleted : ',id);
    } catch (error) {
        console.log('Deleted from MongoDB Atlas:', id);
        res.send({ message: error.message });
    }
};
