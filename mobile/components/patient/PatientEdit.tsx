import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getPatientById, updatePatient } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const PatientEdit = () => {
    const [patient, setPatient] = useState<any>({
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
    const [error, setError] = useState<string>('');
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as { id: string };

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, ['Doctor', 'Nurse']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
            } else if (!id) {
                setError('Patient ID is missing! Redirecting...');
                navigation.navigate('Patients');
            } else {
                fetchPatientDetails();
            }
        })();
    }, []);

    const fetchPatientDetails = async () => {
        try {
            const response = await getPatientById(id);
            if (response.data) {
                const patientData = response.data;
                patientData.dateOfBirth = formatToISODate(patientData.dateOfBirth);
                patientData.medicalFolders = patientData.medicalFolders.map(formatMedicalFolder);
                patientData.consultationHistory = patientData.consultationHistory.map(formatConsultation);
                patientData.treatments = patientData.treatments.map(formatTreatment);
                setPatient(patientData);
            } else {
                setError('Invalid response data');
            }
        } catch (error) {
            setError('There was an error fetching the patient details!');
        }
    };

    const formatToISODate = (date: string) => {
        return date ? new Date(date).toISOString().split('T')[0] : '';
    };

    const formatMedicalFolder = (folder: any) => ({
        ...folder,
        documents: folder.documents.map((doc: any) => ({
            ...doc,
            dateAdded: formatToISODate(doc.dateAdded)
        }))
    });

    const formatConsultation = (consultation: any) => ({
        ...consultation,
        date: formatToISODate(consultation.date)
    });

    const formatTreatment = (treatment: any) => ({
        ...treatment,
        startDate: formatToISODate(treatment.startDate),
        endDate: formatToISODate(treatment.endDate)
    });

    const handleChange = (name: string, value: string) => {
        setPatient({ ...patient, [name]: value });
    };

    const handleNestedChange = (value: string, index: number, field: string, subfield: string | null = null) => {
        const updatedField = [...patient[field]];
        if (subfield) {
            updatedField[index][subfield] = value;
        } else {
            updatedField[index] = value;
        }
        setPatient({ ...patient, [field]: updatedField });
    };

    const addNestedField = (field: string) => {
        let newField = {};
        if (field === 'medicalFolders') {
            newField = { folderName: '', documents: [{ type: '', url: '', dateAdded: '' }] };
        } else if (field === 'consultationHistory') {
            newField = { date: '', doctorId: '', doctorName: '', notes: '', diagnosis: '', prescriptions: [{ medicine: '', dosage: '', duration: '' }], department: '', room: '' };
        } else if (field === 'treatments') {
            newField = { treatmentName: '', startDate: '', endDate: '', description: '', status: '', department: '', room: '' };
        }
        setPatient({ ...patient, [field]: [...patient[field], newField] });
    };

    const handleSubmit = () => {
        if (patient.medicalFolders.some((folder: any) => !folder.folderName)) {
            setError('All medical folders must have a name');
            return;
        }
        if (patient.consultationHistory.some((consultation: any) => !consultation.date || !consultation.doctorId)) {
            setError('All consultations must have a date and doctor ID');
            return;
        }
        if (patient.treatments.some((treatment: any) => !treatment.treatmentName || !treatment.description)) {
            setError('All treatments must have a name and description');
            return;
        }

        updatePatient(id, patient)
            .then(() => {
                navigation.navigate('PatientDetail', { id });
            })
            .catch(error => {
                setError('There was an error updating the patient!');
            });
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Edit Patient</Text>
            {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
            <View style={styles.field}>
                <TextInput placeholder="Name" value={patient.name} onChangeText={(text) => handleChange('name', text)} style={styles.input} />
                <TextInput placeholder="Age" value={patient.age.toString()} onChangeText={(text) => handleChange('age', text)} style={styles.input} keyboardType="numeric" />
            </View>
            <View style={styles.field}>
                <TextInput placeholder="Email" value={patient.email} onChangeText={(text) => handleChange('email', text)} style={styles.input} keyboardType="email-address" />
                <TextInput placeholder="Phone" value={patient.tel} onChangeText={(text) => handleChange('tel', text)} style={styles.input} keyboardType="phone-pad" />
            </View>
            <View style={styles.field}>
                <TextInput placeholder="Address" value={patient.address} onChangeText={(text) => handleChange('address', text)} style={styles.input} />
                <TextInput placeholder="Date of Birth" value={patient.dateOfBirth} onChangeText={(text) => handleChange('dateOfBirth', text)} style={styles.input} />
            </View>
            <View style={styles.field}>
                <TextInput placeholder="Gender" value={patient.gender} onChangeText={(text) => handleChange('gender', text)} style={styles.input} />
                <TextInput placeholder="Blood Type" value={patient.bloodType} onChangeText={(text) => handleChange('bloodType', text)} style={styles.input} />
            </View>

            <Text style={styles.sectionTitle}>Medical Folders</Text>
            {patient.medicalFolders.map((folder: any, index: number) => (
                <View key={index} style={styles.section}>
                    <TextInput placeholder="Folder Name" value={folder.folderName} onChangeText={(text) => handleNestedChange(text, index, 'medicalFolders', 'folderName')} style={styles.input} />
                    <Text style={styles.sectionSubTitle}>Documents</Text>
                    {folder.documents.map((doc: any, docIndex: number) => (
                        <View key={docIndex} style={styles.section}>
                            <TextInput placeholder="Document Type" value={doc.type} onChangeText={(text) => handleNestedChange(text, docIndex, 'medicalFolders', 'type')} style={styles.input} />
                            <TextInput placeholder="Document URL" value={doc.url} onChangeText={(text) => handleNestedChange(text, docIndex, 'medicalFolders', 'url')} style={styles.input} />
                            <TextInput placeholder="Date Added" value={doc.dateAdded} onChangeText={(text) => handleNestedChange(text, docIndex, 'medicalFolders', 'dateAdded')} style={styles.input} />
                        </View>
                    ))}
                </View>
            ))}
            <Button title="Add Medical Folder" onPress={() => addNestedField('medicalFolders')} />

            <Text style={styles.sectionTitle}>Consultation History</Text>
            {patient.consultationHistory.map((consultation: any, index: number) => (
                <View key={index} style={styles.section}>
                    <TextInput placeholder="Consultation Date" value={consultation.date} onChangeText={(text) => handleNestedChange(text, index, 'consultationHistory', 'date')} style={styles.input} />
                    <TextInput placeholder="Doctor ID" value={consultation.doctorId} onChangeText={(text) => handleNestedChange(text, index, 'consultationHistory', 'doctorId')} style={styles.input} />
                    <TextInput placeholder="Doctor Name" value={consultation.doctorName} onChangeText={(text) => handleNestedChange(text, index, 'consultationHistory', 'doctorName')} style={styles.input} />
                    <TextInput placeholder="Notes" value={consultation.notes} onChangeText={(text) => handleNestedChange(text, index, 'consultationHistory', 'notes')} style={styles.input} />
                    <TextInput placeholder="Diagnosis" value={consultation.diagnosis} onChangeText={(text) => handleNestedChange(text, index, 'consultationHistory', 'diagnosis')} style={styles.input} />
                </View>
            ))}
            <Button title="Add Consultation" onPress={() => addNestedField('consultationHistory')} />

            <Text style={styles.sectionTitle}>Treatments</Text>
            {patient.treatments.map((treatment: any, index: number) => (
                <View key={index} style={styles.section}>
                    <TextInput placeholder="Treatment Name" value={treatment.treatmentName} onChangeText={(text) => handleNestedChange(text, index, 'treatments', 'treatmentName')} style={styles.input} />
                    <TextInput placeholder="Start Date" value={treatment.startDate} onChangeText={(text) => handleNestedChange(text, index, 'treatments', 'startDate')} style={styles.input} />
                    <TextInput placeholder="End Date" value={treatment.endDate} onChangeText={(text) => handleNestedChange(text, index, 'treatments', 'endDate')} style={styles.input} />
                    <TextInput placeholder="Description" value={treatment.description} onChangeText={(text) => handleNestedChange(text, index, 'treatments', 'description')} style={styles.input} />
                    <TextInput placeholder="Status" value={treatment.status} onChangeText={(text) => handleNestedChange(text, index, 'treatments', 'status')} style={styles.input} />
                </View>
            ))}
            <Button title="Add Treatment" onPress={() => addNestedField('treatments')} />

            <View style={styles.field}>
                <TextInput placeholder="Current Room" value={patient.currentRoom} onChangeText={(text) => handleChange('currentRoom', text)} style={styles.input} />
            </View>

            <Button title="Submit" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = {
    field: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    sectionSubTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    section: {
        marginBottom: 20,
    },
};

export default PatientEdit;
