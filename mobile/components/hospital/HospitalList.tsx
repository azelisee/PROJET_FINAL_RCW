import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getHospitals, deleteHospital } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const HospitalList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [message, setMessage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'HospitalList', ['Administrator', 'Technician','Caregiver','Other','Doctor']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }
            fetchHospitals();
        })();
    }, [navigation]);

    const fetchHospitals = () => {
        getHospitals().then((response) => {
            if (response.data) {
                setHospitals(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the hospitals!', error);
        });
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this hospital?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        if (id) {
                            deleteHospital(id)
                                .then(() => {
                                    setMessage('Hospital deleted successfully');
                                    setTimeout(() => {
                                        setMessage('');
                                    }, 3000);
                                    fetchHospitals();
                                    navigation.navigate('HospitalList');
                                })
                                .catch(error => {
                                    console.error('Error deleting:', error);
                                    setMessage('Error deleting hospital');
                                });
                        } else {
                            console.error('ID is undefined');
                        }
                    }
                }
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Hospitals</Text>
            {message && <Text style={styles.message}>{message}</Text>}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('HospitalForm')}
            >
                <Text style={styles.addButtonText}>Add Hospital</Text>
            </TouchableOpacity>
            {hospitals.length > 0 ? (
                hospitals.map((hospital) => (
                    <View key={hospital._id} style={styles.card}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('HospitalDetail', { id: hospital._id })}
                        >
                            <Text style={styles.cardText}>{hospital.name}</Text>
                            <Text style={styles.cardText}>Address: {hospital.address}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(hospital._id)}
                        >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text style={styles.noHospitalsText}>No hospitals found</Text>
            )}
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
        textAlign: 'center',
    },
    message: {
        color: 'green',
        textAlign: 'center',
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    cardText: {
        fontSize: 18,
        marginBottom: 5,
    },
    deleteButton: {
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    noHospitalsText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
    },
});

export default HospitalList;
