import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getNurseById, updateNurse } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const NurseEdit = () => {
    const [nurse, setNurse] = useState({
        name: '',
        title: '',
        email: '',
        phone: '',
        gender: '',
        department: '',
        hospital: '',
        dateOfBirth: '',
        qualifications: '',
        seniority: '',
        schedule: []
    });
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'NurseEdit', ['Administrator', 'Nurse']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }

            try {
                const response = await getNurseById(id);
                setNurse(response.data);
            } catch (error) {
                setError('There was an error fetching the nurse details!');
                console.error('There was an error fetching the nurse details!', error);
            }
        })();
    }, [id, navigation]);

    const handleChange = (name: string, value: string) => {
        setNurse({ ...nurse, [name]: value });
    };

    const handleScheduleChange = (index: number, field: string, value: string) => {
        const updatedSchedule = [...nurse.schedule];
        updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
        setNurse({ ...nurse, schedule: updatedSchedule });
    };

    const addScheduleSlot = () => {
        setNurse({ ...nurse, schedule: [...nurse.schedule, { day: '', startTime: '', endTime: '' }] });
    };

    const handleSubmit = async () => {
        try {
            await updateNurse(id, nurse);
            navigation.navigate('NurseDetail', { id });
        } catch (error) {
            setError('There was an error updating the nurse!');
            console.error('There was an error updating the nurse!', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Edit Nurse</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={nurse.name}
                onChangeText={(value) => handleChange('name', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={nurse.title}
                onChangeText={(value) => handleChange('title', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={nurse.email}
                onChangeText={(value) => handleChange('email', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={nurse.phone}
                onChangeText={(value) => handleChange('phone', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Gender"
                value={nurse.gender}
                onChangeText={(value) => handleChange('gender', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Department ID"
                value={nurse.department}
                onChangeText={(value) => handleChange('department', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Hospital ID"
                value={nurse.hospital}
                onChangeText={(value) => handleChange('hospital', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                value={nurse.dateOfBirth}
                onChangeText={(value) => handleChange('dateOfBirth', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Qualifications"
                value={nurse.qualifications}
                onChangeText={(value) => handleChange('qualifications', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Seniority (years)"
                value={nurse.seniority}
                onChangeText={(value) => handleChange('seniority', value)}
            />
            <Text style={styles.subtitle}>Schedule</Text>
            {nurse.schedule.map((slot, index) => (
                <View key={index} style={styles.scheduleContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Day"
                        value={slot.day}
                        onChangeText={(value) => handleScheduleChange(index, 'day', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Start Time"
                        value={slot.startTime}
                        onChangeText={(value) => handleScheduleChange(index, 'startTime', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="End Time"
                        value={slot.endTime}
                        onChangeText={(value) => handleScheduleChange(index, 'endTime', value)}
                    />
                </View>
            ))}
            <Button title="Add Schedule" onPress={addScheduleSlot} />
            <Button title="Submit" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    scheduleContainer: {
        marginBottom: 20,
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
});

export default NurseEdit;
