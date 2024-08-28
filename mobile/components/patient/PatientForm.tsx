import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createPatient } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const PatientForm = () => {
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        email: '',
        tel: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        bloodType: '',
        medicalFolders: [],
        consultationHistory: [],
        treatments: [],
        currentRoom: ''
    });

    const [message, setMessage] = useState({ type: '', content: '' });
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, ['Doctor', 'Nurse']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
            }
        })();
    }, []);

    const handleChange = (name: string, value: string) => {
        setPatient({ ...patient, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await createPatient(patient);
            setMessage({ type: 'success', content: 'Patient created successfully!' });
            console.log('Patient created', response.data);
            navigation.navigate('PatientList');
        } catch (error) {
            setMessage({ type: 'error', content: 'Failed to create patient.' });
            console.error('There was an error creating the patient!', error);
        }
    };

    const addMedicalFolder = () => {


    const addConsultation = () => {

    };

    const addTreatment = () => {

    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Add New Patient</Text>
                {message.content && (
                    <Text style={{ color: message.type === 'success' ? 'green' : 'red', marginBottom: 20 }}>
                        {message.content}
                    </Text>
                )}
                <View style={{ width: '100%', marginBottom: 10 }}>
                    <TextInput placeholder="Name" value={patient.name} onChangeText={(value) => handleChange('name', value)} style={styles.input} />
                    <TextInput placeholder="Age" value={patient.age} onChangeText={(value) => handleChange('age', value)} style={styles.input} keyboardType="numeric" />
                    <TextInput placeholder="Email" value={patient.email} onChangeText={(value) => handleChange('email', value)} style={styles.input} keyboardType="email-address" />
                    <TextInput placeholder="Phone" value={patient.tel} onChangeText={(value) => handleChange('tel', value)} style={styles.input} keyboardType="phone-pad" />
                    <TextInput placeholder="Address" value={patient.address} onChangeText={(value) => handleChange('address', value)} style={styles.input} />
                    <TextInput placeholder="Date of Birth" value={patient.dateOfBirth} onChangeText={(value) => handleChange('dateOfBirth', value)} style={styles.input} />
                    <TextInput placeholder="Current Room" value={patient.currentRoom} onChangeText={(value) => handleChange('currentRoom', value)} style={styles.input} />
                    <View style={styles.input}>
                        <Text style={styles.label}>Select Gender</Text>
                        <Picker selectedValue={patient.gender} onValueChange={(value) => handleChange('gender', value)}>
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.label}>Select Blood Type</Text>
                        <Picker selectedValue={patient.bloodType} onValueChange={(value) => handleChange('bloodType', value)}>
                            <Picker.Item label="A+" value="A+" />
                            <Picker.Item label="A-" value="A-" />
                            <Picker.Item label="B+" value="B+" />
                            <Picker.Item label="B-" value="B-" />
                            <Picker.Item label="AB+" value="AB+" />
                            <Picker.Item label="AB-" value="AB-" />
                            <Picker.Item label="O+" value="O+" />
                            <Picker.Item label="O-" value="O-" />
                        </Picker>
                    </View>
                </View>

                <View style={{ width: '100%', marginBottom: 10 }}>
                    <Text style={styles.label}>Medical Folders</Text>
                    <TouchableOpacity style={styles.button} onPress={addMedicalFolder}>
                        <Text style={styles.buttonText}>Add Medical Folder</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', marginBottom: 10 }}>
                    <Text style={styles.label}>Consultation History</Text>
                    <TouchableOpacity style={styles.button} onPress={addConsultation}>
                        <Text style={styles.buttonText}>Add Consultation</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', marginBottom: 10 }}>
                    <Text style={styles.label}>Treatments</Text>
                    <TouchableOpacity style={styles.button} onPress={addTreatment}>
                        <Text style={styles.buttonText}>Add Treatment</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Add Patient</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = {
    input: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    }
};

export default PatientForm;
