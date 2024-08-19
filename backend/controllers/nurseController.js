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
        const existingNurse = await NurseModel.findOne({email: req.body.email});
        if (existingNurse) {
            res.send('A nurse with this email already exists');
        }
        const nurse = new NurseModel(req.body);
        await nurse.save();

        console.log('Recorded in MongoDB Atlas : ', nurse);
        res.send('New Nurse registered',nurse);
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
};
exports.getNurses = async (req, res) => {
    try {
        const nurses = await NurseModel.find();
        console.log("Records from MongoDB Atlas :",nurses);
        res.send(nurses);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};
exports.getNurseById = async (req, res) => {
    try {
        const nurse = await NurseModel.findById(req.params.id);
        if (nurse) {
            console.log(`Record from MongoDB Atlas:`, nurse);
            res.send(nurse);
        } else {
            console.log('No nurse found');
            res.send('No nurse found');
        }
    } catch (error) {
        console.log(error);
        res.send({error: error.message});
    }
};

exports.updateNurse = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }
        const nurse = await NurseModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!nurse) {
            res.send('Nurse not found');
        }
        console.log('Updated in MongoDB Atlas:', nurse);
        res.send('Nurse data updated',nurse);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};

exports.deleteNurse = async (req, res) => {
    try {
        const id = await NurseModel.findByIdAndDelete(req.params.id);
        if (!id) {
            res.send('Nurse not found');
        }
        console.log('Deleted from MongoDB Atlas:', id);
        res.send('Nurse deleted : ',id);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};
