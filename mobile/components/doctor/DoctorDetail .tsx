import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDoctorById } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const DoctorDetail = () => {
    const [doctor, setDoctor] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params as { id: string };

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, ['Administrator', 'Doctor', 'Nurse']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
            } else {
                try {
                    const response = await getDoctorById(id);
                    if (response.data) {
                        setDoctor(response.data);
                    } else {
                        console.error('Expected an object but got:', response.data);
                    }
                } catch (error) {
                    console.error('There was an error fetching the doctor details!', error);
                    Alert.alert('Error', 'There was an error fetching the doctor details.');
                } finally {
                    setLoading(false);
                }
            }
        })();
    }, [id, navigation]);

    if (loading) return <Text>Loading...</Text>;

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={styles.title}>Doctor Details</Text>

            <View style={styles.detailField}>
                <Text style={styles.label}><strong>Title:</strong></Text>
                <Text style={styles.value}>{doctor.title}</Text>
            </View>

            <View style={styles.detailField}>
                <Text style={styles.label}><strong>Email:</strong></Text>
                <Text style={styles.value}>{doctor.email}</Text>
            </View>

            <View style={styles.detailField}>
                <Text style={styles.label}><strong>Phone:</strong></Text>
                <Text style={styles.value}>{doctor.phone}</Text>
            </View>

            <View style={styles.detailField}>
                <Text style={styles.label}><strong>Speciality:</strong></Text>
                <Text style={styles.value}>{doctor.speciality}</Text>
            </View>

            <View style={styles.detailField}>
                <Text style={styles.label}><strong>Seniority:</strong></Text>
                <Text style={styles.value}>{doctor.seniority} years</Text>
            </View>

            <View style={styles.detailField}>
                <Text style={styles.label}><strong>Gender:</strong></Text>
                <Text style={styles.value}>{doctor.gender}</Text>
            </View>

            <View style={styles.detailField}>
                <Text style={styles.label}><strong>Department:</strong></Text>
                <Text style={styles.value}>{doctor.department.name}</Text>
            </View>

            <View style={styles.detailField}>
                <Text style={styles.label}><strong>Hospital:</strong></Text>
                <Text style={styles.value}>{doctor.hospital.name}</Text>
            </View>

            <Text style={styles.subtitle}>Schedule:</Text>
            <View>
                {doctor.schedule.map((slot, index) => (
                    <Text key={index} style={styles.listItem}>{slot.day}: {slot.startTime} - {slot.endTime}</Text>
                ))}
            </View>

            <Text style={styles.subtitle}>Appointments:</Text>
            <View>
                {doctor.appointments.map((appointment, index) => (
                    <Text key={index} style={styles.listItem}>
                        Patient: {appointment.patient.name} on {new Date(appointment.date).toLocaleDateString()} at {appointment.time} ({appointment.status})
                    </Text>
                ))}
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('DoctorEdit', { id: doctor._id })} style={styles.button}>
                <Text style={styles.buttonText}>Edit Doctor</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = {
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    detailField: {
        marginBottom: 15,
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
    },
    listItem: {
        fontSize: 16,
        marginBottom: 5,
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
};

export default DoctorDetail;
