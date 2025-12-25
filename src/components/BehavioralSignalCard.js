import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function BehavioralSignalCard({ item, onPress }) {
    const isPositive = item.type === "positive";
    const bg = isPositive ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)";
    const border = isPositive ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)";
    const iconColor = isPositive ? "#10B981" : "#EF4444";
    const textColor = isPositive ? "#34D399" : "#F87171";

    return (
        <TouchableOpacity
            style={[styles.signalCard, { backgroundColor: bg, borderColor: border }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Ionicons name={item.icon} size={20} color={iconColor} />
            <Text style={[styles.signalText, { color: textColor }]}>{item.text}</Text>
            <Ionicons name="chevron-forward" size={16} color={iconColor} style={{ marginLeft: "auto" }} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    signalCard: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        minWidth: 280,
        gap: 12,
    },
    signalText: { fontSize: 13, fontWeight: "700", flex: 1 },
});
