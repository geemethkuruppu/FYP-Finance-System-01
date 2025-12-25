import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ActivePlanCard({ plan, onPress }) {
    return (
        <LinearGradient
            colors={["#1F2937", "#111827"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.planCard}
        >
            <View style={styles.planHeader}>
                <View>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.planStatus}>{plan.status}</Text>
                </View>
                <TouchableOpacity style={styles.planBtn} onPress={onPress}>
                    <Text style={styles.planBtnText}>Resume</Text>
                    <Ionicons name="play" size={12} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.progressBarBg}>
                <LinearGradient
                    colors={["#3B82F6", "#2563EB"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressBarFill, { width: `${plan.progress * 100}%` }]}
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    planCard: {
        marginHorizontal: 18,
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    planHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    planTitle: { color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 4 },
    planStatus: { color: "#9CA3AF", fontSize: 13, fontWeight: "600" },
    planBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2563EB",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        gap: 6,
    },
    planBtnText: { color: "#fff", fontSize: 12, fontWeight: "800" },
    progressBarBg: {
        height: 8,
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 4,
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        borderRadius: 4,
    },
});
