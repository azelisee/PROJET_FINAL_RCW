const initHospitalModel = require('../models/hospitalModel');
const { connectToDatabase1, connectToDatabase2 } = require('../config/databases');

let db1, db2, HospitalModel1, HospitalModel2;

const initDatabases = async () => {
    db1 = await connectToDatabase1();
    db2 = await connectToDatabase2();
    HospitalModel1 = initHospitalModel(db1);
    HospitalModel2 = initHospitalModel(db2);
};
initDatabases();

exports.createHospital = async (req, res) => {
    try {
        const hospitalData = req.body;
        const { address, phone } = hospitalData;

        const existingHospitalAtlas = await HospitalModel1.findOne({ address, phone });
        const existingHospitalCompass = await HospitalModel2.findOne({ address, phone });
        if (existingHospitalAtlas || existingHospitalCompass) {
            return res.status(400).send({ message: 'Error: A hospital with this address and phone number already exists in one of the databases.' });
        }
        const hospital1 = new HospitalModel1(hospitalData);
        const hospital2 = new HospitalModel2(hospitalData);

        await hospital1.save();
        await hospital2.save();

        res.status(201).send({ message: 'Hospital inserted in both databases: congratulations !!!' });
        console.log('Recorded in MongoDB Atlas : ', hospital1);
        console.log('\nRecorded in MongoDB Compass : ', hospital2);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.getHospitals = async (req, res) => {
    try {
        const hospitalsAtlas = await HospitalModel1.find();
        const hospitalsCompass = await HospitalModel2.find();

        const hospitals = hospitalsAtlas.map(atlasHospital => {
            const compassHospital = hospitalsCompass.find(compass => compass.address === atlasHospital.address && compass.phone === atlasHospital.phone);
            return {
                id1: atlasHospital._id,
                id2: compassHospital ? compassHospital._id : null,
                name: atlasHospital.name,
                address: atlasHospital.address,
                phone: atlasHospital.phone,
            };
        });
        res.status(200).send({ hospitals });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getHospitalById = async (req, res) => {
    try {
        const hospital1 = await HospitalModel1.findById(req.params.id);
        //const hospital2 = await HospitalModel2.findById(req.params.id);
        if (hospital1) {
            res.status(200).json({hospital1 : hospital1});
            console.log(`Data from MongoDB Atlas : ${hospital1}`);
            //console.log(`Data from MongoDB Compass : ${hospital2}`);
        } else {
            res.status(404).json({ error: 'Hospital not found' });
            console.log('Hospital not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.updateHospital = async (req, res) => {
    try {
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for updating.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const hospitalData = req.body;

        const hospital1 = await HospitalModel1.findByIdAndUpdate(atlasId, hospitalData, { new: true });
        const hospital2 = await HospitalModel2.findByIdAndUpdate(compassId, hospitalData, { new: true });
        if (!hospital1 || !hospital2) {
            return res.status(404).send({ message: 'Hospital not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Hospital data updated in both databases' });
        console.log('Updated in MongoDB Atlas:', hospital1);
        console.log('Updated in MongoDB Compass:', hospital2);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteHospital = async (req, res) => {
    try {
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for deletion.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const atlasResult = await HospitalModel1.findByIdAndDelete(atlasId);
        const compassResult = await HospitalModel2.findByIdAndDelete(compassId);
        if (!atlasResult || !compassResult) {
            return res.status(404).send({ message: 'Hospital not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Hospital deleted from both databases' });
        console.log('Deleted from MongoDB Atlas:', atlasId);
        console.log('Deleted from MongoDB Compass:', compassId);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
