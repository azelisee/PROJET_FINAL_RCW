const initDoctorModel = require('../models/doctor');
const { connectToDatabase1, connectToDatabase2 } = require('../config/databases');

let db1, db2, DoctorModel1, DoctorModel2;

const initDatabases = async () => {
    db1 = await connectToDatabase1();
    db2 = await connectToDatabase2();
    DoctorModel1 = initDoctorModel(db1);
    DoctorModel2 = initDoctorModel(db2);
};
initDatabases();

exports.createDoctor = async (req, res) => {
    try {
        const doctorData = req.body;
        const doctor1 = new DoctorModel1(doctorData);
        const doctor2 = new DoctorModel2(doctorData);

        await doctor1.save();
        await doctor2.save();

        res.status(201).send({ message: 'Doctor created in both databases' });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getDoctors = async (req, res) => {
    try {
        const doctors1 = await DoctorModel1.find();
        const doctors2 = await DoctorModel2.find();

        if (doctors1) {
            res.status(200).json(`Records from MongoDB Atlas : ${doctors1}`);
            console.log(`Records from MongoDB Atlas : ${doctors1}`);
        } else if (doctors2) {
            res.status(200).json(`Records from MongoDB Compass : ${doctors2}`);
            console.log(`Records from MongoDB Compass : ${doctors2}`);
        } else {
            res.status(404).json({ error: 'Patient not found' });
            console.log('Patient not found');
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getDoctorById = async (req, res) => {
    try {
        const doctor1 = await DoctorModel1.findById(req.params.id);
        const doctor2 = await DoctorModel2.findById(req.params.id);

        if (doctor1) {
            res.status(200).json(`Data from MongoDB Atlas : ${doctor1}`);
            console.log(`Data from MongoDB Atlas : ${doctor1}`);
        } else if (doctor2) {
            res.status(200).json(`Data from MongoDB Compass : ${doctor2}`);
            console.log(`Data from MongoDB Compass : ${doctor2}`);
        } else {
            res.status(404).json({ error: 'Patient not found' });
            console.log('Patient not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.updateDoctor = async (req, res) => {
    try {
        const doctorData = req.body;
        const ids = req.params.id.split(',');
        console.log('Extracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('\nHELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];

        await DoctorModel1.findByIdAndUpdate(atlasId, doctorData);
        await DoctorModel2.findByIdAndUpdate(compassId, doctorData);

        res.status(200).send({ message: 'Doctor updated in both databases' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteDoctor = async (req, res) => {
    try {
        const ids = req.params.id.split(',');
        console.log('Extracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('\nHELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];

        await DoctorModel1.findByIdAndDelete(atlasId);
        await DoctorModel2.findByIdAndDelete(compassId);

        res.status(200).send({ message: 'Doctor deleted from both databases' });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
