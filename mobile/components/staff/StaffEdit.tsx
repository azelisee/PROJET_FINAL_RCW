import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStaffById, updateStaff } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const StaffEdit = () => {
    const [staff, setStaff] = useState<any>({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        hospital: '',
        dateOfBirth: ''
    });
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const { id }: any = route.params;

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'StaffEdit', ['Administrator', 'Technician', 'Caregiver', 'Other']);
            if (!hasAccess) {
                return;
            }
            fetchStaffDetails();
        })();
    }, [id, navigation]);

    const fetchStaffDetails = () => {
        getStaffById(id).then((response) => {
            setStaff(response.data);
        }).catch(error => {
            setError('There was an error fetching the staff details!');
            console.error('There was an error fetching the staff details!', error);
        });
    };

    const handleChange = (name: string, value: string) => {
        setStaff({ ...staff, [name]: value });
    };

    const handleSubmit = () => {
        updateStaff(id, staff).then(() => {
            navigation.navigate('StaffDetail', { id });
        }).catch(error => {
            setError('There was an error updating the staff!');
            console.error('There was an error updating the staff!', error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Staff</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={staff.name}
                onChangeText={(value) => handleChange('name', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={staff.email}
                onChangeText={(value) => handleChange('email', value)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={staff.phone}
                onChangeText={(value) => handleChange('phone', value)}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Role"
                value={staff.role}
                onChangeText={(value) => handleChange('role', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Department ID"
                value={staff.department}
                onChangeText={(value) => handleChange('department', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Hospital ID"
                value={staff.hospital}
                onChangeText={(value) => handleChange('hospital', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                value={staff.dateOfBirth}
                onChangeText={(value) => handleChange('dateOfBirth', value)}
            />
            <Button title="Submit" onPress={handleSubmit} color="#5cb85c" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default StaffEdit;
