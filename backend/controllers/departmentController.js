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
        const existingDepartment = await DepartmentModel.findOne(req.body.depNumber);
        if (existingDepartment) {
            return ('A department with this number already exists');
        }
        const department = new DepartmentModel(req.body);
        await department.save();
        res.status(201).send({ message: 'New Department registered' });
        console.log('Recorded in MongoDB Atlas : ', department);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

exports.getDepartments = async (req, res) => {
    try {
        const departments = await DepartmentModel.find();
        res.json(departments);
        console.log(`Records from MongoDB Atlas:`, departments);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getDepartmentById = async (req, res) => {
    try {
        const department = await DepartmentModel.findById(req.params.id);
        res.json(department);
        console.log(`Record from MongoDB Atlas:`, department);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error);
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const department = await DepartmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!department) {
            return res.status(404).send('Department not found');
        }
        res.json('Department updated',department);
        console.log('Updated in MongoDB Atlas:', department);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const id = await DepartmentModel.findByIdAndDelete(req.params.id);
        if (!id) {
            return res.status(404).send('Department not found');
        }
        res.json('Department deleted : ',id);
        console.log('Deleted from MongoDB Atlas:',id);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
