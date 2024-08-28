import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDoctorById, updateDoctor } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const DoctorEdit = () => {
    const [doctor, setDoctor] = useState<any>({
        name: '',
        title: '',
        email: '',
        phone: '',
        gender: '',
        speciality: '',
        seniority: '',
        department: '',
        hospital: '',
        schedule: [],
    });

    const [error, setError] = useState<string>('');
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as { id: string };

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'DoctorEdit', ['Administrator', 'Doctor']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
            } else {
                try {
                    const response = await getDoctorById(id);
                    setDoctor(response.data);
                } catch (error) {
                    setError('There was an error fetching the doctor details!');
                    console.error('There was an error fetching the doctor details!', error);
                }
            }
        })();
    }, [id, navigation]);

    const handleChange = (name: string, value: string) => {
        setDoctor({ ...doctor, [name]: value });
    };

    const handleScheduleChange = (index: number, field: string, value: string) => {
        const updatedSchedule = [...doctor.schedule];
        updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
        setDoctor({ ...doctor, schedule: updatedSchedule });
    };

    const addScheduleSlot = () => {
        setDoctor({ ...doctor, schedule: [...doctor.schedule, { day: '', startTime: '', endTime: '' }] });
    };

    const handleSubmit = async () => {
        try {
            await updateDoctor(id, doctor);
            navigation.navigate('DoctorDetail', { id });
        } catch (error) {
            setError('There was an error updating the doctor!');
            console.error('There was an error updating the doctor!', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Edit Doctor</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={doctor.name}
                    onChangeText={(value) => handleChange('name', value)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={doctor.title}
                    onChangeText={(value) => handleChange('title', value)}
                    required
                />
            </View>

            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={doctor.email}
                    onChangeText={(value) => handleChange('email', value)}
                    keyboardType="email-address"
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={doctor.phone}
                    onChangeText={(value) => handleChange('phone', value)}
                    keyboardType="phone-pad"
                    required
                />
            </View>

            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Speciality"
                    value={doctor.speciality}
                    onChangeText={(value) => handleChange('speciality', value)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Seniority (years)"
                    value={doctor.seniority}
                    onChangeText={(value) => handleChange('seniority', value)}
                    keyboardType="numeric"
                    required
                />
            </View>

            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Department ID"
                    value={doctor.department}
                    onChangeText={(value) => handleChange('department', value)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Hospital ID"
                    value={doctor.hospital}
                    onChangeText={(value) => handleChange('hospital', value)}
                    required
                />
            </View>

            <Text style={styles.sectionTitle}>Schedule</Text>
            {doctor.schedule.map((slot: any, index: number) => (
                <View key={index} style={styles.formGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="Day"
                        value={slot.day}
                        onChangeText={(value) => handleScheduleChange(index, 'day', value)}
                        required
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Start Time"
                        value={slot.startTime}
                        onChangeText={(value) => handleScheduleChange(index, 'startTime', value)}
                        required
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="End Time"
                        value={slot.endTime}
                        onChangeText={(value) => handleScheduleChange(index, 'endTime', value)}
                        required
                    />
                </View>
            ))}
            <TouchableOpacity onPress={addScheduleSlot} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = {
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
};

export default DoctorEdit;
