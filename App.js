import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { ThemeProvider } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
    return (
        <ThemeProvider>
            <View style={styles.container}>
                <StatusBar style="light" />
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </View>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#05070a',
    },
});
