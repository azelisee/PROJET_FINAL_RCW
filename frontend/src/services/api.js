import axios from 'axios';

const API_URL = 'http://localhost:7000';

// Patients
export const getPatients = () => axios.get(`${API_URL}/patients`);
export const getPatientById = (id) => axios.get(`${API_URL}/patients/${id}`);
export const createPatient = (patient) => axios.post(`${API_URL}/patients`, patient);
export const updatePatient = (id1,id2, patient) => axios.put(`${API_URL}/patients/${id1},${id2}`, patient);
export const deletePatient = (id1, id2) => axios.delete(`${API_URL}/patients/${id1},${id2}`);

// Doctors
export const getDoctors = () => axios.get(`${API_URL}/doctors`);
export const getDoctorById = (id) => axios.get(`${API_URL}/doctors/${id}`);
export const createDoctor = (doctor) => axios.post(`${API_URL}/doctors`, doctor);
export const updateDoctor = (id1,id2, doctor) => axios.put(`${API_URL}/doctors/${id1},${id2}`, doctor);
export const deleteDoctor = (id1, id2) => axios.delete(`${API_URL}/doctors/${id1},${id2}`);

// Nurses
export const getNurses = () => axios.get(`${API_URL}/nurses`);
export const getNurseById = (id) => axios.get(`${API_URL}/nurses/${id}`);
export const createNurse = (nurse) => axios.post(`${API_URL}/nurses`, nurse);
export const updateNurse = (id1,id2, nurse) => axios.put(`${API_URL}/nurses/${id1},${id2}`, nurse);
export const deleteNurse = (id1, id2) => axios.delete(`${API_URL}/nurses/${id1},${id2}`);

// Rooms
export const getRooms = () => axios.get(`${API_URL}/rooms`);
export const getRoomById = (id) => axios.get(`${API_URL}/rooms/${id}`);
export const createRoom = (room) => axios.post(`${API_URL}/rooms`, room);
export const updateRoom = (id1,id2, room) => axios.put(`${API_URL}/rooms/${id1},${id2}`, room);
export const deleteRoom = (id1, id2) => axios.delete(`${API_URL}/rooms/${id1},${id2}`);

// Departments
export const getDepartments = () => axios.get(`${API_URL}/departments`);
export const getDepartmentById = (id) => axios.get(`${API_URL}/departments/${id}`);
export const createDepartment = (department) => axios.post(`${API_URL}/departments`, department);
export const updateDepartment = (id1,id2, department) => axios.put(`${API_URL}/departments/${id1},${id2}`, department);
export const deleteDepartment = (id1, id2) => axios.delete(`${API_URL}/departments/${id1},${id2}`);

// Hospitals
export const getHospitals = () => axios.get(`${API_URL}/hospitals`);
export const getHospitalById = (id) => axios.get(`${API_URL}/hospitals/${id}`);
export const createHospital = (hospital) => axios.post(`${API_URL}/hospitals`, hospital);
export const updateHospital = (id1,id2, hospital) => axios.put(`${API_URL}/hospitals/${id1},${id2}`, hospital);
export const deleteHospital = (id1, id2) => axios.delete(`${API_URL}/hospitals/${id1},${id2}`);

// Transfers
export const getTransfers = () => axios.get(`${API_URL}/transfers`);
export const getTransferById = (id) => axios.get(`${API_URL}/transfers/${id}`);
export const createTransfer = (transfer) => axios.post(`${API_URL}/transfers`, transfer);
export const updateTransfer = (id1,id2, transfer) => axios.put(`${API_URL}/transfers/${id1},${id2}`, transfer);
export const deleteTransfer = (id1, id2) => axios.delete(`${API_URL}/transfers/${id1},${id2}`);
