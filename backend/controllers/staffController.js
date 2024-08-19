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
            res.send('Staff member already exists');
        }
        const staff = await StaffModel.create(req.body);
        console.log('Record from mongoDB Atlas : ',staff);
        res.send(staff);
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
};

exports.getStaffs = async (req, res) => {
    try {
        const staff = await StaffModel.find();
        console.log('Records from mongoDB Atlas : ',staff);
        res.send(staff);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};

exports.getStaffById = async (req, res) => {
    try {
        const staff = await StaffModel.findById(req.params.id);
        if (staff) {
            console.log('Record from mongoDB Atlas : ',staff);
            res.send(staff);
        }
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
};

exports.updateStaff = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }
        const updatedStaff = await PatientModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (updatedStaff) {
            console.log('Staff updated successfully');
            res.send(updatedStaff);
        } else {
            console.log('Staff not found');
            res.send('Staff not found');
        }
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
};

exports.deleteStaff = async (req, res) => {
    try {
        const id = req.params.id;
        const staff = await StaffModel.findById(id)
        if (staff) {
            await StaffModel.findByIdAndDelete(staff);
            console.log('Staff member removed : ',id);
            res.send('Staff member removed');
        }
    } catch (error) {
        console.log(error);
        res.send({ message: 'Staff member not found' });
    }
};
