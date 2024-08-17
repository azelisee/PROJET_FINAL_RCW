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
        console.log('Recorded in MongoDB Atlas : ', doctor);
        return('New Doctor recorded', doctor);
    } catch (error) {
        console.log(error);
        return ({ error: error.message });
    }
};

exports.getDoctors = async (req, res) => {
    try {
        const doctors = await DoctorModel.find();
        console.log(`Records from MongoDB Atlas:`, doctors);
        return(doctors);
    } catch (error) {
        console.log(error);
        return({ message: error.message });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await DoctorModel.findById(req.params.id);
        console.log(`Record from MongoDB Atlas:`, doctor);
        return(doctor);
    } catch (error) {
        console.log(error);
        return({error: error.message});
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
            return('Doctor not found');
        }
        console.log('Updated in MongoDB Atlas:', doctor);
        return('Doctor updated',doctor);
    } catch (error) {
        console.log(error);
        return({ message: error.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const id = await DoctorModel.findByIdAndDelete(req.params.id);
        if (!id) {
            return ('Doctor not found');
        }
        console.log('Deleted from MongoDB Atlas:', id);
        return('Doctor deleted',id);
    } catch (error) {
        console.log(error);
        return({ message: error.message });
    }
};
