import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

import InsightAnomalyCard from "../components/insights/InsightAnomalyCard";
import InsightBaselineCard from "../components/insights/InsightBaselineCard";
import InsightConfidenceCard from "../components/insights/InsightConfidenceCard";
import InsightDominanceCard from "../components/insights/InsightDominanceCard";
import InsightPatternCard from "../components/insights/InsightPatternCard";
import InsightTransparencyCard from "../components/insights/InsightTransparencyCard";

/* ---------------- DUMMY DATA ---------------- */
const DATA = {
    confidence: {
        totalTransactions: 842,
        months: 6,
        confidenceLevel: "HIGH",
    },
    baseline: [
        { category: "Food & Drink", normal: "$220/mo", variance: "±15%" },
        { category: "Transportation", normal: "$90/mo", variance: "±10%" },
        { category: "Utilities", normal: "$130/mo", variance: "Stable" },
        { category: "Entertainment", normal: "$75/mo", variance: "±30%" },
    ],
    patterns: [
        {
            id: 1,
            name: "Subscription Creep",
            severity: "Medium",
            timeWindow: "Observed over last 3 months",
            evidence: [
                "Subscription spending increased by 18%",
                "Services involved: Netflix, Spotify, Amazon Prime",
            ],
        },
        {
            id: 2,
            name: "Overspending Risk",
            severity: "High",
            timeWindow: "Detected consistently for 2 months",
            evidence: [
                "Average monthly expenses exceed income by 12%",
            ],
        },
    ],
    anomaly: {
        merchant: "Starbucks",
        category: "Food & Drink",
        amount: 150,
        normal: 45,
        deviationRatio: 3.3,
    },
    dominance: {
        category: "Food & Drink",
        percentage: 40,
        healthyLimit: 30,
        observationPeriod: "Observed in last month",
        why: "High concentration may reduce budget flexibility and increase risk during income changes.",
    },
};

export default function InsightsScreen() {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />

            {/* Background Ambience */}
            <View style={[styles.ambientGlowTop, { backgroundColor: colors.primary }]} />
            <View style={[styles.ambientGlowRight, { backgroundColor: colors.secondary }]} />
            <View style={styles.ambientGlowBottomLeft} />

            {/* Header */}
            <LinearGradient
                colors={[colors.primary + "CC", colors.background]}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View>
                    <Text style={styles.headerTitle}>AI Insights</Text>
                    <Text style={styles.headerSubtitle}>Deep dive into your financial dna</Text>
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <Ionicons name="filter" size={20} color="#fff" />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >

                {/* 2. Confidence & Data */}
                <InsightConfidenceCard {...DATA.confidence} />

                {/* 3. Normal Behavior Baseline */}
                <InsightBaselineCard data={DATA.baseline} />

                {/* 4. Detected Patterns */}
                <Text style={styles.sectionHeader}>DETECTED BEHAVIORAL PATTERNS</Text>
                {DATA.patterns.map(p => (
                    <InsightPatternCard key={p.id} pattern={p} />
                ))}

                {/* 5. Anomaly Detection */}
                <Text style={styles.sectionHeader}>ANOMALY DETECTION</Text>
                <InsightAnomalyCard transaction={DATA.anomaly} />

                {/* 6. Category Dominance */}
                <Text style={styles.sectionHeader}>CATEGORY DOMINANCE</Text>
                <InsightDominanceCard data={DATA.dominance} />

                {/* 7. Transparency */}
                <InsightTransparencyCard />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#05070a",
    },
    scrollContent: {
        paddingTop: 80,
        paddingHorizontal: 20,
        paddingBottom: 150, // Extra space at bottom
    },
    ambientGlowTop: {
        position: 'absolute',
        top: -100,
        left: -50,
        width: 600,
        height: 600,
        borderRadius: 300,
        backgroundColor: "#2D9CDB",
        opacity: 0.15,
        transform: [{ scaleX: 1.2 }],
    },
    ambientGlowRight: {
        position: 'absolute',
        top: 200,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: "#8B5CF6", // Purple
        opacity: 0.12,
        transform: [{ scaleX: 1.2 }],
    },
    ambientGlowBottomLeft: {
        position: 'absolute',
        bottom: -100,
        left: -100,
        width: 500,
        height: 500,
        borderRadius: 250,
        backgroundColor: "#10B981", // Emerald
        opacity: 0.08,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 24, // reduced from 30 to match Recs
        paddingHorizontal: 20,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10,
    },
    headerTitle: { fontSize: 28, fontWeight: "800", color: "#fff" },
    headerSubtitle: { fontSize: 13, color: "#E0E7FF", marginTop: 4, textTransform: "uppercase", letterSpacing: 1 },

    filterBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: "800",
        color: "#fff",
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    subtitle: {
        color: "#9CA3AF",
        fontSize: 15,
        lineHeight: 22,
    },
    scrollContent: {
        paddingTop: 24, // Add padding top since header is part of flow but visually distinct, actually Recs used padding:20
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    sectionHeader: {
        color: "#9CA3AF",
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 1.5,
        marginBottom: 16,
        marginTop: 32,
        textTransform: "uppercase",
    },
});
