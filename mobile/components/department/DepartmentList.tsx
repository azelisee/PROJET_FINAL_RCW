import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDepartments, deleteDepartment } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [message, setMessage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'DepartmentList', ['Administrator','Technician','Caregiver','Other', 'Doctor','Nurse','Patient']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }
            fetchDepartments();
        })();
    }, [navigation]);

    const fetchDepartments = async () => {
        try {
            const response = await getDepartments();
            if (response.data) {
                setDepartments(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        } catch (error) {
            console.error('There was an error fetching the departments!', error);
        }
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this department?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await deleteDepartment(id);
                            setMessage('Department deleted successfully');
                            setTimeout(() => {
                                setMessage('');
                            }, 3000);
                            fetchDepartments();
                        } catch (error) {
                            console.error('Error deleting:', error);
                            setMessage('Error deleting department');
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const renderDepartment = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.departmentName}>{item.name}</Text>
            <Text style={styles.departmentDescription}>Description: {item.description}</Text>
            <Button title="View Details" onPress={() => navigation.navigate('DepartmentDetail', { id: item._id })} />
            <Button title="Delete" onPress={() => handleDelete(item._id)} color="red" />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Departments</Text>
            {message ? <Text style={styles.message}>{message}</Text> : null}
            <Button title="Add Department" onPress={() => navigation.navigate('DepartmentForm')} />
            {departments.length > 0 ? (
                <FlatList
                    data={departments}
                    renderItem={renderDepartment}
                    keyExtractor={item => item._id}
                />
            ) : (
                <Text>No departments found</Text>
            )}
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
    card: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    departmentName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    departmentDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    message: {
        color: 'green',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default DepartmentList;
