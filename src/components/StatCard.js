import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

export default function StatCard({ label, value, icon, iconColor = "#2D9CDB" }) {
    return (
        <LinearGradient
            colors={["#1F2937", "#111827"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statCard}
        >
            <View style={styles.statRow}>
                <View style={[styles.statIconWrap, { backgroundColor: `${iconColor}20` }]}>
                    <Ionicons name={icon} size={18} color={iconColor} />
                </View>
                <Text style={styles.statLabel}>{label}</Text>
            </View>
            <Text style={styles.statValue}>{value}</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    statCard: {
        width: "48%",
        borderRadius: 20,
        padding: 18,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
    },
    statRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
    statIconWrap: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    statLabel: { color: "#9CA3AF", fontSize: 11, fontWeight: "700", flex: 1, flexWrap: 'wrap' },
    statValue: { color: "#fff", fontSize: 18, fontWeight: "800", marginTop: 4 },
});
