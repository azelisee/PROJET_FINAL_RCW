import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useVerifyAccess } from '../utils/DecodeToken';

const Navbar = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('title');
        navigation.navigate('Login');
    };

    const handleNavigation = (page: string, allowedRoles: string[]) => {
        useVerifyAccess(navigation, page, allowedRoles);
    };

    return (
        <View style={styles.navbar}>
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Diagnose" onPress={() => navigation.navigate('Diagnose')} />
            <Button title="Patients" onPress={() => handleNavigation('Patients', ['Administrator', 'Doctor', 'Nurse', 'Technician', 'Caregiver', 'Other', 'Patient'])} />
            <Button title="Doctors" onPress={() => handleNavigation('Doctors', ['Administrator', 'Doctor', 'Nurse', 'Technician', 'Caregiver', 'Other', 'Patient'])} />
            <Button title="Nurses" onPress={() => handleNavigation('Nurses', ['Administrator', 'Doctor', 'Nurse', 'Technician', 'Caregiver', 'Other', 'Patient'])} />
            <Button title="Staff" onPress={() => handleNavigation('Staff', ['Administrator', 'Doctor', 'Nurse', 'Technician', 'Caregiver', 'Other'])} />
            <Button title="Rooms" onPress={() => handleNavigation('Rooms', ['Administrator', 'Doctor', 'Nurse', 'Technician', 'Caregiver', 'Other'])} />
            <Button title="Departments" onPress={() => handleNavigation('Departments', ['Administrator', 'Doctor', 'Nurse', 'Technician', 'Caregiver', 'Other', 'Patient'])} />
            <Button title="Hospitals" onPress={() => handleNavigation('Hospitals', ['Administrator', 'Doctor', 'Nurse', 'Technician', 'Caregiver', 'Other', 'Patient'])} />
            <Button title="Transfers" onPress={() => handleNavigation('Transfers', ['Administrator', 'Doctor', 'Nurse', 'Technician', 'Caregiver', 'Other'])} />
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default Navbar;
