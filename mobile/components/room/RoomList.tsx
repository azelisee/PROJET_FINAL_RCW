import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getRooms, deleteRoom } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [message, setMessage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'RoomList', ['Administrator', 'Doctor', 'Nurse']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }

            fetchRooms();
        })();
    }, [navigation]);

    const fetchRooms = async () => {
        try {
            const response = await getRooms();
            if (response.data) {
                setRooms(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        } catch (error) {
            console.error('There was an error fetching the rooms!', error);
        }
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this room?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            await deleteRoom(id);
                            setMessage('Room deleted successfully');
                            setTimeout(() => setMessage(''), 3000);
                            fetchRooms();
                        } catch (error) {
                            console.error('Error deleting:', error);
                            setMessage('Error deleting room');
                        }
                    }
                }
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Rooms</Text>
            {message ? <Text style={styles.message}>{message}</Text> : null}
            <Button title="Add Room" onPress={() => navigation.navigate('RoomForm')} />
            {rooms.length > 0 ? (
                rooms.map((room) => (
                    <View key={room._id} style={styles.card}>
                        <TouchableOpacity onPress={() => navigation.navigate('RoomDetail', { id: room._id })}>
                            <Text style={styles.cardText}>Room Number: {room.roomNumber}</Text>
                            <Text style={styles.cardText}>Bed Number: {room.bedNumber}</Text>
                        </TouchableOpacity>
                        <Button title="Delete" onPress={() => handleDelete(room._id)} />
                    </View>
                ))
            ) : (
                <Text>No rooms found</Text>
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
    },
    message: {
        color: 'green',
        marginBottom: 20,
    },
    card: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
    },
    cardText: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default RoomList;
