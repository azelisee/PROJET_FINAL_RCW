const jwt = require('jsonwebtoken');
const initDoctorModel = require('../models/doctorModel');
const initNurseModel = require('../models/nurseModel');
const initStaffModel = require('../models/staffModel');
const connectToDatabase  = require('../config/databases');

let db, DoctorModel, NurseModel, StaffModel1;
const initDatabases = async () => {
    db = await connectToDatabase();
    DoctorModel = initDoctorModel(db);
    NurseModel = initNurseModel(db);
    StaffModel = initStaffModel(db);

};
initDatabases();

// Login for Doctors
exports.loginDoctor = async (req, res) => {
    const { title , email, password } = req.body;
    const doctor = await DoctorModel.findOne({ title , email });

    if (doctor && (await doctor.matchPassword(password))) {
        const token = jwt.sign({ id: doctor._id, title: 'Doctor' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        console.log('\nToken for the doctor : ', token);
    } else {
        res.status(404).send({ message:'Error : No Doctor with this email or password'});
        console.log('\nError : No Doctor with this email or password');
    }
};

// Login for Nurses
exports.loginNurse = async (req, res) => {
    const { title , email, password } = req.body;
    const nurse = await NurseModel.findOne({ title , email });

    if (nurse && (await nurse.matchPassword(password))) {
        const token = jwt.sign({ id: nurse._id, title: 'Nurse' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        console.log('\nToken for the nurse : ', token);
    } else {
        res.status(404).send({ message:'Error : No Nurse with this email or password'});
        console.log('\nError : No Doctor with this email or password');
    }
};

// Login for Staff
exports.loginStaff = async (req, res) => {
    const { role, email, password } = req.body;
    const staff = await StaffModel.findOne({ role, email });

    if (staff && (await staff.matchPassword(password))) {
        const token = jwt.sign({ id: staff._id, role: staff.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        console.log('\nToken for the staff : ', token);
    } else {
        res.status(404).send({ message: 'Error : No Staff with this email or password' });
        console.log('\nError : No Staff with this email or password');
    }
};
