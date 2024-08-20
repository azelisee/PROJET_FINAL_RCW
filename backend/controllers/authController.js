const jwt = require('jsonwebtoken');
const initDoctorModel = require('../models/doctorModel');
const initNurseModel = require('../models/nurseModel');
const initStaffModel = require('../models/staffModel');
const initPatientModel = require('../models/patientModel');
const connectToDatabase  = require('../config/databases');
const dotenv = require('dotenv');
dotenv.config({path: '../config/.env'});

let db, DoctorModel, NurseModel, StaffModel, PatientModel;
const initDatabases = async () => {
    db = await connectToDatabase();
    DoctorModel = initDoctorModel(db);
    NurseModel = initNurseModel(db);
    StaffModel = initStaffModel(db);
    PatientModel = initPatientModel(db);

};
initDatabases();

// Login for Patients
exports.loginPatient = async (req, res) => {
    const { title , email, password } = req.body;
    const patient = await PatientModel.findOne({ title , email });

    if (patient && (await patient.matchPassword(password))) {
        const token = jwt.sign({ id: patient._id, title: 'Patient' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('\nToken for the patient : ', token);
        return token;
    } else {
        console.log('\nError : No Patient with this email or password');
        res.send('Error : No patient with this email or password');
    }
};

// Login for Doctors
exports.loginDoctor = async (req, res) => {
    const { title , email, password } = req.body;
    const doctor = await DoctorModel.findOne({ title , email });

    if (doctor && (await doctor.matchPassword(password))) {
        const token = jwt.sign({ id: doctor._id, title: 'Doctor' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('\nToken for the doctor : ', token);
        return token;
    } else {
        console.log('\nError : No Doctor with this email or password');
        res.send('Error : No Doctor with this email or password');
    }
};

// Login for Nurses
exports.loginNurse = async (req, res) => {
    const { title , email, password } = req.body;
    const nurse = await NurseModel.findOne({ title , email });

    if (nurse && (await nurse.matchPassword(password))) {
        const token = jwt.sign({ id: nurse._id, title: 'Nurse' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('\nToken for the nurse : ', token);
        return token;
    } else {
        console.log('\nError : No Doctor with this email or password');
        res.send('Error : No Nurse with this email or password');
    }
};

// Login for Staff
exports.loginStaff = async (req, res) => {
    const { role, email, password } = req.body;
    const staff = await StaffModel.findOne({ role, email });

    if (staff && (await staff.matchPassword(password))) {
        const token = jwt.sign({ id: staff._id, role: staff.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('\nToken for the staff : ', token);
        return token;
    } else {
        console.log('\nError : No Staff with this email or password');
        res.send('Error : No Staff with this email or password');
    }
};
