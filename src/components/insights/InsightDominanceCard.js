import { StyleSheet, Text, View } from "react-native";

export default function InsightDominanceCard({ data }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Category Concentration</Text>
            <View style={styles.row}>
                <Text style={styles.highlight}>{data.percentage}%</Text>
                <Text style={styles.text}>of total expenses are in <Text style={{ color: "#fff", fontWeight: "700" }}>{data.category}</Text></Text>
            </View>
            <Text style={styles.subtext}>Normal healthy range: &lt;{data.healthyLimit}%</Text>
            <Text style={styles.observation}>{data.observationPeriod}</Text>

            <View style={styles.whyBox}>
                <Text style={styles.whyTitle}>WHY THIS MATTERS</Text>
                <Text style={styles.whyText}>High concentration may reduce budget flexibility and increase risk during income changes.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#111827",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
        marginBottom: 16,
    },
    title: { color: "#60A5FA", fontSize: 13, fontWeight: "700", marginBottom: 10 },
    row: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
    highlight: { color: "#fff", fontSize: 24, fontWeight: "900" },
    text: { color: "#D1D5DB", fontSize: 14, flex: 1 },
    subtext: { color: "#9CA3AF", fontSize: 13, marginBottom: 4 },
    observation: { color: "#6B7280", fontSize: 12, fontStyle: "italic", marginBottom: 12 },

    whyBox: {
        backgroundColor: "rgba(255,255,255,0.03)",
        padding: 12,
        borderRadius: 8,
    },
    whyTitle: { color: "#6B7280", fontSize: 10, fontWeight: "800", marginBottom: 4 },
    whyText: { color: "#D1D5DB", fontSize: 12, lineHeight: 18 },
});
