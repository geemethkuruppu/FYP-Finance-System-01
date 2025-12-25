import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ProfileScreen({ navigation }) {
    const { colors } = useTheme();
    const [isDarkMode, setIsDarkMode] = React.useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

    const menuItems = [
        {
            title: "Personal Information",
            icon: "person",
            screen: "PersonalInfo",
            color: colors.primary,
        },
        {
            title: "Linked Accounts",
            icon: "card",
            screen: "LinkedData",
            color: colors.secondary,
        },
        {
            title: "Data & Privacy",
            icon: "shield-checkmark",
            screen: "Privacy", // Placeholder if not created
            color: colors.success || "#10B981",
        },
        {
            title: "Help & Support",
            icon: "help-buoy",
            screen: "Support",
            color: colors.warning || "#F59E0B",
        },
        {
            title: "Appearance / Settings",
            icon: "color-palette",
            screen: "Settings",
            color: colors.danger || "#EF4444", // Using danger/red for settings to make it distinct or use another
        },
    ];

    const handleLogout = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Log Out",
                    style: "destructive",
                    onPress: () => {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "Welcome" }],
                            })
                        );
                    }
                }
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />

            {/* Ambient Background Glows */}
            <View style={[styles.glowTopRight, { backgroundColor: colors.primary }]} />
            <View style={styles.glowBottomLeft} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                {/* 1. Header with Avatar */}
                <LinearGradient
                    colors={[colors.primary + "E6", colors.card + "F2"]} // 4. Update avatarGradient
                    style={styles.header}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: "https://i.pravatar.cc/300" }} // Placeholder
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={[styles.editAvatarBtn, { backgroundColor: colors.primary }]}>
                            <Ionicons name="camera" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>Alex Johnson</Text>
                    <Text style={styles.userEmail}>alex.johnson@example.com</Text>

                    <View style={styles.statRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>Pro</Text>
                            <Text style={styles.statLabel}>Plan</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>2.5y</Text>
                            <Text style={styles.statLabel}>Member</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>98%</Text>
                            <Text style={styles.statLabel}>Score</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* 2. Menu Section */}
                <View style={styles.menuContainer}>
                    <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>ACCOUNT SETTINGS</Text>

                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate(item.screen)} // Simplified navigation
                        >
                            <View style={[styles.iconBox, { backgroundColor: item.color + "15" }]}>
                                <Ionicons name={item.icon} size={22} color={item.color} />
                            </View>
                            <Text style={[styles.menuTitle, { color: colors.text }]}>{item.title}</Text>
                            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                    ))}

                    <Text style={styles.sectionHeader}>PREFERENCES</Text>

                    <View style={styles.menuItem}>
                        <View style={[styles.iconBox, { backgroundColor: "rgba(236, 72, 153, 0.1)" }]}>
                            <Ionicons name="notifications" size={22} color="#EC4899" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.menuTitle}>Notifications</Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: "#374151", true: "#3B82F6" }}
                            thumbColor={"#fff"}
                            ios_backgroundColor="#374151"
                        />
                    </View>
                </View>

                {/* 3. Logout Button */}
                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={20} color="#EF4444" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                {/* Bottom Spacing */}
                <View style={{ height: 120 }} />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#05070a" },

    /* Ambience */
    glowTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: "#2563EB",
        opacity: 0.1,
        transform: [{ translateX: 100 }, { translateY: -100 }],
    },
    glowBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: "#8B5CF6",
        opacity: 0.08,
        transform: [{ translateX: -50 }, { translateY: 50 }],
    },

    scrollContent: {
        paddingBottom: 100,
    },

    header: {
        paddingTop: 80,
        paddingBottom: 40,
        paddingHorizontal: 20,
        alignItems: "center",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginBottom: 20,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 4,
        borderColor: "rgba(255,255,255,0.1)",
    },
    editAvatarBtn: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#2563EB",
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#111827",
    },
    userName: { fontSize: 24, fontWeight: "800", color: "#fff", marginBottom: 4 },
    userEmail: { fontSize: 14, color: "#9CA3AF", marginBottom: 24 },

    statRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 24,
        width: "100%",
        justifyContent: "space-between",
    },
    statItem: { alignItems: "center", flex: 1 },
    statValue: { fontSize: 16, fontWeight: "800", color: "#fff" },
    statLabel: { fontSize: 11, color: "#9CA3AF", marginTop: 2, textTransform: "uppercase" },
    divider: { width: 1, height: 24, backgroundColor: "rgba(255,255,255,0.2)" },

    menuContainer: { paddingHorizontal: 20 },
    sectionHeader: {
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 1.2,
        marginBottom: 12,
        marginTop: 24,
        marginLeft: 4
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#111827",
        padding: 16,
        borderRadius: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
        gap: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    menuTitle: { flex: 1, fontSize: 16, fontWeight: "600", color: "#fff" },

    logoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 32,
        marginHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(239, 68, 68, 0.2)",
        backgroundColor: "rgba(239, 68, 68, 0.05)",
        gap: 8,
    },
    logoutText: { color: "#EF4444", fontSize: 16, fontWeight: "700" },
});
