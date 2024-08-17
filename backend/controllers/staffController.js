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
        console.log('Record from mongoDB Atlas : ',staff);
        return(staff);
    } catch (error) {
        console.log(error);
        return({ error: error.message });
    }
};

exports.getStaffs = async (req, res) => {
    try {
        const staff = await StaffModel.find();
        console.log('Records from mongoDB Atlas : ',staff);
        return (staff);
    } catch (error) {
        console.log(error);
        return ({ message: error.message });
    }
};

exports.getStaffById = async (req, res) => {
    try {
        const staff = await StaffModel.findById(req.params.id);
        if (staff) {
            console.log('Record from mongoDB Atlas : ',staff);
            return (staff);
        }
    } catch (error) {
        console.log(error);
        return ({ message: error.message });
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
            return (updatedStaff);
        } else {
            console.log('Staff not found');
            return ('Staff not found');
        }
    } catch (error) {
        console.log(error);
        return({ error: error.message });
    }
};

exports.deleteStaff = async (req, res) => {
    try {
        const id = req.params.id;
        const staff = await StaffModel.findById(id)
        if (staff) {
            await StaffModel.findByIdAndDelete(staff);
            console.log('Staff member removed : ',id);
            return ('Staff member removed');
        }
    } catch (error) {
        console.log(error);
        return({ message: 'Staff member not found' });
    }
};
