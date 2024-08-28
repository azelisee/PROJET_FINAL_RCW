import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getPatientById } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const PatientDetail = () => {
    const [patient, setPatient] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as { id: string };

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, ['Doctor', 'Nurse']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
            } else {
                fetchPatientDetails();
            }
        })();
    }, []);

    const fetchPatientDetails = async () => {
        try {
            const response = await getPatientById(id);
            if (response.data) {
                setPatient(response.data);
            } else {
                console.error('Expected an object but got:', response.data);
                setError('Invalid response data.');
            }
        } catch (error) {
            console.error('There was an error fetching the patient details!', error);
            setError('There was an error fetching the patient details!');
        }
    };

    if (error) return <View><Text>{error}</Text></View>;
    if (!patient) return <View><Text>Loading...</Text></View>;

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Patient Details</Text>

                <View style={styles.field}>
                    <Text style={styles.label}>Name:</Text>
                    <Text>{patient.name}</Text>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Age:</Text>
                    <Text>{patient.age}</Text>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Email:</Text>
                    <Text>{patient.email}</Text>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Phone:</Text>
                    <Text>{patient.tel}</Text>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Address:</Text>
                    <Text>{patient.address}</Text>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Date of Birth:</Text>
                    <Text>{new Date(patient.dateOfBirth).toLocaleDateString()}</Text>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Gender:</Text>
                    <Text>{patient.gender}</Text>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Blood Type:</Text>
                    <Text>{patient.bloodType}</Text>
                </View>

                <Text style={styles.sectionTitle}>Medical Folders</Text>
                {patient.medicalFolders.length > 0 ? patient.medicalFolders.map((folder, index) => (
                    <View key={index} style={styles.folderContainer}>
                        <Text style={styles.folderTitle}>{folder.folderName}</Text>
                        {folder.documents.map((doc, idx) => (
                            <TouchableOpacity key={idx} onPress={() => openURL(doc.url)}>
                                <Text style={styles.link}>{doc.type}</Text>
                                <Text>(Added on: {new Date(doc.dateAdded).toLocaleDateString()})</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )) : <Text>No medical folders available.</Text>}

                <Text style={styles.sectionTitle}>Consultation History</Text>
                {patient.consultationHistory.length > 0 ? patient.consultationHistory.map((consultation, index) => (
                    <View key={index}>
                        <Text><Text style={styles.label}>Date:</Text> {new Date(consultation.date).toLocaleDateString()}</Text>
                        <Text><Text style={styles.label}>Doctor:</Text> {consultation.doctorName}</Text>
                        <Text><Text style={styles.label}>Notes:</Text> {consultation.notes}</Text>
                        <Text><Text style={styles.label}>Diagnosis:</Text> {consultation.diagnosis}</Text>
                        <Text style={styles.label}>Prescriptions:</Text>
                        {consultation.prescriptions.map((prescription, idx) => (
                            <Text key={idx}>{prescription.medicine} - {prescription.dosage} for {prescription.duration}</Text>
                        ))}
                        <Text><Text style={styles.label}>Department:</Text> {consultation.department}</Text>
                        <Text><Text style={styles.label}>Room:</Text> {consultation.room}</Text>
                    </View>
                )) : <Text>No consultation history available.</Text>}

                <Text style={styles.sectionTitle}>Treatments</Text>
                {patient.treatments.length > 0 ? patient.treatments.map((treatment, index) => (
                    <View key={index}>
                        <Text><Text style={styles.label}>Treatment Name:</Text> {treatment.treatmentName}</Text>
                        <Text><Text style={styles.label}>Description:</Text> {treatment.description}</Text>
                        <Text><Text style={styles.label}>Status:</Text> {treatment.status}</Text>
                        <Text><Text style={styles.label}>Start Date:</Text> {new Date(treatment.startDate).toLocaleDateString()}</Text>
                        <Text><Text style={styles.label}>End Date:</Text> {treatment.endDate ? new Date(treatment.endDate).toLocaleDateString() : 'Ongoing'}</Text>
                        <Text><Text style={styles.label}>Department:</Text> {treatment.department}</Text>
                        <Text><Text style={styles.label}>Room:</Text> {treatment.room}</Text>
                    </View>
                )) : <Text>No treatments available.</Text>}

                <Text style={styles.sectionTitle}>Current Room</Text>
                <Text>{patient.currentRoom}</Text>

                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('PatientEdit', { id: patient._id })}>
                    <Text style={styles.editButtonText}>Edit Patient</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = {
    field: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    folderContainer: {
        marginBottom: 15,
    },
    folderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    editButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
};

const openURL = (url: string) => {
    Alert.alert('Open URL', `Opening URL: ${url}`);
};

export default PatientDetail;
