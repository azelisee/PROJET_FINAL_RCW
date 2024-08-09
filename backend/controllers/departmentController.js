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
        const depNumber = departmentData.depNumber;

        const existingDepartmentAtlas = await DepartmentModel1.findOne({ depNumber });
        const existingDepartmentCompass = await DepartmentModel2.findOne({ depNumber });

        if (existingDepartmentAtlas || existingDepartmentCompass) {
            return res.status(400).send({ message: 'Error: A department with this number already exists in one or both databases.' });
        }
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
        const departmentsAtlas = await DepartmentModel1.find();
        const departmentsCompass = await DepartmentModel2.find();

        const departments = departmentsAtlas.map(atlasDepartment => {
            const compassDepartment = departmentsCompass.find(compass => compass.depNumber === atlasDepartment.depNumber);
            return {
                id1: atlasDepartment._id,
                id2: compassDepartment ? compassDepartment._id : null,
                name: atlasDepartment.name,
                depNumber: atlasDepartment.depNumber,
            };
        });
        res.status(200).send({ departments });
    } catch (error) {
        res.status(500).send({ message: error.message });
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
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for updating.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const departmentData = req.body;

        const department1 = await DepartmentModel1.findByIdAndUpdate(atlasId, departmentData, { new: true });
        const department2 = await DepartmentModel2.findByIdAndUpdate(compassId, departmentData, { new: true });
        if (!department1 || !department2) {
            return res.status(404).send({ message: 'Department not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Department updated in both databases' });
        console.log('Updated in MongoDB Atlas:', department1);
        console.log('Updated in MongoDB Compass:', department2);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const ids = req.params.id1 + ',' + req.params.id2;
        console.log('\nExtracted IDs:', ids);
        if (!req.params.id1 || !req.params.id2) {
            throw new Error('Two IDs must be provided for deletion.');
        }
        const atlasId = req.params.id1.trim();
        const compassId = req.params.id2.trim();

        const atlasResult = await DepartmentModel1.findByIdAndDelete(atlasId);
        const compassResult = await DepartmentModel2.findByIdAndDelete(compassId);
        if (!atlasResult || !compassResult) {
            return res.status(404).send({ message: 'Department not found in one or both databases.' });
        }
        res.status(200).send({ message: 'Department deleted from both databases' });
        console.log('Deleted from MongoDB Atlas:', atlasId);
        console.log('Deleted from MongoDB Compass:', compassId);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
