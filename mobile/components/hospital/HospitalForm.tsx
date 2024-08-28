import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createHospital } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const HospitalForm = () => {
    const [hospital, setHospital] = useState({
        name: '',
        address: '',
        website: '',
        email: '',
        phone: '',
        departments: []
    });

    const [message, setMessage] = useState({ type: '', content: '' });
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'HospitalForm', ['Administrator']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }
        })();
    }, [navigation]);

    const handleChange = (name: string, value: string) => {
        setHospital({ ...hospital, [name]: value });
    };

    const handleSubmit = () => {
        createHospital(hospital)
            .then(() => {
                setMessage({ type: 'success', content: 'Hospital created successfully!' });
                navigation.navigate('HospitalList');
            })
            .catch(error => {
                setMessage({ type: 'error', content: 'Error creating hospital.' });
                console.error('Error creating hospital:', error);
                Alert.alert('Error', 'There was an error creating the hospital.');
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add Hospital</Text>
            {message.content && (
                <Text style={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                    {message.content}
                </Text>
            )}
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={hospital.name}
                    onChangeText={(text) => handleChange('name', text)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={hospital.address}
                    onChangeText={(text) => handleChange('address', text)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Website"
                    value={hospital.website}
                    onChangeText={(text) => handleChange('website', text)}
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={hospital.email}
                    onChangeText={(text) => handleChange('email', text)}
                    keyboardType="email-address"
                    required
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={hospital.phone}
                    onChangeText={(text) => handleChange('phone', text)}
                    keyboardType="phone-pad"
                    required
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Add Hospital</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    successMessage: {
        color: 'green',
        textAlign: 'center',
        marginBottom: 10,
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default HospitalForm;
