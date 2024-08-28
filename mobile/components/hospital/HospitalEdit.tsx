import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getHospitalById, updateHospital } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const HospitalEdit = () => {
    const [hospital, setHospital] = useState({
        name: '',
        address: '',
        website: '',
        email: '',
        phone: '',
        departments: []
    });
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const { id }: any = route.params;

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'HospitalEdit', ['Administrator', 'Doctor']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }

            getHospitalById(id).then((response) => {
                setHospital(response.data);
            }).catch(error => {
                setError('There was an error fetching the hospital details!');
                console.error('There was an error fetching the hospital details!', error);
            });
        })();
    }, [id, navigation]);

    const handleChange = (name: string, value: string) => {
        setHospital({ ...hospital, [name]: value });
    };

    const handleSubmit = () => {
        updateHospital(id, hospital).then(() => {
            navigation.navigate('HospitalDetail', { id });
        }).catch(error => {
            setError('There was an error updating the hospital!');
            console.error('There was an error updating the hospital!', error);
            Alert.alert('Error', 'There was an error updating the hospital!');
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Edit Hospital</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={hospital.name}
                    onChangeText={(value) => handleChange('name', value)}
                    required
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={hospital.address}
                    onChangeText={(value) => handleChange('address', value)}
                    required
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Website"
                    value={hospital.website}
                    onChangeText={(value) => handleChange('website', value)}
                    required
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={hospital.email}
                    onChangeText={(value) => handleChange('email', value)}
                    required
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={hospital.phone}
                    onChangeText={(value) => handleChange('phone', value)}
                    required
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 15,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default HospitalEdit;
