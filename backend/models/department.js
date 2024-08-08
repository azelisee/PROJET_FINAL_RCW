const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    depNumber: { type: Number, required: true },
    name: { type: String, required: true },
    description: String,
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
    nurses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Nurse' }]
});

// Function to create models for both databases
const initDepartmentModel = (conn) => conn.model('Department', departmentSchema);

module.exports = initDepartmentModel;