import axios from 'axios';

const API_URL = 'http://localhost:7000';

// Patients
export const getPatients = () => axios.get(`${API_URL}/patients`);
export const getPatientById = (id) => axios.get(`${API_URL}/patients/${id}`);
export const createPatient = (patient) => axios.post(`${API_URL}/patients`,patient);
export const updatePatient = (id,patient) => axios.put(`${API_URL}/patients/${id}`,patient);
export const deletePatient = (id) => axios.delete(`${API_URL}/patients/${id}`);

// Doctors
export const getDoctors = () => axios.get(`${API_URL}/doctors`);
export const getDoctorById = (id) => axios.get(`${API_URL}/doctors/${id}`);
export const createDoctor = (doctor) => axios.post(`${API_URL}/doctors`,doctor);
export const updateDoctor = (id,doctor) => axios.put(`${API_URL}/doctors/${id}`,doctor);
export const deleteDoctor = (id) => axios.delete(`${API_URL}/doctors/${id}`);

// Nurses
export const getNurses = () => axios.get(`${API_URL}/nurses`);
export const getNurseById = (id) => axios.get(`${API_URL}/nurses/${id}`);
export const createNurse = (nurse) => axios.post(`${API_URL}/nurses`,nurse);
export const updateNurse = (id,nurse) => axios.put(`${API_URL}/nurses/${id}`,nurse);
export const deleteNurse = (id) => axios.delete(`${API_URL}/nurses/${id}`);

// Rooms
export const getRooms = () => axios.get(`${API_URL}/rooms`);
export const getRoomById = (id) => axios.get(`${API_URL}/rooms/${id}`);
export const createRoom = (room) => axios.post(`${API_URL}/rooms`,room);
export const updateRoom = (id, room) => axios.put(`${API_URL}/rooms/${id}`,room);
export const deleteRoom = (id) => axios.delete(`${API_URL}/rooms/${id}`);

// Departments
export const getDepartments = () => axios.get(`${API_URL}/departments`);
export const getDepartmentById = (id) => axios.get(`${API_URL}/departments/${id}`);
export const createDepartment = (department) => axios.post(`${API_URL}/departments`, department);
export const updateDepartment = (id, department) => axios.put(`${API_URL}/departments/${id}`,department);
export const deleteDepartment = (id) => axios.delete(`${API_URL}/departments/${id}`);

// Hospitals
export const getHospitals = () => axios.get(`${API_URL}/hospitals`);
export const getHospitalById = (id) => axios.get(`${API_URL}/hospitals/${id}`);
export const createHospital = (hospital) => axios.post(`${API_URL}/hospitals`, hospital);
export const updateHospital = (id,hospital) => axios.put(`${API_URL}/hospitals/${id}`,hospital);
export const deleteHospital = (id) => axios.delete(`${API_URL}/hospitals/${id}}`);

// Transfers
export const getTransfers = () => axios.get(`${API_URL}/transfers`);
export const getTransferById = (id) => axios.get(`${API_URL}/transfers/${id}`);
export const createTransfer = (transfer) => axios.post(`${API_URL}/transfers`,transfer);
export const updateTransfer = (id, transfer) => axios.put(`${API_URL}/transfers/${id}`,transfer);
export const deleteTransfer = (id) => axios.delete(`${API_URL}/transfers/${id}`);

// Staff
export const getStaff = () => axios.get(`${API_URL}/staff`);
export const getStaffById = (id) => axios.get(`${API_URL}/staff/${id}`);
export const createStaff = (staff) => axios.post(`${API_URL}/staff`, staff);
export const updateStaff = (id, staff) => axios.put(`${API_URL}/staff/${id}`, staff);
export const deleteStaff = (id) => axios.delete(`${API_URL}/staff/${id}`);
