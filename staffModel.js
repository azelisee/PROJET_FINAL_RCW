const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['Technician', 'Administrator', 'Caregiver', 'Other'], required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    dateOfBirth: { type: Date, required: true },
    hireDate: { type: Date, default: Date.now }
});

// Hash the password before saving the user
staffSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

staffSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const initStaffModel = (conn) => conn.model('Staff', staffSchema);

module.exports = initStaffModel;
