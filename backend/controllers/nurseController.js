const initNurseModel = require('../models/nurseModel');
const connectToDatabase = require('../config/databases');

let db, NurseModel;

const initDatabases = async () => {
    db = await connectToDatabase();
    NurseModel = initNurseModel(db);
};
initDatabases();

exports.createNurse = async (req, res) => {
    try {
        const existingNurse = await NurseModel.findOne(req.body.email);
        if (existingNurse) {
            return res.status(400).send('A nurse with this email already exists');
        }
        const nurse = new NurseModel(req.body);
        await nurse.save();
        res.status(201).send('New Nurse registered',nurse);
        console.log('Recorded in MongoDB Atlas : ', nurse);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getNurses = async (req, res) => {
    try {
        const nurses = await NurseModel.find();
        res.status(200).send(nurses);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getNurseById = async (req, res) => {
    try {
        const nurse = await NurseModel.findById(req.params.id);
        if (nurse) {
            res.status(200).json(nurse);
            console.log(`Record from MongoDB Atlas:`, nurse);
        } else {
            res.status(404).json({ error: 'No nurse found' });
            console.log('No nurse found');
        }
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error);
    }
};

exports.updateNurse = async (req, res) => {
    try {
        const nurse = await NurseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!nurse) {
            return res.status(404).send('Nurse not found');
        }
        res.status(200).send('Nurse data updated',nurse);
        console.log('Updated in MongoDB Atlas:', nurse);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteNurse = async (req, res) => {
    try {
        const id = await NurseModel.findByIdAndDelete(req.params.id);
        if (!id) {
            return res.status(404).send('Nurse not found');
        }
        res.status(200).send('Nurse deleted : ',id);
        console.log('Deleted from MongoDB Atlas:', id);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
