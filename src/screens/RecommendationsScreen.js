import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

/**
 * RecommendationsScreen (Modern)
 * Displays Active Plans (in progress) and New AI Recommendations.
 */

const ACTIVE_PLANS = [
    {
        id: "p1",
        title: "Subscription Cleanup",
        progress: 0.6, // 60%
        daysLeft: 12,
        status: "In Progress",
        icon: "repeat",
        color: ["#2563EB", "#1D4ED8"],
    },
    {
        id: "p2",
        title: "Emergency Fund Builder",
        progress: 0.25,
        daysLeft: 45,
        status: "On Track",
        icon: "shield-checkmark",
        color: ["#059669", "#047857"],
    },
];

const NEW_RECOMMENDATIONS = [
    {
        id: "r1",
        title: "Stop Overspending on Dining",
        description: "You spent 40% more on dining this month. Let's set a cap for next week.",
        impact: "High Impact",
        difficulty: "Medium",
        icon: "restaurant",
        gradient: ["#F59E0B", "#D97706"],
    },
    {
        id: "r2",
        title: "Optimize Utility Bills",
        description: "Detected a spike in electric bills. A comparison check could save $30/mo.",
        impact: "Medium Impact",
        difficulty: "Easy",
        icon: "flash",
        gradient: ["#8B5CF6", "#7C3AED"],
    },
    {
        id: "r3",
        title: "Invest Surplus Cash",
        description: "You have $1,200 sitting idle. Consider a high-yield savings account.",
        impact: "High Impact",
        difficulty: "Hard",
        icon: "trending-up",
        gradient: ["#EC4899", "#DB2777"],
    },
];

export default function RecommendationsScreen({ navigation }) {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />

            {/* Ambient Background Glows */}
            <View style={[styles.glowTopLeft, { backgroundColor: colors.primary }]} />
            <View style={[styles.glowCenterRight, { backgroundColor: colors.secondary }]} />

            <LinearGradient
                colors={[colors.primary + "CC", colors.background]}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Your Plans</Text>
                    <Text style={styles.headerSubtitle}>AI-driven financial guidance</Text>
                </View>
                <TouchableOpacity style={styles.historyBtn}>
                    <Ionicons name="time-outline" size={22} color="#fff" />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ACTIVE PLANS SECTION */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>ACTIVE PLANS</Text>
                    <Text style={[styles.sectionBadge, { backgroundColor: colors.primary }]}>{ACTIVE_PLANS.length}</Text>
                </View>

                <View style={styles.activePlansList}>
                    {ACTIVE_PLANS.map((plan) => (
                        <TouchableOpacity
                            key={plan.id}
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate("RecommendationDetail", { item: plan })}
                        >
                            <LinearGradient
                                colors={["#1F2937", "#111827"]}
                                style={styles.planCard}
                            >
                                <View style={styles.planHeader}>
                                    <View style={[styles.iconBox, { backgroundColor: plan.color[0] + "20" }]}>
                                        <Ionicons name={plan.icon} size={20} color={plan.color[0]} />
                                    </View>
                                    <View style={styles.daysBadge}>
                                        <Ionicons name="hourglass-outline" size={12} color="#9CA3AF" />
                                        <Text style={styles.daysText}>{plan.daysLeft} days left</Text>
                                    </View>
                                </View>

                                <Text style={styles.planTitle}>{plan.title}</Text>

                                <View style={styles.progressContainer}>
                                    <View style={styles.progressLabelRow}>
                                        <Text style={styles.progressText}>{plan.status}</Text>
                                        <Text style={styles.percentText}>{Math.round(plan.progress * 100)}%</Text>
                                    </View>
                                    <View style={styles.progressBarBg}>
                                        <LinearGradient
                                            colors={plan.color}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={[styles.progressBarFill, { width: `${plan.progress * 100}%` }]}
                                        />
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* NEW RECOMMENDATIONS */}
                <View style={[styles.sectionHeader, { marginTop: 32 }]}>
                    <Text style={styles.sectionTitle}>FOR YOU</Text>
                    <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>NEW</Text>
                    </View>
                </View>

                <View style={styles.recommendationList}>
                    {NEW_RECOMMENDATIONS.map((rec) => (
                        <TouchableOpacity
                            key={rec.id}
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate("RecommendationDetail", { item: rec })}
                        >
                            <LinearGradient
                                colors={["#1F2937", "#111827"]}
                                style={styles.recCard}
                            >
                                <View style={styles.recLeft}>
                                    <LinearGradient
                                        colors={rec.gradient}
                                        style={styles.recIconBig}
                                    >
                                        <Ionicons name={rec.icon} size={24} color="#fff" />
                                    </LinearGradient>
                                    <View style={styles.recContent}>
                                        <Text style={styles.recTitle}>{rec.title}</Text>
                                        <Text style={styles.recDesc} numberOfLines={2}>{rec.description}</Text>

                                        <View style={styles.tagsRow}>
                                            <View style={[styles.tag, { backgroundColor: colors.primary + "26" }]}>
                                                <Text style={[styles.tagText, { color: colors.primary }]}>{rec.impact}</Text>
                                            </View>
                                            <View style={[styles.tag, { backgroundColor: "rgba(255,255,255,0.05)" }]}>
                                                <Text style={[styles.tagText, { color: "#9CA3AF" }]}>{rec.difficulty}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#4B5563" />
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Spacing for Tab Bar */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#05070a" },

    /* Background Glows */
    glowTopLeft: {
        position: 'absolute',
        top: -100,
        left: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: "#2563EB",
        opacity: 0.15,
        transform: [{ scale: 1.5 }],
    },
    glowCenterRight: {
        position: 'absolute',
        top: 300,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: "#8B5CF6", // Purple
        opacity: 0.12,
    },

    header: {
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10,
    },
    headerTitle: { fontSize: 28, fontWeight: "800", color: "#fff" },
    headerSubtitle: { fontSize: 14, color: "#E0E7FF", marginTop: 4 },
    historyBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(255,255,255,0.1)",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },

    scrollContent: { padding: 20 },

    sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    sectionTitle: { fontSize: 12, fontWeight: "800", color: "#9CA3AF", letterSpacing: 1.2, marginRight: 8 },
    sectionBadge: {
        backgroundColor: "#2563EB",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        color: "#fff",
        fontSize: 10,
        fontWeight: "700"
    },
    newBadge: {
        backgroundColor: "#10B981",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    newBadgeText: { color: "#064E3B", fontSize: 10, fontWeight: "800" },

    activePlansList: { gap: 16 },
    planCard: {
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    planHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center"
    },
    daysBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(255,255,255,0.05)", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    daysText: { color: "#9CA3AF", fontSize: 11, fontWeight: "600" },
    planTitle: { fontSize: 18, fontWeight: "700", color: "#fff", marginBottom: 16 },
    progressContainer: { gap: 8 },
    progressLabelRow: { flexDirection: "row", justifyContent: "space-between" },
    progressText: { fontSize: 12, color: "#9CA3AF" },
    percentText: { fontSize: 12, color: "#fff", fontWeight: "700" },
    progressBarBg: { height: 6, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" },
    progressBarFill: { height: "100%", borderRadius: 3 },

    recommendationList: { gap: 12 },
    recCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
    },
    recLeft: { flexDirection: "row", gap: 16, flex: 1 },
    recIconBig: {
        width: 50,
        height: 50,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    recContent: { flex: 1, gap: 4 },
    recTitle: { fontSize: 16, fontWeight: "700", color: "#fff" },
    recDesc: { fontSize: 12, color: "#9CA3AF" },
    tagsRow: { flexDirection: "row", gap: 8, marginTop: 4 },
    tag: { backgroundColor: "rgba(37, 99, 235, 0.15)", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
    tagText: { color: "#60A5FA", fontSize: 10, fontWeight: "600" },
});
