import { StyleSheet, Text, View } from "react-native";

export default function InsightBaselineCard({ data }) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Normal Behavior Baseline</Text>
                <Text style={styles.subtitle}>Learned from history; future is compared to this.</Text>
            </View>

            <View style={styles.tableHeader}>
                <Text style={[styles.th, { flex: 2 }]}>Category</Text>
                <Text style={[styles.th, { flex: 2, textAlign: "right" }]}>Normal</Text>
                <Text style={[styles.th, { flex: 1.5, textAlign: "right" }]}>Variance</Text>
            </View>

            {data.map((item, index) => (
                <View key={index} style={[styles.row, index !== data.length - 1 && styles.borderBottom]}>
                    <Text style={[styles.td, { flex: 2, color: "#fff" }]}>{item.category}</Text>
                    <Text style={[styles.td, { flex: 2, textAlign: "right" }]}>{item.normal}</Text>
                    <Text style={[styles.td, { flex: 1.5, textAlign: "right", color: "#9CA3AF" }]}>{item.variance}</Text>
                </View>
            ))}
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
    header: { marginBottom: 16 },
    title: { color: "#fff", fontSize: 15, fontWeight: "700", marginBottom: 4 },
    subtitle: { color: "#6B7280", fontSize: 12 },

    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.1)",
        paddingBottom: 8,
        marginBottom: 8,
    },
    th: { color: "#6B7280", fontSize: 11, fontWeight: "700", textTransform: "uppercase" },

    row: { flexDirection: "row", paddingVertical: 8 },
    borderBottom: { borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.03)" },
    td: { fontSize: 13, color: "#D1D5DB" },
});
