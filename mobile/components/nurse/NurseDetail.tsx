import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getNurseById } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const NurseDetail = () => {
    const [nurse, setNurse] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'NurseDetail', ['Administrator', 'Doctor', 'Nurse']);
            if (!hasAccess) {
                navigation.navigate('Unauthorized');
                return;
            }

            try {
                const response = await getNurseById(id);
                setNurse(response.data);
            } catch (error) {
                console.error('Error fetching nurse details:', error);
            }
        })();
    }, [id, navigation]);

    if (!nurse) return <View style={styles.loading}><Text>Loading...</Text></View>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Nurse Details</Text>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>Name:</Text> {nurse.name}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>Title:</Text> {nurse.title}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>Email:</Text> {nurse.email}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>Gender:</Text> {nurse.gender}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>Phone:</Text> {nurse.phone}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>Department:</Text> {nurse.department}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>Hospital:</Text> {nurse.hospital}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>Date of Birth:</Text> {new Date(nurse.dateOfBirth).toLocaleDateString()}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>Qualifications:</Text> {nurse.qualifications.join(', ')}</Text>
            </View>
            <View style={styles.detailField}>
                <Text><Text style={styles.label}>Seniority:</Text> {nurse.seniority} years</Text>
            </View>
            <Button title="Edit Nurse" onPress={() => navigation.navigate('NurseEdit', { id: nurse._id })} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detailField: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
});

export default NurseDetail;
