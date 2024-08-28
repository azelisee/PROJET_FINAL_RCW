import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const checkAccess = async () => {
            const token = await AsyncStorage.getItem('token');
            const userRole = await AsyncStorage.getItem('role');
            const userTitle = await AsyncStorage.getItem('title');

            if (!token) {
                navigation.navigate('Login');
                return;
            }

            if (roles && !(roles.includes(userRole || '') || roles.includes(userTitle || ''))) {
                navigation.navigate('Unauthorized');
                return;
            }

            setLoading(false);
        };

        checkAccess();
    }, [navigation, roles]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
