const express = require('express');
const router = express.Router();
const checkRole = require('../middleware/middleware');


const departmentController = require('../controllers/departmentController')
const doctorController = require('../controllers/doctorController');
const hospitalController = require('../controllers/hospitalController')
const nurseController = require('../controllers/nurseController');
const patientController = require('../controllers/patientController');
const roomController = require('../controllers/roomController')
const staffController = require('../controllers/staffController')
const transferController = require('../controllers/transferController');


// Insertions
router.post('/create-staff', checkRole(['Administrator','Technician']), (req, res) => {
    staffController.createStaff(req, res);
});

router.post('/create-department', checkRole(['Administrator','Doctor']), (req, res) => {
    departmentController.createDepartment(req, res);
});

router.post('/create-doctor', checkRole(['Administrator','Doctor']), (req, res) => {
    doctorController.createDoctor(req, res);
});

router.post('/create-hospital', checkRole(['Administrator','Doctor']), (req, res) => {
    hospitalController.createHospital(req, res);
});

router.post('/create-nurse', checkRole(['Doctor']), (req, res) => {
    nurseController.createNurse(req, res);
});

router.post('/create-room', checkRole(['Administrator','Doctor']), (req, res) => {
    roomController.createRoom(req, res);
});

router.post('/create-transfer', checkRole(['Administrator','Doctor']), (req, res) => {
    transferController.createTransferController(req, res);
});

router.post('/create-patient', checkRole(['Doctor','Nurse']), (req, res) => {
    patientController.createPatient(req, res);
});


//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
// Read
router.get('/get-departments', checkRole(['Administrator','Technician','Caregiver','Other','Doctor','Nurse','Patient']), (req, res) => {
    departmentController.getDepartments(req, res);
});

router.get('/get-doctors', checkRole(['Administrator','Technician','Caregiver','Other','Doctor','Nurse','Patient']), (req, res) => {
    doctorController.getDoctors(req, res);
});

router.get('/get-hospitals', checkRole(['Administrator','Technician','Caregiver','Other','Doctor','Nurse','Patient']), (req, res) => {
    hospitalController.getHospitals(req, res);
});

router.get('/get-nurses', checkRole(['Administrator','Technician','Caregiver','Other','Doctor','Nurse','Patient']), (req, res) => {
    nurseController.getNurses(req, res);
});

router.get('/get-rooms', checkRole(['Administrator','Technician','Caregiver','Other','Doctor','Nurse']), (req, res) => {
    roomController.getRooms(req, res);
});

router.get('/get-staffs', checkRole(['Administrator','Technician','Caregiver','Other','Doctor','Nurse']), (req, res) => {
    staffController.getStaff(req, res);
});

router.get('/get-patients', checkRole(['Administrator','Technician','Caregiver','Other','Doctor','Nurse','Patient']), (req, res) => {
    patientController.getPatients(req, res);
});

router.get('/get-transfers', checkRole(['Administrator','Technician','Caregiver','Other','Doctor','Nurse']), (req, res) => {
    transferController.getTransfers(req, res);
});



//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
// Read accurate data
router.get('/get-a-doctor/:id', checkRole(['Administrator','Doctor','Nurse','Patient']), (req, res) => {
    doctorController.getDoctorById(req, res);
});

router.get('/get-a-nurse/:id', checkRole(['Administrator','Doctor','Nurse','Patient']), (req, res) => {
    nurseController.getNurseById(req, res);
});

router.get('/get-a-room/:id', checkRole(['Administrator','Doctor','Nurse']), (req, res) => {
    roomController.getRoomById(req, res);
});

router.get('/get-a-staff/:id', checkRole(['Administrator','Doctor','Nurse']), (req, res) => {
    staffController.getStaffById(req, res);
});

router.get('/get-a-hospital/:id', checkRole(['Administrator','Technician','Caregiver','Other','Doctor','Nurse','Patient']), (req, res) => {
    hospitalController.getHospitalById(req, res);
});

router.get('/get-a-department/:id', checkRole(['Administrator','Technician','Caregiver','Other','Doctor','Nurse','Patient']), (req, res) => {
    departmentController.getDepartmentById(req, res);
});

router.get('/get-a-patient/:id', checkRole(['Doctor','Nurse','Patient']), (req, res) => {
    patientController.getPatientById(req, res);
});

router.get('/get-a-transfer/:id', checkRole(['Administrator','Doctor']), (req, res) => {
    transferController.getTransferById(req, res);
});



//--------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
// Update accurate data
router.put('/update-a-department/:id', checkRole(['Administrator','Doctor']), (req, res) => {
    departmentController.updateDepartment(req, res);
});

router.put('/update-a-hospital/:id', checkRole(['Administrator','Doctor']), (req, res) => {
    hospitalController.updateHospital(req, res);
});

router.put('/update-a-room/:id', checkRole(['Administrator','Doctor']), (req, res) => {
    roomController.updateRoom(req, res);
});

router.put('/update-a-transfer/:id', checkRole(['Administrator','Doctor']), (req, res) => {
    transferController.updateTransfer(req, res);
});

router.put('/update-a-nurse/:id', checkRole(['Nurse']), (req, res) => {
    nurseController.updateNurse(req, res);
});

router.put('/update-a-patient/:id', checkRole(['Doctor']), (req, res) => {
    patientController.updatePatient(req, res);
});

router.put('/update-a-doctor/:id', checkRole(['Doctor']), (req, res) => {
    doctorController.updateDoctor(req, res);
});

router.put('/update-a-staff/:id', checkRole(['Administrator','Technician','Caregiver','Other',]), (req, res) => {
    staffController.updateStaff(req, res);
});



//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
// Delete accurate data
router.delete('/delete-a-department/:id', checkRole(['Administrator','Doctor']), (req, res) => {
    departmentController.deleteDepartment(req, res);
});

router.delete('/delete-a-hospital/:id', checkRole(['Administrator','Doctor']), (req, res) => {
    hospitalController.deleteHospital(req, res);
});

router.delete('/delete-a-nurse/:id', checkRole(['Doctor']), (req, res) => {
    nurseController.deleteNurse(req, res);
});

router.delete('/delete-a-room/:id', checkRole(['Administrator','Doctor']), (req, res) => {
    roomController.deleteRoom(req, res);
});

router.delete('/delete-a-transfer/:id', checkRole(['Administrator','Doctor']), (req, res) => {
    transferController.deleteTransfer(req, res);
});

router.delete('/delete-a-doctor/:id', checkRole(['Administrator']), (req, res) => {
    doctorController.deleteDoctor(req, res);
});

router.delete('/delete-a-patient/:id', checkRole(['Doctor']), (req, res) => {
    patientController.deletePatient(req, res);
});

router.delete('/delete-a-staff/:id', checkRole(['Administrator']), (req, res) => {
    staffController.deleteStaff(req, res);
});

module.exports = router;
