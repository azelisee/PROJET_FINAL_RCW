import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPatients, deletePatient } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [message, setMessage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, ['Administrator', 'Technician', 'Caregiver', 'Other', 'Doctor', 'Nurse']);
            if (hasAccess) {
                fetchPatients();
            }
        })();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await getPatients();
            if (response.data) {
                setPatients(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        } catch (error) {
            console.error('There was an error fetching the patients!', error);
        }
    };

    const handleAddPatientClick = async () => {
        const hasAccess = await checkAccessAndNavigate(navigation, ['Administrator', 'Technician', 'Caregiver', 'Other', 'Doctor', 'Nurse']);
        if (hasAccess) {
            navigation.navigate('PatientForm');
        }
    };

    const handlePatientDetailClick = async (id: string) => {
        const hasAccess = await checkAccessAndNavigate(navigation, ['Administrator', 'Technician', 'Caregiver', 'Other', 'Doctor', 'Nurse']);
        if (hasAccess) {
            navigation.navigate('PatientDetail', { id });
        }
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this patient?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK", onPress: async () => {
                        try {
                            await deletePatient(id);
                            setMessage('Patient deleted successfully');
                            setTimeout(() => {
                                setMessage('');
                            }, 3000);
                            fetchPatients();
                        } catch (error) {
                            console.error('Error deleting:', error);
                            setMessage('Error deleting patient');
                        }
                    }
                }
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Patients</Text>
                {message && <Text style={{ color: 'red', marginBottom: 20 }}>{message}</Text>}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#4CAF50',
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 20,
                    }}
                    onPress={handleAddPatientClick}
                >
                    <Text style={{ color: 'white' }}>Add Patient</Text>
                </TouchableOpacity>
                {patients.length > 0 ? (
                    patients.map((patient) => (
                        <View key={patient._id} style={{
                            backgroundColor: '#f9f9f9',
                            padding: 15,
                            borderRadius: 10,
                            marginBottom: 10,
                            width: '100%',
                        }}>
                            <TouchableOpacity onPress={() => handlePatientDetailClick(patient._id)}>
                                <Text style={{ fontSize: 18 }}>{patient.name}</Text>
                                <Text>Age: {patient.age} years old</Text>
                                <Text>Sex: {patient.gender}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#FF0000',
                                    padding: 5,
                                    borderRadius: 5,
                                    marginTop: 10,
                                }}
                                onPress={() => handleDelete(patient._id)}
                            >
                                <Text style={{ color: 'white', textAlign: 'center' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text>No patients found</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default PatientList;
