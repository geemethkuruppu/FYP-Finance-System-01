import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

export default function InsightConfidenceCard({ totalTransactions, months, confidenceLevel }) {
    const isHigh = confidenceLevel === "HIGH";
    const color = isHigh ? "#34D399" : "#F87171";

    // Meter segments
    const segments = [1, 2, 3, 4, 5];
    const filled = isHigh ? 5 : 2;

    return (
        <LinearGradient
            colors={["#1F2937", "#111827"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.card}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Data Coverage</Text>
                <View style={[styles.badge, { backgroundColor: isHigh ? "rgba(52, 211, 153, 0.15)" : "rgba(248, 113, 113, 0.15)" }]}>
                    <Text style={[styles.badgeText, { color, textShadowColor: color, textShadowRadius: 8 }]}>{confidenceLevel} CONFIDENCE</Text>
                </View>
            </View>

            {/* Visual Meter */}
            <View style={styles.meterContainer}>
                {segments.map((s) => (
                    <View key={s} style={[styles.meterSegment, { backgroundColor: s <= filled ? color : "rgba(255,255,255,0.05)" }]} />
                ))}
            </View>

            <View style={styles.content}>
                <Text style={styles.bullet}>• {months} months of transaction history</Text>
                <Text style={styles.bullet}>• {totalTransactions} transactions analyzed</Text>
                {!isHigh && <Text style={[styles.bullet, { color: "#F87171", marginTop: 4 }]}>Reason: Less than 2 months of history</Text>}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        marginBottom: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    title: { color: "#fff", fontSize: 16, fontWeight: "700" },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: { fontSize: 11, fontWeight: "800", letterSpacing: 1 },

    meterContainer: {
        flexDirection: "row",
        gap: 4,
        marginBottom: 20,
        height: 4,
    },
    meterSegment: {
        flex: 1,
        height: "100%",
        borderRadius: 2,
    },

    content: { gap: 8 },
    bullet: { color: "#D1D5DB", fontSize: 14, lineHeight: 22 },
});
