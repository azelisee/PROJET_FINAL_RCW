import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AuthContext = () => {
    const [role, setRole] = useState('Technician');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleRoleChange = (itemValue: string) => {
        setRole(itemValue);
    };

    const handleLogin = async () => {
        try {
            let endpoint;
            if (role === 'Doctor') {
                endpoint = 'doctor';
            } else if (role === 'Nurse') {
                endpoint = 'nurse';
            } else if (role === 'Administrator' || role === 'Technician' || role === 'Caregiver' || role === 'Other') {
                endpoint = 'staff';
            }

            const response = await axios.post(`http://localhost:7000/auth/login/${endpoint}`, {
                role: endpoint === 'staff' ? role : undefined,
                title: endpoint !== 'staff' ? role : undefined,
                email,
                password,
            });

            if (response.data.token) {
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('role', response.data.role || response.data.title);
                navigation.navigate('Home');
            console.log('Role:', role);
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Error', 'Invalid credentials. Please try again.');
        }
    };

    return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>Login</Text>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ marginBottom: 10 }}>Role or Title:</Text>
                <Picker
                    selectedValue={role}
                    onValueChange={(itemValue) => handleRoleChange(itemValue)}
                >
                    <Picker.Item label="Technician" value="Technician" />
                    <Picker.Item label="Administrator" value="Administrator" />
                    <Picker.Item label="Caregiver" value="Caregiver" />
                    <Picker.Item label="Other" value="Other" />
                    <Picker.Item label="Doctor" value="Doctor" />
                    <Picker.Item label="Nurse" value="Nurse" />
                </Picker>
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ marginBottom: 10 }}>Email:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ marginBottom: 10 }}>Password:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry
                />
            </View>
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default AuthContext;
