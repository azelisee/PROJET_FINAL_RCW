import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNurse } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const NurseForm = () => {
    const [nurse, setNurse] = useState({
        name: '',
        title: '',
        email: '',
        password: '',
        gender: '',
        phone: '',
        department: '',
        hospital: '',
        dateOfBirth: '',
        qualifications: '',
        seniority: '',
        schedule: []
    });

    const [message, setMessage] = useState({ type: '', content: '' });
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'NurseForm', ['Doctor']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
            }
        })();
    }, [navigation]);

    const handleChange = (name: string, value: string) => {
        setNurse({ ...nurse, [name]: value });
    };

    const handleSubmit = () => {
        createNurse(nurse)
            .then(() => {
                setMessage({ type: 'success', content: 'Nurse created successfully!' });
                navigation.navigate('NurseList');
            })
            .catch((error) => {
                setMessage({ type: 'error', content: 'Error creating nurse.' });
                console.error('Error creating nurse:', error);
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add Nurse</Text>
            {message.content ? (
                <Text style={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                    {message.content}
                </Text>
            ) : null}
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={(value) => handleChange('name', value)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    onChangeText={(value) => handleChange('title', value)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(value) => handleChange('email', value)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={(value) => handleChange('password', value)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Gender"
                    onChangeText={(value) => handleChange('gender', value)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    keyboardType="phone-pad"
                    onChangeText={(value) => handleChange('phone', value)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Department ID"
                    onChangeText={(value) => handleChange('department', value)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Hospital ID"
                    onChangeText={(value) => handleChange('hospital', value)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date of Birth"
                    onChangeText={(value) => handleChange('dateOfBirth', value)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Qualifications"
                    onChangeText={(value) => handleChange('qualifications', value)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Seniority (years)"
                    keyboardType="numeric"
                    onChangeText={(value) => handleChange('seniority', value)}
                    required
                />
            </View>
            <Button title="Add Nurse" onPress={handleSubmit} color="green" />
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
        textAlign: 'center',
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    successMessage: {
        color: 'green',
        textAlign: 'center',
        marginBottom: 20,
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default NurseForm;
