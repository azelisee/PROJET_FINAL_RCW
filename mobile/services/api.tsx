import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:7000';

export const getPatients = (): Promise<AxiosResponse<Patient[]>> => axios.get(`${API_URL}/patients`);
export const getPatientById = (id: string): Promise<AxiosResponse<Patient>> => axios.get(`${API_URL}/patients/${id}`);
export const createPatient = (patient: Patient): Promise<AxiosResponse<Patient>> => axios.post(`${API_URL}/patients`, patient);
export const updatePatient = (id: string, patient: Patient): Promise<AxiosResponse<Patient>> => axios.put(`${API_URL}/patients/${id}`, patient);
export const deletePatient = (id: string): Promise<AxiosResponse<void>> => axios.delete(`${API_URL}/patients/${id}`);

export const getDoctors = (): Promise<AxiosResponse<Doctor[]>> => axios.get(`${API_URL}/doctors`);
export const getDoctorById = (id: string): Promise<AxiosResponse<Doctor>> => axios.get(`${API_URL}/doctors/${id}`);
export const createDoctor = (doctor: Doctor): Promise<AxiosResponse<Doctor>> => axios.post(`${API_URL}/doctors`, doctor);
export const updateDoctor = (id: string, doctor: Doctor): Promise<AxiosResponse<Doctor>> => axios.put(`${API_URL}/doctors/${id}`, doctor);
export const deleteDoctor = (id: string): Promise<AxiosResponse<void>> => axios.delete(`${API_URL}/doctors/${id}`);

export const getNurses = (): Promise<AxiosResponse<Nurse[]>> => axios.get(`${API_URL}/nurses`);
export const getNurseById = (id: string): Promise<AxiosResponse<Nurse>> => axios.get(`${API_URL}/nurses/${id}`);
export const createNurse = (nurse: Nurse): Promise<AxiosResponse<Nurse>> => axios.post(`${API_URL}/nurses`, nurse);
export const updateNurse = (id: string, nurse: Nurse): Promise<AxiosResponse<Nurse>> => axios.put(`${API_URL}/nurses/${id}`, nurse);
export const deleteNurse = (id: string): Promise<AxiosResponse<void>> => axios.delete(`${API_URL}/nurses/${id}`);

export const getRooms = (): Promise<AxiosResponse<Room[]>> => axios.get(`${API_URL}/rooms`);
export const getRoomById = (id: string): Promise<AxiosResponse<Room>> => axios.get(`${API_URL}/rooms/${id}`);
export const createRoom = (room: Room): Promise<AxiosResponse<Room>> => axios.post(`${API_URL}/rooms`, room);
export const updateRoom = (id: string, room: Room): Promise<AxiosResponse<Room>> => axios.put(`${API_URL}/rooms/${id}`, room);
export const deleteRoom = (id: string): Promise<AxiosResponse<void>> => axios.delete(`${API_URL}/rooms/${id}`);

export const getDepartments = (): Promise<AxiosResponse<Department[]>> => axios.get(`${API_URL}/departments`);
export const getDepartmentById = (id: string): Promise<AxiosResponse<Department>> => axios.get(`${API_URL}/departments/${id}`);
export const createDepartment = (department: Department): Promise<AxiosResponse<Department>> => axios.post(`${API_URL}/departments`, department);
export const updateDepartment = (id: string, department: Department): Promise<AxiosResponse<Department>> => axios.put(`${API_URL}/departments/${id}`, department);
export const deleteDepartment = (id: string): Promise<AxiosResponse<void>> => axios.delete(`${API_URL}/departments/${id}`);

export const getHospitals = (): Promise<AxiosResponse<Hospital[]>> => axios.get(`${API_URL}/hospitals`);
export const getHospitalById = (id: string): Promise<AxiosResponse<Hospital>> => axios.get(`${API_URL}/hospitals/${id}`);
export const createHospital = (hospital: Hospital): Promise<AxiosResponse<Hospital>> => axios.post(`${API_URL}/hospitals`, hospital);
export const updateHospital = (id: string, hospital: Hospital): Promise<AxiosResponse<Hospital>> => axios.put(`${API_URL}/hospitals/${id}`, hospital);
export const deleteHospital = (id: string): Promise<AxiosResponse<void>> => axios.delete(`${API_URL}/hospitals/${id}`);

export const getTransfers = (): Promise<AxiosResponse<Transfer[]>> => axios.get(`${API_URL}/transfers`);
export const getTransferById = (id: string): Promise<AxiosResponse<Transfer>> => axios.get(`${API_URL}/transfers/${id}`);
export const createTransfer = (transfer: Transfer): Promise<AxiosResponse<Transfer>> => axios.post(`${API_URL}/transfers`, transfer);
export const updateTransfer = (id: string, transfer: Transfer): Promise<AxiosResponse<Transfer>> => axios.put(`${API_URL}/transfers/${id}`, transfer);
export const deleteTransfer = (id: string): Promise<AxiosResponse<void>> => axios.delete(`${API_URL}/transfers/${id}`);

export const getStaff = (): Promise<AxiosResponse<Staff[]>> => axios.get(`${API_URL}/staff`);
export const getStaffById = (id: string): Promise<AxiosResponse<Staff>> => axios.get(`${API_URL}/staff/${id}`);
export const createStaff = (staff: Staff): Promise<AxiosResponse<Staff>> => axios.post(`${API_URL}/staff`, staff);
export const updateStaff = (id: string, staff: Staff): Promise<AxiosResponse<Staff>> => axios.put(`${API_URL}/staff/${id}`, staff);
export const deleteStaff = (id: string): Promise<AxiosResponse<void>> => axios.delete(`${API_URL}/staff/${id}`);