const mongoose = require('mongoose');

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
    title: { type: String, required: true},
    email: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    phone: { type: String, required: true },
    specialty: { type: String, required: true },
    seniority: { type: Number, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    schedule: [availabilitySchema],
    appointments: [appointmentSchema],
    availability: [availabilitySchema]
});

const initDoctorModel = (conn) => conn.model('Doctor', doctorSchema);

module.exports = initDoctorModel;
