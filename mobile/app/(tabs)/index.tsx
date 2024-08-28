import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../../pages/Home';
import AuthContext from '../../components/context/AuthContext';

import PatientList from '../../components/patient/PatientList';
import PatientForm from '../../components/patient/PatientForm';
import PatientDetail from '../../components/patient/PatientDetail';
import PatientEdit from '../../components/patient/PatientEdit';

import DoctorList from '../../components/doctor/DoctorList';
import DoctorForm from '../../components/doctor/DoctorForm';
import DoctorDetail from '../../components/doctor/DoctorDetail ';
import DoctorEdit from '../../components/doctor/DoctorEdit';

import NurseList from '../../components/nurse/NurseList';
import NurseForm from '../../components/nurse/NurseForm';
import NurseDetail from '../../components/nurse/NurseDetail';
import NurseEdit from '../../components/nurse/NurseEdit';

import RoomList from '../../components/room/RoomList';
import RoomForm from '../../components/room/RoomForm';
import RoomDetail from '../../components/room/RoomDetail';
import RoomEdit from '../../components/room/RoomEdit';

import DepartmentList from '../../components/department/DepartmentList';
import DepartmentForm from '../../components/department/DepartmentForm ';
import DepartmentDetail from '../../components/department/DepartmentDetail';
import DepartmentEdit from '../../components/department/DepartmentEdit';

import HospitalList from '../../components/hospital/HospitalList';
import HospitalForm from '../../components/hospital/HospitalForm';
import HospitalDetail from '../../components/hospital/HospitalDetail';
import HospitalEdit from '../../components/hospital/HospitalEdit';

import TransferList from '../../components/transfer/TransferList';
import TransferForm from '../../components/transfer/TransferForm';
import TransferDetail from '../../components/transfer/TransferDetail';
import TransferEdit from '../../components/transfer/TransferEdit';

import StaffList from '../../components/staff/StaffList';
import StaffForm from '../../components/staff/StaffForm';
import StaffDetail from '../../components/staff/StaffDetail';
import StaffEdit from '../../components/staff/StaffEdit';

import Navbar from '../../pages/Navbar';
import NotFound from '../../pages/NotFound';

import Unauthorized from '../../pages/Unauthorized';
import ProtectedRoute from '../../utils/ProtectedRoute';

import DepartmentsInfos from '../../pages/DepartmentsInfos';
import DoctorsInfos from '../../pages/DoctorsInfos';
import HospitalsInfos from '../../pages/HospitalsInfos';
import NursesInfos from '../../pages/NursesInfos';
import PatientsInfos from '../../pages/PatientsInfos';
import RoomsInfos from '../../pages/RoomsInfos';
import StaffsInfos from '../../pages/StaffsInfos';
import TransfersInfos from '../../pages/TransfersInfos';

import UploadImage from '../../utils/_IA/UploadImage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Navbar />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Diagnose" component={UploadImage} />
        <Stack.Screen name="Login" component={AuthContext} />

        <Stack.Screen name="PatientsInfos" component={PatientsInfos} />
        <Stack.Screen name="PatientList" component={PatientList} />
        <Stack.Screen name="PatientForm" component={PatientForm} />
        <Stack.Screen name="PatientDetail" component={PatientDetail} />
        <Stack.Screen name="PatientEdit" component={PatientEdit} />

        <Stack.Screen name="DoctorsInfos" component={DoctorsInfos} />
        <Stack.Screen name="DoctorList" component={DoctorList} />
        <Stack.Screen name="DoctorForm" component={DoctorForm} />
        <Stack.Screen name="DoctorDetail" component={DoctorDetail} />
        <Stack.Screen name="DoctorEdit" component={DoctorEdit} />

        <Stack.Screen name="NursesInfos" component={NursesInfos} />
        <Stack.Screen name="NurseList" component={NurseList} />
        <Stack.Screen name="NurseForm" component={NurseForm} />
        <Stack.Screen name="NurseDetail" component={NurseDetail} />
        <Stack.Screen name="NurseEdit" component={NurseEdit} />

        <Stack.Screen name="RoomsInfos" component={RoomsInfos} />
        <Stack.Screen name="RoomList" component={RoomList} />
        <Stack.Screen name="RoomForm" component={RoomForm} />
        <Stack.Screen name="RoomDetail" component={RoomDetail} />
        <Stack.Screen name="RoomEdit" component={RoomEdit} />

        <Stack.Screen name="DepartmentsInfos" component={DepartmentsInfos} />
        <Stack.Screen name="DepartmentList" component={DepartmentList} />
        <Stack.Screen name="DepartmentForm" component={DepartmentForm} />
        <Stack.Screen name="DepartmentDetail" component={DepartmentDetail} />
        <Stack.Screen name="DepartmentEdit" component={DepartmentEdit} />

        <Stack.Screen name="HospitalsInfos" component={HospitalsInfos} />
        <Stack.Screen name="HospitalList" component={HospitalList} />
        <Stack.Screen name="HospitalForm" component={HospitalForm} />
        <Stack.Screen name="HospitalDetail" component={HospitalDetail} />
        <Stack.Screen name="HospitalEdit" component={HospitalEdit} />

        <Stack.Screen name="TransfersInfos" component={TransfersInfos} />
        <Stack.Screen name="TransferList" component={TransferList} />
        <Stack.Screen name="TransferForm" component={TransferForm} />
        <Stack.Screen name="TransferDetail" component={TransferDetail} />
        <Stack.Screen name="TransferEdit" component={TransferEdit} />

        <Stack.Screen name="StaffsInfos" component={StaffsInfos} />
        <Stack.Screen name="StaffList" component={StaffList} />
        <Stack.Screen name="StaffForm" component={StaffForm} />
        <Stack.Screen name="StaffDetail" component={StaffDetail} />
        <Stack.Screen name="StaffEdit" component={StaffEdit} />

        <Stack.Screen name="NotFound" component={NotFound} />
        <Stack.Screen name="Unauthorized" component={Unauthorized} />

        {/* Routes protégées */}
        <Stack.Screen name="CreateStaff" component={() => <ProtectedRoute roles={['Administrator','Technician']}><StaffForm /></ProtectedRoute>} />
        <Stack.Screen name="CreateDepartment" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><DepartmentForm /></ProtectedRoute>} />
        <Stack.Screen name="CreateDoctor" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><DoctorForm /></ProtectedRoute>} />
        <Stack.Screen name="CreateHospital" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><HospitalForm /></ProtectedRoute>} />
        <Stack.Screen name="CreateNurse" component={() => <ProtectedRoute roles={['Doctor']}><NurseForm /></ProtectedRoute>} />
        <Stack.Screen name="CreateRoom" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><RoomForm /></ProtectedRoute>} />
        <Stack.Screen name="CreateTransfer" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><TransferForm /></ProtectedRoute>} />
        <Stack.Screen name="CreatePatient" component={() => <ProtectedRoute roles={['Doctor', 'Nurse']}><PatientForm /></ProtectedRoute>} />

        {/* Lecture des routes protégées */}
        <Stack.Screen name="GetDepartments" component={() => <ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse','Patient']}><DepartmentList /></ProtectedRoute>} />
        <Stack.Screen name="GetDoctors" component={() => <ProtectedRoute roles={['Administrator','Technician','Caregiver','Other', 'Doctor', 'Nurse','Patient']}><DoctorList /></ProtectedRoute>} />
        <Stack.Screen name="GetHospitals" component={() => <ProtectedRoute roles={['Administrator','Technician','Caregiver','Other', 'Doctor', 'Nurse','Patient']}><HospitalList /></ProtectedRoute>} />
        <Stack.Screen name="GetNurses" component={() => <ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse','Patient']}><NurseList /></ProtectedRoute>} />
        <Stack.Screen name="GetRooms" component={() => <ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse']}><RoomList /></ProtectedRoute>} />
        <Stack.Screen name="GetStaffs" component={() => <ProtectedRoute roles={['Administrator','Technician','Caregiver','Other', 'Doctor', 'Nurse']}><StaffList /></ProtectedRoute>} />
        <Stack.Screen name="GetPatients" component={() => <ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse','Patient']}><PatientList /></ProtectedRoute>} />
        <Stack.Screen name="GetTransfers" component={() => <ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor','Nurse']}><TransferList /></ProtectedRoute>} />

        {/* Lecture des données spécifiques */}
        <Stack.Screen name="GetDoctor" component={() => <ProtectedRoute roles={['Administrator', 'Doctor', 'Nurse']}><DoctorDetail /></ProtectedRoute>} />
        <Stack.Screen name="GetNurse" component={() => <ProtectedRoute roles={['Administrator', 'Doctor', 'Nurse']}><NurseDetail /></ProtectedRoute>} />
        <Stack.Screen name="GetRoom" component={() => <ProtectedRoute roles={['Administrator', 'Doctor', 'Nurse']}><RoomDetail /></ProtectedRoute>} />
        <Stack.Screen name="GetStaff" component={() => <ProtectedRoute roles={['Administrator', 'Doctor', 'Nurse']}><StaffDetail /></ProtectedRoute>} />
        <Stack.Screen name="GetHospital" component={() => <ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse']}><HospitalDetail /></ProtectedRoute>} />
        <Stack.Screen name="GetDepartment" component={() => <ProtectedRoute roles={['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse']}><DepartmentDetail /></ProtectedRoute>} />
        <Stack.Screen name="GetPatient" component={() => <ProtectedRoute roles={['Doctor', 'Nurse']}><PatientDetail /></ProtectedRoute>} />
        <Stack.Screen name="GetTransfer" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><TransferDetail /></ProtectedRoute>} />

        {/* Mise à jour des routes protégées */}
        <Stack.Screen name="UpdateDepartment" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><DepartmentEdit /></ProtectedRoute>} />
        <Stack.Screen name="UpdateHospital" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><HospitalEdit /></ProtectedRoute>} />
        <Stack.Screen name="UpdateRoom" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><RoomEdit /></ProtectedRoute>} />
        <Stack.Screen name="UpdateTransfer" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><TransferEdit /></ProtectedRoute>} />
        <Stack.Screen name="UpdateNurse" component={() => <ProtectedRoute roles={['Nurse']}><NurseEdit /></ProtectedRoute>} />
        <Stack.Screen name="UpdatePatient" component={() => <ProtectedRoute roles={['Doctor']}><PatientEdit /></ProtectedRoute>} />
        <Stack.Screen name="UpdateDoctor" component={() => <ProtectedRoute roles={['Doctor']}><DoctorEdit /></ProtectedRoute>} />
        <Stack.Screen name="UpdateStaff" component={() => <ProtectedRoute roles={['Administrator','Technician','Caregiver','Other']}><StaffEdit /></ProtectedRoute>} />

        {/* Suppression des routes protégées */}
        <Stack.Screen name="DeleteDepartment" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><DepartmentList /></ProtectedRoute>} />
        <Stack.Screen name="DeleteHospital" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><HospitalList /></ProtectedRoute>} />
        <Stack.Screen name="DeleteNurse" component={() => <ProtectedRoute roles={['Doctor']}><NurseList /></ProtectedRoute>} />
        <Stack.Screen name="DeleteRoom" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><RoomList /></ProtectedRoute>} />
        <Stack.Screen name="DeleteTransfer" component={() => <ProtectedRoute roles={['Administrator', 'Doctor']}><TransferList /></ProtectedRoute>} />
        <Stack.Screen name="DeleteDoctor" component={() => <ProtectedRoute roles={['Administrator']}><DoctorList /></ProtectedRoute>} />
        <Stack.Screen name="DeletePatient" component={() => <ProtectedRoute roles={['Doctor']}><PatientList /></ProtectedRoute>} />
        <Stack.Screen name="DeleteStaff" component={() => <ProtectedRoute roles={['Administrator']}><StaffList /></ProtectedRoute>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
