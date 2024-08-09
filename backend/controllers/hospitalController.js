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
        const hospital1 = new HospitalModel1(hospitalData);
        const hospital2 = new HospitalModel2(hospitalData);

        await hospital1.save();
        await hospital2.save();

        res.status(201).send({ message: 'Hospital inserted in both databases : congratulations !!!' });
        console.log('Recorded in MongoDB Atlas : ', hospital1);
        console.log('\nRecorded in MongoDB Compass : ', hospital2);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getHospitals = async (req, res) => {
    try {
        const hospitals1 = await HospitalModel1.find();
        //const hospitals2 = await HospitalModel2.find();

        if (hospitals1.length > 0) {
            res.status(200).json({hospitals1 : hospitals1});
            console.log(`Records from MongoDB Atlas : ${hospitals1}`);
            //console.log(`Records from MongoDB Compass : ${hospitals2}`);
        } else {
            res.status(404).json({ error: 'Hospitals not found' });
            console.log('Hospitals not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
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
        const hospitalData = req.body;
        const ids = req.params.id.split(',');
        console.log('\nExtracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('HELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];

        const hospital1 = await HospitalModel1.findByIdAndUpdate(atlasId, hospitalData);
        const hospital2 = await HospitalModel2.findByIdAndUpdate(compassId, hospitalData);

        res.status(200).send({ message: 'Hospital data put to date in both databases' });
        console.log('Recorded in MongoDB Atlas : ', hospital1);
        console.log('\nRecorded in MongoDB Compass : ', hospital2);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.deleteHospital = async (req, res) => {
    try {
        const ids = req.params.id.split(',');
        console.log('\nExtracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('HELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];

        await HospitalModel1.findByIdAndDelete(atlasId);
        await HospitalModel2.findByIdAndDelete(compassId);

        res.status(200).send({ message: 'Hospital cleared from both databases' });
        console.log('Recorded in MongoDB Atlas : ', atlasId);
        console.log('\nRecorded in MongoDB Compass : ', compassId);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
