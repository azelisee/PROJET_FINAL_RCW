const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    depNumber: { type: Number, required: true },
    name: { type: String, required: true },
    description: String,
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
    nurses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Nurse' }]
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
