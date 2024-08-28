import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createTransfer } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const TransferForm = () => {
    const [transfer, setTransfer] = useState({
        patient: '',
        fromHospital: '',
        toHospital: '',
        toDepartment: '',
        transferDate: '',
        reason: ''
    });

    const [message, setMessage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'TransferForm', ['Administrator', 'Doctor']);
            if (!hasAccess) {
                return;
            }
        })();
    }, [navigation]);

    const handleChange = (name: string, value: string) => {
        setTransfer({ ...transfer, [name]: value });
    };

    const handleSubmit = () => {
        createTransfer(transfer)
            .then(() => {
                setMessage('Transfer created successfully!');
                navigation.navigate('TransferList');
            })
            .catch(error => {
                setMessage('Error creating transfer.');
                console.error('Error creating transfer:', error);
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add Transfer</Text>
            {message ? <Text style={styles.message}>{message}</Text> : null}
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Patient ID"
                    value={transfer.patient}
                    onChangeText={(value) => handleChange('patient', value)}
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="From Hospital ID"
                    value={transfer.fromHospital}
                    onChangeText={(value) => handleChange('fromHospital', value)}
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="To Hospital ID"
                    value={transfer.toHospital}
                    onChangeText={(value) => handleChange('toHospital', value)}
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="To Department ID"
                    value={transfer.toDepartment}
                    onChangeText={(value) => handleChange('toDepartment', value)}
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Transfer Date"
                    value={transfer.transferDate}
                    onChangeText={(value) => handleChange('transferDate', value)}
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.textArea}
                    placeholder="Reason for Transfer"
                    value={transfer.reason}
                    onChangeText={(value) => handleChange('reason', value)}
                    multiline
                />
            </View>
            <Button title="Add Transfer" onPress={handleSubmit} color="#4CAF50" />
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
    formGroup: {
        marginBottom: 15,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    textArea: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        height: 100,
        textAlignVertical: 'top',
    }
});

export default TransferForm;
