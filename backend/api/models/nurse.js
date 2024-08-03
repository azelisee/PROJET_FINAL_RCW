const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
});

const nurseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true},
    email: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    phone: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    dateOfBirth: { type: Date },
    qualifications: { type: [String] },
    schedule: [availabilitySchema],
    seniority: { type: Number, required: true },
});

// Function to create models for both databases
const createNurseModel = (conn) => conn.model('Nurse', nurseSchema);

module.exports = createNurseModel;