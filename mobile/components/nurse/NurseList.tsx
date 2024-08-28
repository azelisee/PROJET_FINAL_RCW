import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getNurses, deleteNurse } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const NurseList = () => {
    const [nurses, setNurses] = useState<any[]>([]);
    const [message, setMessage] = useState<string>('');
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'NurseList', ['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse']);
            if (hasAccess) {
                fetchNurses();
            } else {
                navigation.navigate('Unauthorized');
            }
        })();
    }, [navigation]);

    const fetchNurses = () => {
        getNurses()
            .then((response) => {
                if (response.data) {
                    setNurses(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            })
            .catch((error) => {
                console.error('There was an error fetching the nurses!', error);
            });
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this nurse?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        if (id) {
                            deleteNurse(id)
                                .then(() => {
                                    setMessage('Nurse deleted successfully');
                                    setTimeout(() => {
                                        setMessage('');
                                    }, 3000);
                                    fetchNurses();
                                })
                                .catch((error) => {
                                    console.error('Error deleting:', error);
                                    setMessage('Error deleting nurse');
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
            <Text style={styles.title}>Nurses</Text>
            {message ? <Text style={styles.message}>{message}</Text> : null}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('NurseForm')}
            >
                <Text style={styles.addButtonText}>Add Nurse</Text>
            </TouchableOpacity>
            {nurses.length > 0 ? (
                <View style={styles.cardContainer}>
                    {nurses.map((nurse) => (
                        <View key={nurse._id} style={styles.card}>
                            <TouchableOpacity onPress={() => navigation.navigate('NurseDetail', { id: nurse._id })}>
                                <Text style={styles.cardText}>{nurse.name}</Text>
                                <Text style={styles.cardText}>Gender: {nurse.gender}</Text>
                                <Text style={styles.cardText}>Seniority: {nurse.seniority} years</Text>
                            </TouchableOpacity>
                            <Button
                                title="Delete"
                                color="red"
                                onPress={() => handleDelete(nurse._id)}
                            />
                        </View>
                    ))}
                </View>
            ) : (
                <Text>No nurses found</Text>
            )}
        </ScrollView>
    );
};

const styles = {
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    message: {
        color: 'green',
        textAlign: 'center',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cardContainer: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
    },
};

export default NurseList;
