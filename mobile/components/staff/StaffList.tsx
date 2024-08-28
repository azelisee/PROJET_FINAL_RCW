import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStaff, deleteStaff } from '../../services/api';
import { checkAccessAndNavigate } from '../../utils/DecodeToken';

const StaffList = () => {
    const [staffs, setStaffs] = useState<any[]>([]);
    const [message, setMessage] = useState<string>('');
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const hasAccess = await checkAccessAndNavigate(navigation, 'StaffList', ['Administrator']);
            if (!hasAccess) {
                return;
            }

            fetchStaff();
        })();
    }, [navigation]);

    const fetchStaff = () => {
        getStaff()
            .then((response) => {
                if (response.data) {
                    setStaffs(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            })
            .catch((error) => {
                console.error('There was an error fetching the staff!', error);
            });
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this staff member?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: () => {
                        deleteStaff(id)
                            .then((response) => {
                                setMessage('Staff member deleted successfully');
                                setTimeout(() => {
                                    setMessage('');
                                }, 3000);
                                fetchStaff();
                            })
                            .catch((error) => {
                                console.error('Error deleting:', error);
                                setMessage('Error deleting staff member');
                            });
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.staffCard}
            onPress={() => navigation.navigate('StaffDetail', { id: item._id })}
        >
            <Text style={styles.staffName}>{item.name}</Text>
            <Text>Role: {item.role}</Text>
            <Button
                title="Delete"
                onPress={() => handleDelete(item._id)}
                color="#d9534f"
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Staff Members</Text>
            {message ? <Text style={styles.message}>{message}</Text> : null}
            <Button
                title="Add Staff"
                onPress={() => navigation.navigate('StaffForm')}
                color="#5cb85c"
            />
            {staffs.length > 0 ? (
                <FlatList
                    data={staffs}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id.toString()}
                />
            ) : (
                <Text>No staff members found</Text>
            )}
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
    staffCard: {
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 5,
    },
    staffName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    message: {
        marginVertical: 10,
        color: 'red',
    },
});

export default StaffList;
