const initDoctorModel = require('../models/doctorModel');
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
        const email = doctorData.email;

        const existingDoctorAtlas = await DoctorModel1.findOne({ email });
        const existingDoctorCompass = await DoctorModel2.findOne({ email });
        if (existingDoctorAtlas || existingDoctorCompass) {
            return res.status(400).send({ message: 'Error: A doctor with this email already exists in one of the databases.' });
        }
        const doctor1 = new DoctorModel1(doctorData);
        const doctor2 = new DoctorModel2(doctorData);

        await doctor1.save();
        await doctor2.save();

        res.status(201).send({ message: 'Doctor well inserted in both databases' });
        console.log('Recorded in MongoDB Atlas : ', doctor1);
        console.log('\nRecorded in MongoDB Compass : ', doctor2);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getDoctors = async (req, res) => {
    try {
        const doctorsAtlas = await DoctorModel1.find();
        const doctorsCompass = await DoctorModel2.find();

        const doctors = doctorsAtlas.map(atlasDoctor => {
            const compassDoctor = doctorsCompass.find(compass => compass.email === atlasDoctor.email);
            return {
                id1: atlasDoctor._id,
                id2: compassDoctor ? compassDoctor._id : null,
                name: atlasDoctor.name,
                email: atlasDoctor.email,
            };
        });
        res.status(200).send({ doctors });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor1 = await DoctorModel1.findById(req.params.id);
        //const doctor2 = await DoctorModel2.findById(req.params.id);

        if (doctor1) {
            res.status(200).json({doctor1 : doctor1});
            console.log(`Data from MongoDB Atlas : ${doctor1}`);
            //console.log(`Data from MongoDB Compass : ${doctor2}`);
        } else {
            res.status(404).json({ error: 'Doctor not found' });
            console.log('Doctor not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.updateDoctor = async (req, res) => {
    try {
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for updating.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const doctorData = req.body;

        const doctor1 = await DoctorModel1.findByIdAndUpdate(atlasId, doctorData, { new: true });
        const doctor2 = await DoctorModel2.findByIdAndUpdate(compassId, doctorData, { new: true });
        if (!doctor1 || !doctor2) {
            return res.status(404).send({ message: 'Doctor not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Doctor updated in both databases' });
        console.log('Updated in MongoDB Atlas:', doctor1);
        console.log('Updated in MongoDB Compass:', doctor2);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for deletion.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const atlasResult = await DoctorModel1.findByIdAndDelete(atlasId);
        const compassResult = await DoctorModel2.findByIdAndDelete(compassId);
        if (!atlasResult || !compassResult) {
            return res.status(404).send({ message: 'Doctor not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Doctor deleted from both databases' });
        console.log('Deleted from MongoDB Atlas:', atlasId);
        console.log('Deleted from MongoDB Compass:', compassId);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
