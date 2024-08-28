import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDepartment } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const DepartmentForm = () => {
    const [department, setDepartment] = useState({
        depNumber: '',
        name: '',
        description: '',
        hospital: ''
    });

    const [message, setMessage] = useState({ type: '', content: '' });
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'DepartmentForm', ['Administrator', 'Doctor']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }
        })();
    }, [navigation]);

    const handleChange = (name: string, value: string) => {
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await createDepartment(department);
            setMessage({ type: 'success', content: 'Department created successfully!' });
            navigation.navigate('DepartmentList');
        } catch (error) {
            setMessage({ type: 'error', content: 'Error creating department.' });
            console.error('Error creating department:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Department</Text>
            {message.content ? (
                <Text style={[styles.message, message.type === 'success' ? styles.success : styles.error]}>
                    {message.content}
                </Text>
            ) : null}
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Department Number"
                    value={department.depNumber}
                    onChangeText={(value) => handleChange('depNumber', value)}
                    keyboardType="numeric"
                    required
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Department Name"
                    value={department.name}
                    onChangeText={(value) => handleChange('name', value)}
                    required
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Description"
                    value={department.description}
                    onChangeText={(value) => handleChange('description', value)}
                    multiline
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Hospital ID"
                    value={department.hospital}
                    onChangeText={(value) => handleChange('hospital', value)}
                    required
                />
            </View>
            <Button title="Add Department" onPress={handleSubmit} color="#4CAF50" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 15,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    message: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    success: {
        color: 'green',
    },
    error: {
        color: 'red',
    },
});

export default DepartmentForm;
