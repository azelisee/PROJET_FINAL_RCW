import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRoomById } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const RoomDetail = () => {
    const [room, setRoom] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as { id: string };

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'RoomDetail', ['Administrator', 'Doctor', 'Nurse', 'Technician']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }

            try {
                const response = await getRoomById(id);
                setRoom(response.data);
            } catch (error) {
                console.error('There was an error fetching the room details!', error);
                Alert.alert("Error", "There was an error fetching the room details!");
            } finally {
                setLoading(false);
            }
        })();
    }, [id, navigation]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!room) {
        return <Text style={styles.errorText}>Room not found.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Room Details</Text>
            <View style={styles.detailContainer}>
                <Text style={styles.detailText}><Text style={styles.label}>Room Number:</Text> {room.roomNumber}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Bed Number:</Text> {room.bedNumber}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Department:</Text> {room.department.name}</Text>
                <Text style={styles.detailText}><Text style={styles.label}>Hospital:</Text> {room.hospital.name}</Text>
            </View>
            <Button title="Edit Room" onPress={() => navigation.navigate('RoomEdit', { id: room._id })} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    detailContainer: {
        marginBottom: 20,
    },
    detailText: {
        fontSize: 18,
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default RoomDetail;
