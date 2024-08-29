const initStaffModel = require('../models/staffModel');
const connectToDatabase = require('../config/databases');
const bcrypt = require('bcrypt');

let StaffModel, db;
const initDatabases = async () => {
    db = await connectToDatabase();
    StaffModel = initStaffModel(db);
};
initDatabases();

exports.createStaff = async (req, res) => {
    try {
        const staffExists = await StaffModel.findOne({ email: req.body.email });
        if (staffExists) {
            console.log('Staff member already exists');
            return res.status(400).json({ message: 'Staff member already exists' });
        }
        const staff = await StaffModel.create(req.body);
        console.log('Record from MongoDB Atlas:', staff);
        res.status(201).json(staff);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getStaffs = async (req, res) => {
    try {
        const staff = await StaffModel.find();
        console.log('Records from MongoDB Atlas:', staff);
        res.status(200).json(staff);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getStaffById = async (req, res) => {
    try {
        const staff = await StaffModel.findById(req.params.id);
        if (staff) {
            console.log('Record from MongoDB Atlas:', staff);
            res.status(200).json(staff);
        } else {
            console.log('Staff member not found');
            res.status(404).json({ message: 'Staff member not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateStaff = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }
        const updatedStaff = await StaffModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (updatedStaff) {
            console.log('Staff updated successfully');
            res.status(200).json(updatedStaff);
        } else {
            console.log('Staff member not found');
            res.status(404).json({ message: 'Staff member not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteStaff = async (req, res) => {
    try {
        const staff = await StaffModel.findById(req.params.id);
        if (staff) {
            await StaffModel.findByIdAndDelete(req.params.id);
            console.log('Staff member removed:', req.params.id);
            res.status(200).json({ message: 'Staff member removed' });
        } else {
            console.log('Staff member not found');
            res.status(404).json({ message: 'Staff member not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
