import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './components/Home';
import  AuthContext  from './components/context/AuthContext';

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

import Navbar from './components/Navbar';
import NotFound from './components/NotFound';

const App = () => {
    return (
            <Router>
                <Navbar />
                <Routes>
                    <Route path ="/" element={<Home/>} />
                    <Route path="/login" element={<AuthContext />} />

                    <Route path="/patients" element={<PatientList />} />
                    <Route path="/patients/new" element={<PatientForm />} />
                    <Route path="/patients/:id/" element={<PatientDetail />} />
                    <Route path="/patients/:id/edit" element={<PatientEdit />} />


                    <Route path="/doctors" element={<DoctorList />} />
                    <Route path="/doctors/new" element={<DoctorForm />} />
                    <Route path="/doctors/:id" element={<DoctorDetail />} />
                    <Route path="/doctors/:id/edit" element={<DoctorEdit />} />

                    <Route path="/nurses" element={<NurseList />} />
                    <Route path="/nurses/new" element={<NurseForm />} />
                    <Route path="/nurses/:id" element={<NurseDetail />} />
                    <Route path="/nurses/:id/edit" element={<NurseEdit />} />

                    <Route path="/rooms" element={<RoomList />} />
                    <Route path="/rooms/new" element={<RoomForm />} />
                    <Route path="/rooms/:id" element={<RoomDetail />} />
                    <Route path="/rooms/:id/edit" element={<RoomEdit />} />

                    <Route path="/departments" element={<DepartmentList />} />
                    <Route path="/departments/new" element={<DepartmentForm />} />
                    <Route path="/departments/:id" element={<DepartmentDetail />} />
                    <Route path="/departments/:id/edit" element={<DepartmentEdit />} />

                    <Route path="/hospitals" element={<HospitalList />} />
                    <Route path="/hospitals/new" element={<HospitalForm />} />
                    <Route path="/hospitals/:id" element={<HospitalDetail />} />
                    <Route path="/hospitals/:id/edit" element={<HospitalEdit />} />

                    <Route path="/transfers" element={<TransferList />} />
                    <Route path="/transfers/new" element={<TransferForm />} />
                    <Route path="/transfers/:id" element={<TransferDetail />} />
                    <Route path="/transfers/:id/edit" element={<TransferEdit />} />

                    <Route path="/staff" element={<StaffList />} />
                    <Route path="/staff/new" element={<StaffForm />} />
                    <Route path="/staff/:id" element={<StaffDetail />} />
                    <Route path="/staff/:id/edit" element={<StaffEdit />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
    );
};

export default App;
