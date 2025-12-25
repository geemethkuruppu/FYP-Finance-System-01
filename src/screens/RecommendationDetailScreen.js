import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function RecommendationDetailScreen({ route, navigation }) {
    const { colors } = useTheme();
    const { plan, recommendation } = route.params || {};
    const item = plan || recommendation || { title: "Unknown Plan" };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />

            {/* Header Image/Gradient */}
            <LinearGradient
                colors={[colors.primary, colors.background]}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.iconCircle}>
                    <Ionicons name={plan ? "clipboard" : "bulb"} size={40} color={colors.primary} />
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>{item.title}</Text>

                {plan ? (
                    <Text style={styles.status}>Status: <Text style={{ color: colors.primary }}>{plan.status}</Text></Text>
                ) : (
                    <Text style={styles.status}>Expected Impact: <Text style={{ color: "#10B981" }}>{item.impact}</Text></Text>
                )}

                {/* 1. Interpretability / Why */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>WHY THIS RECOMMENDATION?</Text>
                    <Text style={styles.bodyText}>
                        This plan was suggested because we detected significant <Text style={{ fontWeight: '700', color: '#fff' }}>Subscription Creep</Text> in your spending history over the last 3 months.
                    </Text>
                    <Text style={[styles.bodyText, { marginTop: 12 }]}>
                        Data shows a 18% increase month-over-month in recurring charges.
                    </Text>
                </View>

                {/* 2. The Plan */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>PLAN STRUCTURE</Text>
                    <View style={styles.stepRow}>
                        <View style={[styles.stepNum, { backgroundColor: colors.primary }]}><Text style={styles.stepText}>1</Text></View>
                        <Text style={styles.stepDesc}>Review detected recurring charges.</Text>
                    </View>
                    <View style={styles.stepRow}>
                        <View style={[styles.stepNum, { backgroundColor: colors.primary }]}><Text style={styles.stepText}>2</Text></View>
                        <Text style={styles.stepDesc}>Identify 1 unused service to cancel.</Text>
                    </View>
                    <View style={styles.stepRow}>
                        <View style={[styles.stepNum, { backgroundColor: colors.primary }]}><Text style={styles.stepText}>3</Text></View>
                        <Text style={styles.stepDesc}>Confirm cancellation or negotiate rate.</Text>
                    </View>
                </View>

                {/* 3. Actions */}
                <View style={styles.actionRow}>
                    <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]} onPress={() => navigation.goBack()}>
                        <Text style={styles.primaryBtnText}>{plan ? "Update Progress" : "Accept Plan"}</Text>
                    </TouchableOpacity>

                    {!plan && (
                        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
                            <Text style={styles.secondaryBtnText}>Snooze</Text>
                        </TouchableOpacity>
                    )}
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0A0F1F" },
    header: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    backBtn: {
        position: 'absolute',
        top: 60,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    iconCircle: {
        marginTop: 20,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: "#fff",
        textAlign: "center",
        marginBottom: 8,
    },
    status: {
        fontSize: 16,
        color: "#9CA3AF",
        textAlign: "center",
        marginBottom: 32,
        fontWeight: "600",
    },
    section: {
        marginBottom: 30,
        backgroundColor: "#111827",
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
    },
    sectionHeader: {
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 1.5,
        marginBottom: 16,
    },
    bodyText: {
        color: "#D1D5DB",
        fontSize: 15,
        lineHeight: 24,
    },
    stepRow: { flexDirection: "row", marginBottom: 16, alignItems: "center", gap: 16 },
    stepNum: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
    },
    stepText: { color: "#fff", fontWeight: "700", fontSize: 13 },
    stepDesc: { color: "#E5E7EB", fontSize: 15, flex: 1 },

    actionRow: { gap: 12 },
    primaryBtn: {
        backgroundColor: "#2563EB",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
    },
    primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
    secondaryBtn: {
        backgroundColor: "rgba(255,255,255,0.05)",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    secondaryBtnText: { color: "#E5E7EB", fontSize: 16, fontWeight: "700" },
});
