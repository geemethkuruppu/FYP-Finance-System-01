import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import InsightsScreen from "../screens/InsightsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RecommendationsScreen from "../screens/RecommendationsScreen";
import ModernTabBar from "./ModernTabBar";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                tabBar={(props) => <ModernTabBar {...props} />}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Insights" component={InsightsScreen} />
                <Tab.Screen name="Recommendations" component={RecommendationsScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>

        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "#111827",
        borderTopColor: "rgba(255,255,255,0.05)",
        height: 60,
        paddingBottom: 5,
        paddingTop: 5,
    },
});
