import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRoomById, updateRoom } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const RoomEdit = () => {
    const [room, setRoom] = useState({
        roomNumber: '',
        bedNumber: '',
        department: '',
        hospital: ''
    });
    const [error, setError] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as { id: string };

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'RoomEdit', ['Administrator', 'Doctor']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }

            try {
                const response = await getRoomById(id);
                setRoom(response.data);
            } catch (error) {
                setError('There was an error fetching the room details!');
                console.error('There was an error fetching the room details!', error);
            }
        })();
    }, [id, navigation]);

    const handleChange = (name: string, value: string) => {
        setRoom({ ...room, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateRoom(id, room);
            navigation.navigate('RoomDetail', { id });
        } catch (error) {
            setError('There was an error updating the room!');
            console.error('There was an error updating the room!', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Room</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Room Number"
                value={room.roomNumber}
                onChangeText={(value) => handleChange('roomNumber', value)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Bed Number"
                value={room.bedNumber}
                onChangeText={(value) => handleChange('bedNumber', value)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Department ID"
                value={room.department}
                onChangeText={(value) => handleChange('department', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Hospital ID"
                value={room.hospital}
                onChangeText={(value) => handleChange('hospital', value)}
            />
            <Button title="Submit" onPress={handleSubmit} />
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
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default RoomEdit;
