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
            return ('A department with this number already exists');
        }
        const department = new DepartmentModel(req.body);
        await department.save();

        console.log('Recorded in MongoDB Atlas : ', department);
        return('New Department registered', department);
    } catch (error) {
        console.log(error);
        return({error: error.message});
    }
};
exports.getDepartments = async (req, res) => {
    try {
        const departments = await DepartmentModel.find();
        console.log(`Records from MongoDB Atlas:`, departments);
        return(departments);
    } catch (error) {
        console.log(error);
        return({ message: error.message });
    }
};

exports.getDepartmentById = async (req, res) => {
    try {
        const department = await DepartmentModel.findById(req.params.id).mongoose.model('Doctor',doctorSchema);
        console.log(`Record from MongoDB Atlas:`, department);
        return("The department is found : ", department);
    } catch (error) {
        console.log(error);
        return({error: error.message});
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const department = await DepartmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!department) {
            return res.status(404).send('Department not found');
        }
        await department.save();
        console.log('Updated in MongoDB Atlas:', department);
        return('Department updated',department);
    } catch (error) {
        return({ message: error.message });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const id = await DepartmentModel.findByIdAndDelete(req.params.id);
        if (!id) {
            return ('Department not found');
        }
        console.log('Deleted from MongoDB Atlas:',id);
        return('Department deleted : ',id);
    } catch (error) {
        console.log(error);
        return({ message: error.message });
    }
};
