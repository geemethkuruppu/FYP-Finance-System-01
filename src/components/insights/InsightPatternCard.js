import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function InsightPatternCard({ pattern }) {
    let color = "#60A5FA"; // Blue/Low
    if (pattern.severity === "High") color = "#EF4444";
    if (pattern.severity === "Medium") color = "#F59E0B";

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <View style={[styles.dot, { backgroundColor: color }]} />
                    <Text style={styles.patternName}>{pattern.name}</Text>
                </View>
                <Text style={[styles.severity, { color }]}>{pattern.severity} Severity</Text>
            </View>

            <View style={styles.evidenceSection}>
                <Text style={styles.evidenceLabel}>EVIDENCE:</Text>
                {pattern.evidence.map((point, i) => (
                    <View key={i} style={styles.evidenceRow}>
                        <Ionicons name="ellipse" size={4} color="#4B5563" style={{ marginTop: 6 }} />
                        <Text style={styles.evidenceText}>{point}</Text>
                    </View>
                ))}
                <Text style={styles.timeWindow}>{pattern.timeWindow}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#111827",
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        marginBottom: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    dot: { width: 10, height: 10, borderRadius: 5 },
    patternName: { color: "#fff", fontSize: 16, fontWeight: "700" },
    severity: { fontSize: 11, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0.5 },

    evidenceSection: {
        backgroundColor: "rgba(255,255,255,0.03)",
        borderRadius: 12,
        padding: 12,
        gap: 8,
    },
    evidenceLabel: { color: "#9CA3AF", fontSize: 11, fontWeight: "800", marginBottom: 2, letterSpacing: 0.5 },
    evidenceRow: { flexDirection: "row", gap: 10 },
    evidenceText: { color: "#E5E7EB", fontSize: 14, flex: 1, lineHeight: 20 },
    timeWindow: { color: "#6B7280", fontSize: 12, marginTop: 6, fontStyle: "italic" },
});
