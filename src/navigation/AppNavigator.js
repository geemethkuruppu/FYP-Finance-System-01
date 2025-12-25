import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import TabNavigator from './TabNavigator';

import ChatScreen from '../screens/ChatScreen';
import LinkedDataScreen from '../screens/LinkedDataScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import RecommendationDetailScreen from '../screens/RecommendationDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
            <Stack.Screen name="LinkedData" component={LinkedDataScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="RecommendationDetail" component={RecommendationDetailScreen} />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={{ presentation: 'modal' }}
            />
        </Stack.Navigator>
    );
}
