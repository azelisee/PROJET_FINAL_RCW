import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getHospitalById } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const HospitalDetail = () => {
    const [hospital, setHospital] = useState<any>(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { id }: any = route.params;

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'HospitalDetail', ['Administrator', 'Technician', 'Caregiver', 'Other', 'Doctor', 'Nurse']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }
            getHospitalById(id).then((response) => {
                setHospital(response.data);
            }).catch(error => {
                console.error('There was an error fetching the hospital details!', error);
                Alert.alert('Error', 'There was an error fetching the hospital details.');
            });
        })();
    }, [id, navigation]);

    if (!hospital) return <Text>Loading...</Text>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Hospital Details</Text>
            <View style={styles.detailField}><Text style={styles.label}><strong>Name:</strong> {hospital.name}</Text></View>
            <View style={styles.detailField}><Text style={styles.label}><strong>Address:</strong> {hospital.address}</Text></View>
            <View style={styles.detailField}><Text style={styles.label}><strong>Website:</strong>
                <Text style={styles.link} onPress={() => Linking.openURL(hospital.website)}>
                    {hospital.website}
                </Text>
            </View>
            <View style={styles.detailField}><Text style={styles.label}><strong>Email:</strong> {hospital.email}</Text></View>
            <View style={styles.detailField}><Text style={styles.label}><strong>Phone:</strong> {hospital.phone}</Text></View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('HospitalEdit', { id: hospital._id })}
            >
                <Text style={styles.buttonText}>Edit Hospital</Text>
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
    detailField: {
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
    },
    link: {
        color: '#1E90FF',
        textDecorationLine: 'underline',
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
});

export default HospitalDetail;
