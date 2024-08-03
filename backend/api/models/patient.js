const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const documentSchema = new mongoose.Schema({
    type: { type: String, required: true },
    url: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now }
});

const medicalFolderSchema = new mongoose.Schema({
    folderName: { type: String, required: true },
    documents: [documentSchema]
});

const consultationSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    doctorName: { type: String, required: true },
    notes: String,
    diagnosis: String,
    prescriptions: [
        {
            medicine: String,
            dosage: String,
            duration: String
        }
    ],
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
});

const treatmentSchema = new mongoose.Schema({
    treatmentName: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: Date,
    description: String,
    status: { type: String, enum: ['ongoing', 'completed', 'planned'] },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
});

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    tel: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
    medicalFolders: [medicalFolderSchema],
    consultationHistory: [consultationSchema],
    treatments: [treatmentSchema],
    currentRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
});

patientSchema.pre('save', async function(next) {
    const patient = this;

    if (!patient.isModified('medicalFolders') && !patient.isModified('consultationHistory') && !patient.isModified('treatments')) {
        return next();
    }

    try {
        const hashMedicalFolders = await bcrypt.hash(JSON.stringify(patient.medicalFolders), SALT_WORK_FACTOR);
        patient.medicalFolders = hashMedicalFolders;

        const hashConsultationHistory = await bcrypt.hash(JSON.stringify(patient.consultationHistory), SALT_WORK_FACTOR);
        patient.consultationHistory = hashConsultationHistory;

        const hashTreatments = await bcrypt.hash(JSON.stringify(patient.treatments), SALT_WORK_FACTOR);
        patient.treatments = hashTreatments;

        next();
    } catch (err) {
        next(err);
    }
});

patientSchema.methods.compareMedicalFolders = async function(candidateMedicalFolders) {
    return bcrypt.compare(JSON.stringify(candidateMedicalFolders), this.medicalFolders);
};

patientSchema.methods.compareConsultationHistory = async function(candidateConsultationHistory) {
    return bcrypt.compare(JSON.stringify(candidateConsultationHistory), this.consultationHistory);
};

patientSchema.methods.compareTreatments = async function(candidateTreatments) {
    return bcrypt.compare(JSON.stringify(candidateTreatments), this.treatments);
};

// Function to create models for both databases
const createPatientModel = (conn) => conn.model('Patient', patientSchema);

module.exports = createPatientModel;
