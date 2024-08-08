const initDepartmentModel = require('../models/department');
const { connectToDatabase1, connectToDatabase2 } = require('../config/databases');

let db1, db2, DepartmentModel1, DepartmentModel2;

const initDatabases = async () => {
    db1 = await connectToDatabase1();
    db2 = await connectToDatabase2();
    DepartmentModel1 = initDepartmentModel(db1);
    DepartmentModel2 = initDepartmentModel(db2);
};
initDatabases();

exports.createDepartment = async (req, res) => {
    try {
        const departmentData = req.body;
        const department1 = new DepartmentModel1(departmentData);
        const department2 = new DepartmentModel2(departmentData);

        await department1.save();
        await department2.save();

        res.status(201).send({ message: 'Department created in both databases' });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getDepartments = async (req, res) => {
    try {
        const departments1 = await DepartmentModel1.find();
        const departments2 = await DepartmentModel2.find();

        if (departments1) {
            res.status(200).json(`Records from MongoDB Atlas : ${departments1}`);
            console.log(`Records from MongoDB Atlas : ${departments1}`);
        } else if (departments2) {
            res.status(200).json(`Records from MongoDB Compass : ${departments2}`);
            console.log(`Records from MongoDB Compass : ${departments2}`);
        } else {
            res.status(404).json({ error: 'Patient not found' });
            console.log('Patient not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getDepartmentById = async (req, res) => {
    try {
        const department1 = await DepartmentModel1.findById(req.params.id);
        const department2 = await DepartmentModel2.findById(req.params.id);

        if (department1) {
            res.status(200).json(`Data from MongoDB Atlas : ${department1}`);
            console.log(`Data from MongoDB Atlas : ${department1}`);
        } else if (department2) {
            res.status(200).json(`Data from MongoDB Compass : ${department2}`);
            console.log(`Data from MongoDB Compass : ${department2}`);
        } else {
            res.status(404).json({ error: 'Department not found' });
            console.log('Department not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.updateDepartment = async (req, res) => {
    try {
        const departmentData = req.body;
        const departmentId = req.params.id;

        await DepartmentModel1.findByIdAndUpdate(departmentId, departmentData);
        await DepartmentModel2.findByIdAndUpdate(departmentId, departmentData);

        res.status(200).send({ message: 'Department updated in both databases' });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.deleteDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id;

        await DepartmentModel1.findByIdAndDelete(departmentId);
        await DepartmentModel2.findByIdAndDelete(departmentId);

        res.status(200).send({ message: 'Department deleted from both databases' });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
