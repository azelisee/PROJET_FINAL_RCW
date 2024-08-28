import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getDepartmentById, updateDepartment } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const DepartmentEdit = () => {
    const route = useRoute();
    const { id } = route.params as { id: string };
    const navigation = useNavigation();
    const [department, setDepartment] = useState({
        depNumber: '',
        name: '',
        description: '',
        hospital: ''
    });
    const [error, setError] = useState<string>('');

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'DepartmentEdit', ['Administrator', 'Doctor']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }

            try {
                const response = await getDepartmentById(id);
                if (response.data) {
                    setDepartment(response.data);
                } else {
                    setError('Invalid response data.');
                    console.error('Invalid response data:', response.data);
                }
            } catch (error) {
                setError('There was an error fetching the department details!');
                console.error('There was an error fetching the department details!', error);
            }
        })();
    }, [id, navigation]);

    const handleChange = (name: string, value: string) => {
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateDepartment(id, department);
            navigation.navigate('DepartmentDetail', { id });
        } catch (error) {
            setError('There was an error updating the department!');
            console.error('There was an error updating the department!', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Department</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    value={department.depNumber.toString()}
                    onChangeText={(value) => handleChange('depNumber', value)}
                    placeholder="Department Number"
                    keyboardType="numeric"
                    required
                />
                <TextInput
                    style={styles.input}
                    value={department.name}
                    onChangeText={(value) => handleChange('name', value)}
                    placeholder="Department Name"
                    required
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.textarea}
                    value={department.description}
                    onChangeText={(value) => handleChange('description', value)}
                    placeholder="Description"
                    multiline
                    numberOfLines={4}
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    value={department.hospital}
                    onChangeText={(value) => handleChange('hospital', value)}
                    placeholder="Hospital ID"
                    required
                />
            </View>
            <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
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
    formGroup: {
        marginBottom: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
    },
    textarea: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        height: 100,
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default DepartmentEdit;
