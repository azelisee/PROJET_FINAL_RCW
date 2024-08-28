const initDepartmentModel = require('../models/departmentModel');
const connectToDatabase  = require('../config/databases');

let db, DepartmentModel ;

const initDatabases = async () => {
    db = await connectToDatabase();
    DepartmentModel = initDepartmentModel(db);
};
initDatabases();

exports.createDepartment = async (req, res) => {
    try {
        const existingDepartment = await DepartmentModel.findOne({depNumber : req.body.depNumber});
        if (existingDepartment) {
            return res.status(400).json({ message: 'A department with this number already exists' });
        }
        const department = new DepartmentModel(req.body);
        await department.save();

        console.log('Recorded in MongoDB Atlas : ', department);
        res.status(201).json({ message: 'New Department registered', department });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getDepartments = async (req, res) => {
    try {
        const departments = await DepartmentModel.find();
        console.log(`Records from MongoDB Atlas:`, departments);
        res.status(200).json(departments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getDepartmentById = async (req, res) => {
    try {
        const department = await DepartmentModel.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        console.log(`Record from MongoDB Atlas:`, department);
        res.status(200).json({ message: 'The department is found', department });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const department = await DepartmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        await department.save();
        console.log('Updated in MongoDB Atlas:', department);
        res.status(200).json({ message: 'Department updated', department });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const department = await DepartmentModel.findByIdAndDelete(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        console.log('Deleted from MongoDB Atlas:', department);
        res.status(200).json({ message: 'Department deleted', department });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
