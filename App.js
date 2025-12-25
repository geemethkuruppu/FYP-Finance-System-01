import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { DataProvider } from "./src/context/DataContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
    return (
        <ThemeProvider>
            <DataProvider>
                <View style={styles.container}>
                    <StatusBar style="light" />
                    <NavigationContainer>
                        <AppNavigator />
                    </NavigationContainer>
                </View>
            </DataProvider>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#05070a',
    },
});