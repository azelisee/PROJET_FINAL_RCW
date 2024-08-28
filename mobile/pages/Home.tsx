import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ alignItems: 'center', padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
                    Hospital Management System
                </Text>
                <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
                    Your comprehensive solution to managing hospital resources efficiently and effectively.
                </Text>

                <View style={{ width: '100%', marginBottom: 20 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HospitalsInfos')}
                        style={{ alignItems: 'center', marginBottom: 20 }}
                    >
                        <Image
                            source={require('../assets/images/hospital2.png')}
                            style={{ width: 100, height: 100 }}
                        />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Manage Hospitals</Text>
                        <Text style={{ fontSize: 14 }}>Oversee hospital facilities, staff, and departments.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('DepartmentsInfos')}
                        style={{ alignItems: 'center', marginBottom: 20 }}
                    >
                        <Image
                            source={require('../assets/images/departments3.jpg')}
                            style={{ width: 100, height: 100 }}
                        />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Manage Departments</Text>
                        <Text style={{ fontSize: 14 }}>Coordinate departmental activities, staff, and resources.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('RoomsInfos')}
                        style={{ alignItems: 'center', marginBottom: 20 }}
                    >
                        <Image
                            source={require('../assets/images/room8.jpg')}
                            style={{ width: 100, height: 100 }}
                        />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Manage Rooms</Text>
                        <Text style={{ fontSize: 14 }}>Track room availability, assignments, and conditions.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('DoctorsInfos')}
                        style={{ alignItems: 'center', marginBottom: 20 }}
                    >
                        <Image
                            source={require('../assets/images/doctor3.jpg')}
                            style={{ width: 100, height: 100 }}
                        />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Manage Doctors</Text>
                        <Text style={{ fontSize: 14 }}>Organize doctor schedules, specialties, and profiles.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('NursesInfos')}
                        style={{ alignItems: 'center', marginBottom: 20 }}
                    >
                        <Image
                            source={require('../assets/images/nurse4.jpg')}
                            style={{ width: 100, height: 100 }}
                        />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Manage Nurses</Text>
                        <Text style={{ fontSize: 14 }}>Manage nurse assignments, shifts, and qualifications.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('StaffsInfos')}
                        style={{ alignItems: 'center', marginBottom: 20 }}
                    >
                        <Image
                            source={require('../assets/images/staff1.jpg')}
                            style={{ width: 100, height: 100 }}
                        />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Manage Staff</Text>
                        <Text style={{ fontSize: 14 }}>Manage other medical staff including technicians, admin, and caregivers.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('PatientsInfos')}
                        style={{ alignItems: 'center', marginBottom: 20 }}
                    >
                        <Image
                            source={require('../assets/images/patient1.jpg')}
                            style={{ width: 100, height: 100 }}
                        />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Manage Patients</Text>
                        <Text style={{ fontSize: 14 }}>View and manage patient information, medical records, and more.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('TransfersInfos')}
                        style={{ alignItems: 'center', marginBottom: 20 }}
                    >
                        <Image
                            source={require('../assets/images/transfer4.jpg')}
                            style={{ width: 100, height: 100 }}
                        />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Manage Transfers</Text>
                        <Text style={{ fontSize: 14 }}>Manage patient transfers between hospitals and departments.</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ padding: 20, backgroundColor: '#222', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>Contact Us</Text>
                <Text style={{ color: '#fff', fontSize: 14 }}>Email: <Text style={{ color: '#00f' }}>azoumakokou@teccart.online</Text></Text>
                <Text style={{ color: '#fff', fontSize: 14 }}>Phone: 438-456-7890</Text>
                <Text style={{ color: '#fff', fontSize: 14 }}>For appointments, please send an email to our support.</Text>
                <Text style={{ color: '#fff', fontSize: 14 }}>You will receive a confirmation email once your request is received.</Text>
            </View>
        </ScrollView>
    );
};

export default Home;
