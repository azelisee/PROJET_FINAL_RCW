const initDepartmentModel = require('../models/departmentModel');
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

        res.status(201).send({ message: 'New Department registered in both databases' });
        console.log('Recorded in MongoDB Atlas : ', department1);
        console.log('\nRecorded in MongoDB Compass : ', department2);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getDepartments = async (req, res) => {
    try {
        const departments1 = await DepartmentModel1.find();
        //const departments2 = await DepartmentModel2.find();

        if (departments1.length > 0) {
            res.status(200).json({departments1 : departments1});
            console.log(`Records from MongoDB Atlas : ${departments1}`);
            //console.log(`Records from MongoDB Compass : ${departments2}`);
        } else {
            res.status(404).json({ error: 'Departments not found' });
            console.log('Departments not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.getDepartmentById = async (req, res) => {
    try {
        const department1 = await DepartmentModel1.findById(req.params.id);
        //const department2 = await DepartmentModel2.findById(req.params.id);

        if (department1) {
            res.status(200).json({department1 : department1});
            console.log(`Data from MongoDB Atlas : ${department1}`);
            //console.log(`Data from MongoDB Compass : ${department2}`);
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
        const ids = req.params.id.split(',');
        console.log('\nExtracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('HELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];

        const department1 = await DepartmentModel1.findByIdAndUpdate(atlasId, departmentData);
        const department2 = await DepartmentModel2.findByIdAndUpdate(compassId, departmentData);

        res.status(200).send({ message: 'Department updated in both databases' });
        console.log('Recorded in MongoDB Atlas : ', department1);
        console.log('\nRecorded in MongoDB Compass : ', department2);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
exports.deleteDepartment = async (req, res) => {
    try {
        const ids = req.params.id.split(',');
        console.log('\nExtracted IDs:', ids);
        if (ids.length !== 2) {
            console.log('HELP : Make space and coma before the first id in params');
            throw new Error('Exactly two IDs must be provided');
        }
        const atlasId = ids[0];
        const compassId = ids[1];

        await DepartmentModel1.findByIdAndDelete(atlasId);
        await DepartmentModel2.findByIdAndDelete(compassId);

        res.status(200).send({ message: 'Department deleted from both databases' });
        console.log('Recorded in MongoDB Atlas : ', atlasId);
        console.log('\nRecorded in MongoDB Compass : ', compassId);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};
