import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function ModernTabBar({ state, descriptors, navigation }) {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    const focusedOptions = descriptors[state.routes[state.index].key].options;
    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    const onChatPress = () => {
        navigation.navigate("Chat");
    };

    return (
        <View style={styles.container}>
            <View style={[styles.island, { height: 70 + insets.bottom, paddingBottom: insets.bottom }]}>
                {/* Left Side: Home (0) & Insights (1) */}
                <View style={styles.sideGroup}>
                    {state.routes.slice(0, 2).map((route, index) => {
                        const { options } = descriptors[route.key];
                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: "tabPress",
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        let iconName;
                        if (route.name === "Home") iconName = isFocused ? "home" : "home-outline";
                        else if (route.name === "Insights") iconName = isFocused ? "analytics" : "analytics-outline";

                        return (
                            <TouchableOpacity
                                key={route.key}
                                onPress={onPress}
                                style={styles.tabButton}
                                activeOpacity={0.7}
                            >
                                <Ionicons
                                    name={iconName}
                                    size={26} // Increased from 22
                                    color={isFocused ? colors.primary : "#6B7280"}
                                />
                                <Text style={[styles.tabLabel, isFocused && { color: colors.primary, fontWeight: "700" }]}>
                                    {route.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Center "Spacer" for the floating button */}
                <View style={styles.centerSpacer} />

                {/* Right Side: Recommendations (2) & Profile (3) */}
                <View style={styles.sideGroup}>
                    {state.routes.slice(2, 4).map((route, index) => {
                        // The actual index in state.routes is index + 2
                        const realIndex = index + 2;
                        const isFocused = state.index === realIndex;
                        const { options } = descriptors[route.key];

                        const onPress = () => {
                            const event = navigation.emit({
                                type: "tabPress",
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        let iconName;
                        if (route.name === "Recommendations") iconName = isFocused ? "list" : "list-outline";
                        else if (route.name === "Profile") iconName = isFocused ? "person" : "person-outline";

                        return (
                            <TouchableOpacity
                                key={route.key}
                                onPress={onPress}
                                style={styles.tabButton}
                                activeOpacity={0.7}
                            >
                                <Ionicons
                                    name={iconName}
                                    size={26} // Increased from 22
                                    color={isFocused ? colors.primary : "#6B7280"}
                                />
                                <Text style={[styles.tabLabel, isFocused && { color: colors.primary, fontWeight: "700" }]}>
                                    {route.name === "Recommendations" ? "Plans" : route.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Floating Center Button */}
                <TouchableOpacity
                    style={styles.centerButtonContainer}
                    onPress={onChatPress}
                    activeOpacity={0.9}
                >
                    <View style={styles.centerButtonBorder}>
                        <LinearGradient
                            colors={[colors.secondary, colors.primary]}
                            style={styles.centerButton}
                        >
                            <Ionicons name="chatbubble-ellipses" size={26} color="#fff" />
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        zIndex: 50,
    },
    island: {
        flexDirection: "row",
        backgroundColor: "#111827",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        alignItems: "flex-start",
        paddingTop: 12,
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        borderTopWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
    },
    sideGroup: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: 50, // Height of the clickable area within the bar
    },
    centerSpacer: {
        width: 70,
    },
    tabButton: {
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
    },
    tabLabel: {
        fontSize: 12, // Increased from 10
        color: "#6B7280",
        fontWeight: "500",
    },
    tabLabelFocused: {
        color: "#3B82F6",
        fontWeight: "700",
    },
    centerButtonContainer: {
        position: "absolute",
        top: -30,
        left: "50%",
        marginLeft: -35,
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 60,
    },
    centerButtonBorder: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#05070a", // Match main screen background to look like a cutout
        justifyContent: "center",
        alignItems: "center",
        padding: 6, // Thickness of the "cutout" gap
    },
    centerButton: {
        width: "100%",
        height: "100%",
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#8B5CF6",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        elevation: 12,
    },
});
