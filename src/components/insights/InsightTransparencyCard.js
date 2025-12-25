import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function InsightTransparencyCard() {
    const points = [
        "Patterns are derived from historical data",
        "No assumptions are made without evidence",
        "Some patterns may have lower confidence due to limited data"
    ];

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Model Transparency</Text>
            {points.map((p, i) => (
                <View key={i} style={styles.row}>
                    <Ionicons name="checkmark-circle" size={16} color="#34D399" />
                    <Text style={styles.text}>{p}</Text>
                </View>
            ))}
            <Text style={styles.note}>
                This system does not use personal identity or merchant branding for behavior detection.
            </Text>
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
        marginBottom: 40,
    },
    title: { color: "#fff", fontSize: 14, fontWeight: "700", marginBottom: 12 },
    row: { flexDirection: "row", gap: 10, marginBottom: 8 },
    text: { color: "#D1D5DB", fontSize: 13, flex: 1 },
    note: { color: "#6B7280", fontSize: 11, marginTop: 8, fontStyle: "italic" },
});
