import { StyleSheet, Text, View } from "react-native";

export default function InsightAnomalyCard({ transaction }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Unusual Transaction Detected</Text>

            <View style={styles.mainRow}>
                <View>
                    <Text style={styles.merchant}>{transaction.merchant}</Text>
                    <Text style={styles.category}>{transaction.category}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.amount}>${transaction.amount}</Text>
                    <Text style={styles.baseline}>Normal: ${transaction.normal}</Text>
                </View>
            </View>

            <View style={styles.deviationBox}>
                <Text style={styles.deviationText}>
                    <Text style={{ fontWeight: "900", color: "#F87171", fontSize: 18, textShadowColor: "#F87171", textShadowRadius: 10 }}>{transaction.deviationRatio}×</Text> higher than usual
                </Text>
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
    title: { color: "#F87171", fontSize: 12, fontWeight: "800", marginBottom: 16, letterSpacing: 1, textTransform: 'uppercase' },
    mainRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
    merchant: { color: "#fff", fontSize: 20, fontWeight: "800" },
    category: { color: "#9CA3AF", fontSize: 14, marginTop: 4 },
    amount: { color: "#fff", fontSize: 22, fontWeight: "800" },
    baseline: { color: "#6B7280", fontSize: 14, marginTop: 4, textAlign: 'right' },

    deviationBox: {
        backgroundColor: "rgba(248,113,113,0.05)",
        padding: 16,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(248,113,113,0.2)",
    },
    deviationText: { color: "#E5E7EB", fontSize: 15, fontWeight: "500" },
});
