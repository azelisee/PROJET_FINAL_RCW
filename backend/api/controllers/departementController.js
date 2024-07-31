const Department = require('../models/department');

exports.createDepartment = async (req, res) => {
    try {
        const department = new Department(req.body);
        await department.save();
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('doctors').populate('nurses');
        res.status(200).json(departments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id).populate('doctors').populate('nurses');
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
