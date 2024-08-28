import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDoctor } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const DoctorForm = () => {
    const [doctor, setDoctor] = useState({
        name: '',
        title: '',
        email: '',
        password: '',
        gender: '',
        phone: '',
        speciality: '',
        seniority: '',
        department: '',
        hospital: '',
        schedule: []
    });

    const [message, setMessage] = useState<{ type: string, content: string }>({ type: '', content: '' });
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, ['Administrator', 'Doctor']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
            }
        })();
    }, []);

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
            await createDoctor(doctor);
            setMessage({ type: 'success', content: 'Doctor created successfully!' });
            navigation.navigate('DoctorList');
        } catch (error) {
            setMessage({ type: 'error', content: 'Failed to create doctor.' });
            console.error('There was an error creating the doctor!', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={styles.title}>Add Doctor</Text>
            {message.content ? <Text style={{ color: message.type === 'error' ? 'red' : 'green' }}>{message.content}</Text> : null}

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
                placeholder="Password"
                value={doctor.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry
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
            <Text style={styles.subtitle}>Schedule</Text>
            {doctor.schedule.map((slot, index) => (
                <View key={index} style={styles.scheduleContainer}>
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
            <Button title="Add Schedule" onPress={addScheduleSlot} />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Add Doctor</Text>
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
    },
    button: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    scheduleContainer: {
        marginVertical: 10,
    }
};

export default DoctorForm;
