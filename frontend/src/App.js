import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './components/Home';

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
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path ="/" element={<Home/>} />
                    <Route path="/patients" element={<PatientList />} />
                    <Route path="/patients/new" element={<PatientForm />} />
                    <Route path="/patients/:id" element={<PatientDetail />} />
                    <Route path="/patients/edit/:id" element={<PatientEdit />} />
                    <Route path="/doctors" element={<DoctorList />} />
                    <Route path="/doctors/new" element={<DoctorForm />} />
                    <Route path="/doctors/:id" element={<DoctorDetail />} />
                    <Route path="/doctors/edit/:id" element={<DoctorEdit />} />
                    <Route path="/nurses" element={<NurseList />} />
                    <Route path="/nurses/new" element={<NurseForm />} />
                    <Route path="/nurses/:id" element={<NurseDetail />} />
                    <Route path="/nurses/edit/:id" element={<NurseEdit />} />
                    <Route path="/rooms" element={<RoomList />} />
                    <Route path="/rooms/new" element={<RoomForm />} />
                    <Route path="/rooms/:id" element={<RoomDetail />} />
                    <Route path="/rooms/edit/:id" element={<RoomEdit />} />
                    <Route path="/departments" element={<DepartmentList />} />
                    <Route path="/departments/new" element={<DepartmentForm />} />
                    <Route path="/departments/:id" element={<DepartmentDetail />} />
                    <Route path="/departments/edit/:id" element={<DepartmentEdit />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
