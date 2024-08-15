const initStaffModel = require('../models/staffModel');
const connectToDatabase = require('../config/databases');

let StaffModel, db ;
const initDatabases = async () => {
    db = await connectToDatabase();
    StaffModel = initStaffModel(db);
};
initDatabases();

exports.createStaff = async (req, res) => {
    try {
        const staffExists = await StaffModel.findOne({email : req.body.email});
        if (staffExists) {
            console.log('Staff member already exists');
            return ('Staff member already exists');
        }
        const staff = await StaffModel.create(req.body);
        res.status(201).json(staff);
        console.log('Record from mongoDB Atlas : ',staff);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.getStaff = async (req, res) => {
    try {
        const staff = await StaffModel.find();
        res.status(200).json(staff);
        console.log('Records from mongoDB Atlas : ',staff);
    } catch (error) {
        res.status(500).send({ message: error.message });
        console.log(error);
    }
};

exports.getStaffById = async (req, res) => {
    try {
        const staff = await StaffModel.findById(req.params.id);
        if (staff) {
            res.json(staff);
            console.log('Record from mongoDB Atlas : ',staff);
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
        console.log(error);
    }
};

exports.updateStaff = async (req, res) => {
    try {
        const staff = await StaffModel.findById(req.params.id);
        if (staff) {
            if (req.body.password) {
                staff.password = req.body.password;
            }
            const updatedStaff = await staff.save();
            console.log('Record from mongoDB Atlas : ',updatedStaff);
            res.json('Staff updated : ',updatedStaff);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.deleteStaff = async (req, res) => {
    try {
        const id = req.params.id;
        const staff = await StaffModel.findById(id)
        if (staff) {
            await StaffModel.findByIdAndDelete(staff);
            console.log('Staff member removed : ',id);
            res.json({ message: 'Staff member removed' });
        }
    } catch (error) {
        res.status(404).send({ message: 'Staff member not found' });
        console.log(error);
    }
};
