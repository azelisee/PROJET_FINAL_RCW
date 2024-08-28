import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTransfers, deleteTransfer } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const TransferList = () => {
    const [transfers, setTransfers] = useState([]);
    const [message, setMessage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'TransferList', ['Administrator', 'Doctor', 'Nurse']);
            if (!hasAccess) {
                return;
            }
            fetchTransfers();
        })();
    }, [navigation]);

    const fetchTransfers = () => {
        getTransfers().then((response) => {
            if (response.data) {
                setTransfers(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the transfers!', error);
        });
    };

    const handleDelete = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this transfer?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: () => {
                        if (id) {
                            deleteTransfer(id)
                                .then(response => {
                                    setMessage('Transfer deleted successfully');
                                    setTimeout(() => {
                                        setMessage('');
                                    }, 3000);
                                    fetchTransfers();
                                })
                                .catch(error => {
                                    console.error('Error deleting:', error);
                                    setMessage('Error deleting transfer');
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
            <Text style={styles.title}>Transfers</Text>
            {message ? <Text style={styles.message}>{message}</Text> : null}
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('TransferForm')}>
                <Text style={styles.buttonText}>Add Transfer</Text>
            </TouchableOpacity>
            {transfers.length > 0 ? (
                transfers.map((transfer) => (
                    <View key={transfer._id} style={styles.card}>
                        <TouchableOpacity onPress={() => navigation.navigate('TransferDetail', { id: transfer._id })}>
                            <Text>Date: {new Date(transfer.transferDate).toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        <Button title="Delete" onPress={() => handleDelete(transfer._id)} />
                    </View>
                ))
            ) : (
                <Text>No transfers found</Text>
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
        marginBottom: 20,
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    card: {
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    }
});

export default TransferList;
