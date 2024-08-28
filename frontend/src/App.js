import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';

import PatientList from './components/patient/PatientList';
import PatientForm from './components/patient/PatientForm';
import PatientDetail from './components/patient/PatientDetail';
import PatientEdit from './components/patient/PatientEdit';

import DoctorList from './components/doctor/DoctorList';
import DoctorForm from './components/doctor/DoctorForm';
import DoctorDetail from './components/doctor/DoctorDetail';
import DoctorEdit from './components/doctor/DoctorEdit';

import NurseList from './components/nurse/NurseList';
import NurseForm from './components/nurse/NurseForm';
import NurseDetail from './components/nurse/NurseDetail';
import NurseEdit from './components/nurse/NurseEdit';

import RoomList from './components/room/RoomList';
import RoomForm from './components/room/RoomForm';
import RoomDetail from './components/room/RoomDetail';
import RoomEdit from './components/room/RoomEdit';

import DepartmentList from './components/department/DepartmentList';
import DepartmentForm from './components/department/DepartmentForm';
import DepartmentDetail from './components/department/DepartmentDetail';
import DepartmentEdit from './components/department/DepartmentEdit';

import HospitalList from './components/hospital/HospitalList';
import HospitalForm from './components/hospital/HospitalForm';
import HospitalDetail from './components/hospital/HospitalDetail';
import HospitalEdit from './components/hospital/HospitalEdit';

import TransferList from './components/transfer/TransferList';
import TransferForm from './components/transfer/TransferForm';
import TransferDetail from './components/transfer/TransferDetail';
import TransferEdit from './components/transfer/TransferEdit';

import StaffList from './components/staff/StaffList';
import StaffForm from './components/staff/StaffForm';
import StaffDetail from './components/staff/StaffDetail';
import StaffEdit from './components/staff/StaffEdit';

import Navbar from './Pages/Navbar';
import NotFound from './Pages/NotFound';

import Unauthorized from './Pages/Unauthorized';
import ProtectedRoute from './utils/ProtectedRoute';

import DepartmentsInfos from './Pages/DepartmentsInfos';
import DoctorsInfos from './Pages/DoctorsInfos';
import HospitalsInfos from './Pages/HospitalsInfos';
import NursesInfos from './Pages/NursesInfos';
import PatientsInfos from './Pages/PatientsInfos';
import RoomsInfos from './Pages/RoomsInfos';
import StaffsInfos from './Pages/StaffsInfos';
import TransfersInfos from './Pages/TransfersInfos';

import UploadImage from './utils/_IA/UploadImage'

import RequestAppointment from './services/RequestAppointment';
import ConfirmAppointment from './services/ConfirmAppointment';

const App = () => {
    return (
            <Router>
                <Navbar />
                <Routes>
                    <Route path ="/home" element={<Home/>} />
                    <Route path ="/diagnose" element={<UploadImage/>} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/i-patients" element={<PatientsInfos />} />
                    <Route path="/patients" element={<PatientList />} />
                    <Route path="/patients/new" element={<PatientForm />} />
                    <Route path="/patients/:id/" element={<PatientDetail />} />
                    <Route path="/patients/:id/edit" element={<PatientEdit />} />

                    <Route path="/i-doctors" element={<DoctorsInfos />} />
                    <Route path="/doctors" element={<DoctorList />} />
                    <Route path="/doctors/new" element={<DoctorForm />} />
                    <Route path="/doctors/:id" element={<DoctorDetail />} />
                    <Route path="/doctors/:id/edit" element={<DoctorEdit />} />

                    <Route path="/i-nurses" element={<NursesInfos />} />
                    <Route path="/nurses" element={<NurseList />} />
                    <Route path="/nurses/new" element={<NurseForm />} />
                    <Route path="/nurses/:id" element={<NurseDetail />} />
                    <Route path="/nurses/:id/edit" element={<NurseEdit />} />

                    <Route path="/i-rooms" element={<RoomsInfos />} />
                    <Route path="/rooms" element={<RoomList />} />
                    <Route path="/rooms/new" element={<RoomForm />} />
                    <Route path="/rooms/:id" element={<RoomDetail />} />
                    <Route path="/rooms/:id/edit" element={<RoomEdit />} />

                    <Route path="/i-departments" element={<DepartmentsInfos />} />
                    <Route path="/departments" element={<DepartmentList />} />
                    <Route path="/departments/new" element={<DepartmentForm />} />
                    <Route path="/departments/:id" element={<DepartmentDetail />} />
                    <Route path="/departments/:id/edit" element={<DepartmentEdit />} />

                    <Route path="/i-hospitals" element={<HospitalsInfos />} />
                    <Route path="/hospitals" element={<HospitalList />} />
                    <Route path="/hospitals/new" element={<HospitalForm />} />
                    <Route path="/hospitals/:id" element={<HospitalDetail />} />
                    <Route path="/hospitals/:id/edit" element={<HospitalEdit />} />

                    <Route path="/i-transfers" element={<TransfersInfos />} />
                    <Route path="/transfers" element={<TransferList />} />
                    <Route path="/transfers/new" element={<TransferForm />} />
                    <Route path="/transfers/:id" element={<TransferDetail />} />
                    <Route path="/transfers/:id/edit" element={<TransferEdit />} />

                    <Route path="/i-staff" element={<StaffsInfos />} />
                    <Route path="/staff" element={<StaffList />} />
                    <Route path="/staff/new" element={<StaffForm />} />
                    <Route path="/staff/:id" element={<StaffDetail />} />
                    <Route path="/staff/:id/edit" element={<StaffEdit />} />

                    <Route path="*" element={<NotFound />} />

                    <Route path="/unauthorized" element={<Unauthorized />} />


                    <Route path="/create-staff" element={<ProtectedRoute roles={['Administrator','Technician']}><StaffForm /></ProtectedRoute>} />
                    <Route path="/create-department" element={<ProtectedRoute roles={['Administrator', 'Doctor']}><DepartmentForm /></ProtectedRoute>} />
                    <Route path="/create-doctor" element={<ProtectedRoute roles={['Administrator', 'Doctor']}><DoctorForm /></ProtectedRoute>} />
                    <Route path="/create-hospital" element={<ProtectedRoute roles={['Administrator', 'Doctor']}><HospitalForm /></ProtectedRoute>} />
                    <Route path="/create-nurse" element={<ProtectedRoute roles={['Doctor']}><NurseForm /></ProtectedRoute>} />
                    <Route path="/create-room" element={<ProtectedRoute roles={['Administrator', 'Doctor']}><RoomForm /></ProtectedRoute>} />
                    <Route path="/create-transfer" element={<ProtectedRoute roles={['Administrator', 'Doctor']}><TransferForm /></ProtectedRoute>} />
                    <Route path="/create-patient" element={<ProtectedRoute roles={['Doctor', 'Nurse']}><PatientForm /></ProtectedRoute>} />


                    <Route path="/get-departments" element={<ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse','Patient']}><DepartmentList /></ProtectedRoute>} />
                    <Route path="/get-doctors" element={<ProtectedRoute roles={['Administrator','Technician','Caregiver','Other', 'Doctor', 'Nurse','Patient']}><DoctorList /></ProtectedRoute>} />
                    <Route path="/get-hospitals" element={<ProtectedRoute roles={['Administrator','Technician','Caregiver','Other', 'Doctor', 'Nurse','Patient']}><HospitalList /></ProtectedRoute>} />
                    <Route path="/get-nurses" element={<ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse','Patient']}><NurseList /></ProtectedRoute>} />
                    <Route path="/get-rooms" element={<ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse']}><RoomList /></ProtectedRoute>} />
                    <Route path="/get-staffs" element={<ProtectedRoute roles={['Administrator','Technician','Caregiver','Other', 'Doctor', 'Nurse']}><StaffList /></ProtectedRoute>} />
                    <Route path="/get-patients" element={<ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse','Patient']}><PatientList /></ProtectedRoute>} />
                    <Route path="/get-transfers" element={<ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor','Nurse']}><TransferList /></ProtectedRoute>} />


                    <Route path="/get-a-doctor/:id" element={<ProtectedRoute roles={['Administrator', 'Doctor', 'Nurse','Patient']}><DoctorDetail /></ProtectedRoute>} />
                    <Route path="/get-a-nurse/:id" element={<ProtectedRoute roles={['Administrator', 'Doctor', 'Nurse','Technician','Caregiver']}><NurseDetail /></ProtectedRoute>} />
                    <Route path="/get-a-room/:id" element={<ProtectedRoute roles={['Administrator', 'Doctor', 'Nurse']}><RoomDetail /></ProtectedRoute>} />
                    <Route path="/get-a-staff/:id" element={<ProtectedRoute roles={['Administrator','Doctor','Nurse','Technician','Caregiver','Other']}><StaffDetail /></ProtectedRoute>} />
                    <Route path="/get-a-hospital/:id" element={<ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse']}><HospitalDetail /></ProtectedRoute>} />
                    <Route path="/get-a-department/:id" element={<ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse','Patient']}><DepartmentDetail /></ProtectedRoute>} />
                    <Route path="/get-a-patient/:id" element={<ProtectedRoute roles={['Doctor', 'Nurse','Patient']}><PatientDetail /></ProtectedRoute>} />
                    <Route path="/get-a-transfer/:id" element={<ProtectedRoute roles={['Administrator', 'Doctor','Nurse']}><TransferDetail /></ProtectedRoute>} />


                    <Route path="/update-a-department/:id" element={<ProtectedRoute roles={['Administrator', 'Doctor']}><DepartmentEdit /></ProtectedRoute>} />
                    <Route path="/update-a-hospital/:id" element={<ProtectedRoute roles={['Administrator', 'Doctor']}><HospitalEdit /></ProtectedRoute>} />
                    <Route path="/update-a-room/:id" element={<ProtectedRoute roles={['Administrator', 'Doctor']}><RoomEdit /></ProtectedRoute>} />
                    <Route path="/update-a-transfer/:id" element={<ProtectedRoute roles={['Administrator', 'Doctor','Nurse']}><TransferEdit /></ProtectedRoute>} />
                    <Route path="/update-a-nurse/:id" element={<ProtectedRoute roles={['Nurse']}><NurseEdit /></ProtectedRoute>} />
                    <Route path="/update-a-patient/:id" element={<ProtectedRoute roles={['Doctor','Patient']}><PatientEdit /></ProtectedRoute>} />
                    <Route path="/update-a-doctor/:id" element={<ProtectedRoute roles={['Doctor']}><DoctorEdit /></ProtectedRoute>} />
                    <Route path="/update-a-staff/:id" element={<ProtectedRoute roles={['Administrator','Technician','Caregiver','Other',]}><StaffEdit /></ProtectedRoute>} />


                    <Route path="/delete-a-department/:id" element={<ProtectedRoute roles={['Administrator', 'Doctor']}><DepartmentList /></ProtectedRoute>} />
                    <Route path="/delete-a-hospital/:id" element={<ProtectedRoute roles={['Administrator', 'Doctor']}><HospitalList /></ProtectedRoute>} />
                    <Route path="/delete-a-nurse/:id" element={<ProtectedRoute roles={['Doctor']}><NurseList /></ProtectedRoute>} />
                    <Route path="/delete-a-room/:id" element={<ProtectedRoute roles={['Administrator', 'Doctor']}><RoomList /></ProtectedRoute>} />
                    <Route path="/delete-a-transfer/:id" element={<ProtectedRoute roles={['Administrator', 'Doctor']}><TransferList /></ProtectedRoute>} />
                    <Route path="/delete-a-doctor/:id" element={<ProtectedRoute roles={['Administrator']}><DoctorList /></ProtectedRoute>} />
                    <Route path="/delete-a-patient/:id" element={<ProtectedRoute roles={['Doctor']}><PatientList /></ProtectedRoute>} />
                    <Route path="/delete-a-staff/:id" element={<ProtectedRoute roles={['Administrator']}><StaffList /></ProtectedRoute>} />

                    <Route path="/admina" element={<ProtectedRoute roles={['Technician']}><RequestAppointment /></ProtectedRoute>} />
                    <Route path="/adminb" element={<ProtectedRoute roles={['Technician']}><ConfirmAppointment /></ProtectedRoute>} />

                </Routes>
            </Router>
    );
};

export default App;
