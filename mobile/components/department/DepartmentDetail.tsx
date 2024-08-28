import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getDepartmentById } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const DepartmentDetail = () => {
    const route = useRoute();
    const { id } = route.params as { id: string };
    const navigation = useNavigation();
    const [department, setDepartment] = useState<any>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'DepartmentDetail', ['Administrator','Technician','Caregiver','Other', 'Doctor','Nurse']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }

            try {
                const response = await getDepartmentById(id);
                if (response.data) {
                    setDepartment(response.data);
                } else {
                    console.error('Expected an object but got:', response.data);
                    setError('Invalid response data.');
                }
            } catch (error) {
                console.error('There was an error fetching the department details!', error);
                setError('There was an error fetching the department details!');
            }
        })();
    }, [id, navigation]);

    if (error) return <Text style={styles.error}>{error}</Text>;
    if (!department) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Department Details</Text>
            <Text style={styles.field}><Text style={styles.label}>Department Number:</Text> {department.depNumber}</Text>
            <Text style={styles.field}><Text style={styles.label}>Name:</Text> {department.name}</Text>
            <Text style={styles.field}><Text style={styles.label}>Description:</Text> {department.description}</Text>
            <Text style={styles.field}><Text style={styles.label}>Hospital:</Text> {department.hospital}</Text>
            <Button
                title="Edit Department"
                onPress={() => navigation.navigate('DepartmentEdit', { id: department._id })}
                color="#4CAF50"
            />
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
    field: {
        fontSize: 18,
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default DepartmentDetail;
