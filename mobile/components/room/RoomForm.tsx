import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createRoom } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const RoomForm = () => {
    const [room, setRoom] = useState({
        roomNumber: '',
        bedNumber: '',
        department: '',
        hospital: ''
    });

    const [message, setMessage] = useState({ type: '', content: '' });
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'RoomForm', ['Administrator', 'Doctor']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }
        })();
    }, [navigation]);

    const handleChange = (name: string, value: string) => {
        setRoom({ ...room, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await createRoom(room);
            setMessage({ type: 'success', content: 'Room created successfully!' });
            Alert.alert("Success", "Room created successfully!", [
                { text: "OK", onPress: () => navigation.navigate('RoomList') }
            ]);
        } catch (error) {
            setMessage({ type: 'error', content: 'Error creating room.' });
            console.error('Error creating room:', error);
            Alert.alert("Error", "There was an error creating the room.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Room</Text>
            {message.content ? (
                <Text style={[styles.message, message.type === 'error' ? styles.error : styles.success]}>
                    {message.content}
                </Text>
            ) : null}
            <TextInput
                style={styles.input}
                placeholder="Room Number"
                keyboardType="numeric"
                value={room.roomNumber}
                onChangeText={(value) => handleChange('roomNumber', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Bed Number"
                keyboardType="numeric"
                value={room.bedNumber}
                onChangeText={(value) => handleChange('bedNumber', value)}
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
            <Button title="Add Room" onPress={handleSubmit} />
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
    message: {
        marginBottom: 20,
        textAlign: 'center',
    },
    success: {
        color: 'green',
    },
    error: {
        color: 'red',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default RoomForm;
