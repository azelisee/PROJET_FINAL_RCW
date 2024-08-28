import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getTransferById } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const TransferDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params as { id: string };
    const [transfer, setTransfer] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'TransferDetail', ['Administrator', 'Doctor']);
            if (!hasAccess) {
                return;
            }

            getTransferById(id)
                .then((response) => {
                    setTransfer(response.data);
                })
                .catch((error) => {
                    console.error('There was an error fetching the transfer details!', error);
                });
        })();
    }, [id, navigation]);

    if (!transfer) return <Text>Loading...</Text>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Transfer Details</Text>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>Patient:</Text> {transfer.patient.name}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>From Hospital:</Text> {transfer.fromHospital.name}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>To Hospital:</Text> {transfer.toHospital.name}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>To Department:</Text> {transfer.toDepartment.name}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>Transfer Date:</Text> {new Date(transfer.transferDate).toLocaleDateString()}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>Reason:</Text> {transfer.reason}</Text>
            </View>
            <Button
                title="Edit Transfer"
                onPress={() => navigation.navigate('TransferEdit', { id: transfer._id })}
                color="#4CAF50"
            />
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
    detailField: {
        marginBottom: 15,
    },
    label: {
        fontWeight: 'bold',
    },
});

export default TransferDetail;
