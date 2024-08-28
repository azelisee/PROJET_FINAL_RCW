import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStaffById } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const StaffDetail = () => {
    const [staff, setStaff] = useState<any>(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { id }: any = route.params;

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'StaffDetail', ['Administrator', 'Doctor']);
            if (!hasAccess) {
                return;
            }
            fetchStaffDetails();
        })();
    }, [id, navigation]);

    const fetchStaffDetails = () => {
        getStaffById(id).then((response) => {
            setStaff(response.data);
        }).catch(error => {
            console.error('There was an error fetching the staff details!', error);
        });
    };

    if (!staff) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Staff Details</Text>
            <Text style={styles.field}><Text style={styles.label}>Name:</Text> {staff.name}</Text>
            <Text style={styles.field}><Text style={styles.label}>Email:</Text> {staff.email}</Text>
            <Text style={styles.field}><Text style={styles.label}>Phone:</Text> {staff.phone}</Text>
            <Text style={styles.field}><Text style={styles.label}>Role:</Text> {staff.role}</Text>
            <Text style={styles.field}><Text style={styles.label}>Department:</Text> {staff.department}</Text>
            <Text style={styles.field}><Text style={styles.label}>Hospital:</Text> {staff.hospital}</Text>
            <Text style={styles.field}><Text style={styles.label}>Date of Birth:</Text> {new Date(staff.dateOfBirth).toLocaleDateString()}</Text>
            <Button
                title="Edit Staff"
                onPress={() => navigation.navigate('StaffEdit', { id: staff._id })}
                color="#5cb85c"
            />
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
    field: {
        fontSize: 18,
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
});

export default StaffDetail;
