import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ActivePlanCard from "../components/ActivePlanCard";
import BehavioralSignalCard from "../components/BehavioralSignalCard";
import StatCard from "../components/StatCard";
import { useTheme } from "../context/ThemeContext"; // Import hook

/**
 * MVP HOME GOAL:
 * 1) "Upload CSV" entry point
 * 2) show quick summary + last analysis status
 * 3) show AI insights preview (subscription creep, overspending, mental accounting, anomalies)
 *
 * Later: replace this dummy data with backend response
 */
const DUMMY = {
    user: { name: "Alex Johnson" },
    lastUpdated: "Dec 15, 2025",
    summary: {
        totalBalance: 12450.32,
        monthlyIncome: 12234.78,
        monthlyExpense: 20453.24,
        subscriptionCount: 20,
        anomalyCount: 6, // e.g., transactions where DeviationRatio > 2.0
    },
    topCategories: [
        { name: "Food & Drink", pct: 42 },
        { name: "Rent", pct: 25 },
        { name: "Utilities", pct: 13 },
        { name: "Shopping", pct: 10 },
    ],
    insights: [
        {
            key: "subscription",
            title: "Subscription Creep",
            body: "Recurring merchants detected across multiple months. Review subscriptions and cancel unused ones.",
            icon: "repeat",
            tone: "warn",
        },
        {
            key: "overspending",
            title: "Overspending Risk",
            body: "Monthly expense is higher than monthly income. Suggest budget cap + category limits.",
            icon: "alert-circle",
            tone: "danger",
        },
        {
            title: "Mental Accounting",
            body: "High share in one category. Consider spreading spending or adding a strict limit for that category.",
            icon: "pie-chart",
            tone: "info",
        },
    ],
    behavioralSignals: [
        { id: 1, text: "Subscription creep detected", type: "negative", icon: "repeat", tone: "warn" },
        { id: 2, text: "Overspending risk this month", type: "negative", icon: "alert-circle", tone: "danger" },
        { id: 3, text: "No anomalies detected", type: "positive", icon: "shield-checkmark", tone: "success" },
    ],
    activePlan: {
        title: "Subscription reduction plan",
        status: "Week 2/4",
        progress: 0.5,
    },
};

export default function HomeScreen({ navigation }) {
    const { colors } = useTheme(); // Use hook
    const s = DUMMY.summary;

    const overspending = useMemo(() => s.monthlyExpense > s.monthlyIncome, [s]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Background Ambience */}
            <View style={[styles.ambientGlowTop, { backgroundColor: colors.primary }]} />
            <View style={[styles.ambientGlowRight, { backgroundColor: colors.secondary }]} />
            <View style={styles.ambientGlowBottomLeft} />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <LinearGradient
                    colors={[colors.primary + "E6", colors.background]}
                    style={styles.header}
                >
                    <View style={styles.headerTopRow}>
                        <View>
                            <Text style={styles.welcomeSmall}>Welcome back</Text>
                            <Text style={styles.welcomeName}>{DUMMY.user.name}</Text>
                            <Text style={styles.lastUpdated}>Last analysis: {DUMMY.lastUpdated}</Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.notifBtn, { backgroundColor: colors.primary + "20", borderColor: colors.primary + "40" }]}
                            activeOpacity={0.85}
                            onPress={() => navigation.navigate("Notifications")}
                        >
                            <Ionicons name="notifications" size={20} color={colors.primary} />
                        </TouchableOpacity>
                    </View>

                    {/* Balance */}
                    <View style={{ marginTop: 14 }}>
                        <Text style={styles.balanceLabel}>Total Balance</Text>
                        <Text style={styles.balanceValue}>
                            ${s.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Text>

                        <View style={styles.statusRow}>
                            <Ionicons
                                name={overspending ? "trending-down" : "trending-up"}
                                size={16}
                                color={overspending ? "#F87171" : "#34D399"}
                            />
                            <Text style={[styles.statusText, { color: overspending ? "#F87171" : "#34D399" }]}>
                                {overspending ? "Expense > Income this month" : "Healthy trend this month"}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Quick Stats */}
                <Text style={styles.sectionTitle}>QUICK SUMMARY</Text>
                <View style={styles.statGrid}>
                    <StatCard
                        label="Monthly Income"
                        value={`$${s.monthlyIncome.toFixed(2)}`}
                        icon="cash-outline"
                        iconColor="#34D399"
                    />
                    <StatCard
                        label="Monthly Expense"
                        value={`$${s.monthlyExpense.toFixed(2)}`}
                        icon="card-outline"
                        iconColor="#F87171"
                    />
                    <StatCard
                        label="Subscriptions"
                        value={`${s.subscriptionCount}`}
                        icon="repeat-outline"
                        iconColor="#FACC15"
                    />
                    <StatCard
                        label="Anomalies"
                        value={`${s.anomalyCount}`}
                        icon="warning-outline"
                        iconColor="#60A5FA"
                    />
                </View>

                {/* Top Behavioral Signals */}
                <Text style={styles.sectionTitle}>TOP BEHAVIORAL SIGNALS</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.signalScroll}
                >
                    {DUMMY.behavioralSignals.map((item) => (
                        <BehavioralSignalCard
                            key={item.id}
                            item={item}
                            onPress={() => navigation.navigate("Insights")}
                        />
                    ))}
                </ScrollView>

                {/* Current Recommendation Status */}
                <Text style={styles.sectionTitle}>ACTION PLAN</Text>
                <ActivePlanCard
                    plan={DUMMY.activePlan}
                    onPress={() => navigation.navigate("Insights")}
                />

                {/* Categories */}
                <View style={styles.rowBetween}>
                    <Text style={styles.sectionTitle}>TOP CATEGORIES</Text>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate("Categories")}
                    >
                    </TouchableOpacity>
                </View>

                <View style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    {DUMMY.topCategories.map((c) => (
                        <View key={c.name} style={styles.categoryRow}>
                            <Text style={styles.categoryName}>{c.name}</Text>
                            <View style={styles.categoryRight}>
                                <Text style={styles.categoryPct}>{c.pct}%</Text>
                                <View style={styles.barBg}>
                                    <View style={[styles.barFill, { width: `${c.pct}%`, backgroundColor: colors.primary }]} />
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Spacing at bottom */}
                {/* Spacing at bottom */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#05070a" },
    scrollContent: { paddingBottom: 40 },

    ambientGlowTop: {
        position: 'absolute',
        top: -100,
        left: -50,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: "#2D9CDB",
        opacity: 0.15,
        transform: [{ scaleX: 1.2 }],
    },
    ambientGlowRight: {
        position: 'absolute',
        top: 250,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: "#8B5CF6", // Purple
        opacity: 0.12,
    },
    ambientGlowBottomLeft: {
        position: 'absolute',
        bottom: -50,
        left: -100,
        width: 500,
        height: 500,
        borderRadius: 250,
        backgroundColor: "#10B981", // Emerald
        opacity: 0.08,
    },

    header: {
        paddingTop: 64,
        paddingBottom: 18,
        paddingHorizontal: 18,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    headerTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    welcomeSmall: { color: "#A5B4FC", fontSize: 13, fontWeight: "600" },
    welcomeName: { color: "#fff", fontSize: 24, fontWeight: "800", marginTop: 4 },
    lastUpdated: { color: "#6B7280", fontSize: 12, marginTop: 6 },

    notifBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(45,156,219,0.16)",
        borderWidth: 1,
        borderColor: "rgba(45,156,219,0.35)",
    },

    balanceLabel: { color: "#9CA3AF", fontSize: 13, marginTop: 6 },
    balanceValue: { color: "#fff", fontSize: 38, fontWeight: "900", marginTop: 6 },
    statusRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
    statusText: { marginLeft: 8, fontSize: 13, fontWeight: "600" },

    primaryBtn: {
        marginTop: 16,
        backgroundColor: "#2D9CDB",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
    },
    primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },

    sectionTitle: {
        color: "#9CA3AF",
        fontSize: 12,
        fontWeight: "800",
        marginTop: 24,
        paddingHorizontal: 18,
        marginBottom: 12,
        letterSpacing: 1.5,
        textTransform: "uppercase",
    },
    rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 18, marginTop: 18 },
    linkText: { color: "#2D9CDB", fontWeight: "700" },

    statGrid: {
        paddingHorizontal: 18,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },

    categoryCard: {
        marginHorizontal: 18,
        backgroundColor: "#111827",
        borderRadius: 18,
        padding: 14,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
    },
    categoryRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8 },
    categoryName: { color: "#E5E7EB", fontWeight: "700", width: "40%" },
    categoryRight: { width: "58%" },
    categoryPct: { color: "#9CA3AF", fontWeight: "700", marginBottom: 6, textAlign: "right" },
    barBg: { height: 8, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.06)", overflow: "hidden" },
    barFill: { height: 8, borderRadius: 10, backgroundColor: "#2D9CDB" },

    secondaryBtn: {
        marginTop: 18,
        marginHorizontal: 18,
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
    },
    secondaryBtnText: { color: "#E5E7EB", fontWeight: "800" },

    /* Behavioral Signals Scroll Container */
    signalScroll: { paddingHorizontal: 18, gap: 12 },
});
