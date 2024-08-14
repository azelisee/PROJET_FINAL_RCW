const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const availabilitySchema = new mongoose.Schema({
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
});

const nurseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    phone: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    dateOfBirth: { type: Date },
    qualifications: { type: [String] },
    schedule: [availabilitySchema],
    seniority: { type: Number, required: true },
});

// Hash the password before saving the user
nurseSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

nurseSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const initNurseModel = (conn) => conn.model('Nurse', nurseSchema);

module.exports = initNurseModel;
