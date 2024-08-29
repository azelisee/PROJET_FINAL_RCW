const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const appointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    notes: String,
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' }
});

const availabilitySchema = new mongoose.Schema({
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
});

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, enum: ['Doctor'], required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    phone: { type: String, required: true },
    speciality: { type: String, required: true },
    seniority: { type: Number, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    schedule: [availabilitySchema],
    appointments: [appointmentSchema],
    availability: [availabilitySchema]
});

// Hash the password before saving the user
doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

doctorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const initDoctorModel = (conn) => conn.model('Doctor', doctorSchema);

module.exports = initDoctorModel;
