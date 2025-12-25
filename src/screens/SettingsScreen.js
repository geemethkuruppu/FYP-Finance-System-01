import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const THEME_PRESETS = [
    { name: "Ocean Blue", primary: "#2563EB", secondary: "#8B5CF6" },
    { name: "Emerald City", primary: "#10B981", secondary: "#3B82F6" },
    { name: "Sunset Vibes", primary: "#F97316", secondary: "#EC4899" },
    { name: "Royal Gold", primary: "#F59E0B", secondary: "#7C3AED" },
    { name: "Neon Cyber", primary: "#06B6D4", secondary: "#D946EF" },
    { name: "Rose Garden", primary: "#E11D48", secondary: "#F43F5E" },
];

export default function SettingsScreen({ navigation }) {
    const { colors, updateTheme, resetTheme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Appearance</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>CHOOSE YOUR THEME</Text>
                    <Text style={styles.sectionSubtitle}>Select a color palette for the app</Text>

                    <View style={styles.grid}>
                        {THEME_PRESETS.map((theme, index) => {
                            const isActive = colors.primary === theme.primary;
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.themeCard, isActive && { borderColor: theme.primary, borderWidth: 2 }]}
                                    onPress={() => updateTheme(theme.primary, theme.secondary)}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={[theme.primary, theme.secondary]}
                                        style={styles.gradientPreview}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        {isActive && <Ionicons name="checkmark-circle" size={24} color="#fff" />}
                                    </LinearGradient>
                                    <Text style={[styles.themeName, isActive && { color: theme.primary }]}>
                                        {theme.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Preview Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>PREVIEW</Text>
                    <View style={styles.previewCard}>
                        <LinearGradient
                            colors={[colors.primary, colors.secondary]}
                            style={styles.previewButton}
                        >
                            <Text style={styles.previewBtnText}>Primary Gradient</Text>
                        </LinearGradient>

                        <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
                            <View style={[styles.iconBox, { backgroundColor: colors.primary + "20" }]}>
                                <Ionicons name="home" size={20} color={colors.primary} />
                            </View>
                            <View style={[styles.iconBox, { backgroundColor: colors.secondary + "20" }]}>
                                <Ionicons name="sparkles" size={20} color={colors.secondary} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Reset Button */}
                <TouchableOpacity style={styles.resetBtn} onPress={resetTheme}>
                    <Text style={styles.resetText}>Reset to Default</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: { fontSize: 20, fontWeight: "700", color: "#fff" },

    scrollContent: { padding: 20 },

    section: { marginBottom: 32 },
    sectionTitle: { color: "#6B7280", fontSize: 12, fontWeight: "800", letterSpacing: 1.2, marginBottom: 8 },
    sectionSubtitle: { color: "#9CA3AF", fontSize: 14, marginBottom: 20 },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
    themeCard: {
        width: "47%", // roughly half
        backgroundColor: "#111827",
        borderRadius: 16,
        padding: 4,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
    },
    gradientPreview: {
        width: "100%",
        height: 80,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    themeName: { color: "#D1D5DB", fontSize: 14, fontWeight: "600", marginBottom: 8 },

    previewCard: {
        backgroundColor: "#111827",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
    },
    previewButton: {
        width: "100%",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },
    previewBtnText: { color: "#fff", fontWeight: "700" },
    iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },

    resetBtn: { alignItems: "center", marginTop: 20 },
    resetText: { color: "#6B7280", textDecorationLine: "underline" },
});
