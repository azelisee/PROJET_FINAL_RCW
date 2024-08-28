import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStaff } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const StaffForm = () => {
    const [staff, setStaff] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: '',
        department: '',
        hospital: '',
        dateOfBirth: '',
    });

    const [message, setMessage] = useState({ type: '', content: '' });
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'StaffForm', ['Administrator', 'Technician']);
            if (!hasAccess) {
                return;
            }
        })();
    }, [navigation]);

    const handleChange = (name: string, value: string) => {
        setStaff({ ...staff, [name]: value });
    };

    const handleSubmit = () => {
        createStaff(staff).then(() => {
            Alert.alert('Success', 'Staff member created successfully!', [
                { text: 'OK', onPress: () => navigation.navigate('StaffList') },
            ]);
        }).catch(error => {
            setMessage({ type: 'error', content: 'Error creating staff member.' });
            console.error('Error creating staff member:', error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Staff</Text>
            {message.content && (
                <Text style={[styles.message, styles[message.type]]}>
                    {message.content}
                </Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={staff.name}
                onChangeText={(value) => handleChange('name', value)}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={staff.email}
                onChangeText={(value) => handleChange('email', value)}
                keyboardType="email-address"
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={staff.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={staff.phone}
                onChangeText={(value) => handleChange('phone', value)}
                keyboardType="phone-pad"
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Department ID"
                value={staff.department}
                onChangeText={(value) => handleChange('department', value)}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Hospital ID"
                value={staff.hospital}
                onChangeText={(value) => handleChange('hospital', value)}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                value={staff.dateOfBirth}
                onChangeText={(value) => handleChange('dateOfBirth', value)}
                required
            />
            <Button title="Create Staff" onPress={handleSubmit} color="#5cb85c" />
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
        marginBottom: 20,
        paddingLeft: 10,
    },
    message: {
        marginBottom: 20,
        textAlign: 'center',
    },
    error: {
        color: 'red',
    },
    success: {
        color: 'green',
    },
});

export default StaffForm;
