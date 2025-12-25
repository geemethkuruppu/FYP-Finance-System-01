import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NOTIFICATIONS_DATA = [
    {
        title: "December 2025",
        data: [
            {
                id: "1",
                type: "alert",
                title: "Overspending Alert",
                body: "You've exceeded your Dining budget by $150.",
                time: "2 hrs ago",
                icon: "alert-circle",
                color: "#EF4444",
            },
            {
                id: "2",
                type: "success",
                title: "Goal Achieved",
                body: "Congratulations! You hit your savings goal for the MacBook.",
                time: "1 day ago",
                icon: "trophy",
                color: "#34D399",
            },
        ],
    },
    {
        title: "November 2025",
        data: [
            {
                id: "3",
                type: "info",
                title: "New Feature Available",
                body: "Try out the new AI Coach to get personalized tips.",
                time: "Nov 28",
                icon: "sparkles",
                color: "#60A5FA",
            },
            {
                id: "4",
                type: "system",
                title: "Statement Updated",
                body: "Your October bank statement is now available.",
                time: "Nov 15",
                icon: "document-text",
                color: "#9CA3AF",
            },
        ],
    },
];

const NotificationItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <View style={[styles.iconBox, { backgroundColor: `${item.color}15` }]}>
            <Ionicons name={item.icon} size={22} color={item.color} />
            {item.type === "alert" && <View style={styles.alertDot} />}
        </View>
        <View style={styles.textContainer}>
            <View style={styles.titleRow}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemTime}>{item.time}</Text>
            </View>
            <Text style={styles.itemBody}>{item.body}</Text>
        </View>
    </View>
);

export default function NotificationsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 40 }} />
            </View>

            <SectionList
                sections={NOTIFICATIONS_DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NotificationItem item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{title}</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="notifications-off-outline" size={48} color="#4B5563" />
                        <Text style={styles.emptyText}>No notifications yet</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#05070a",
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.05)",
        backgroundColor: "#05070a",
        zIndex: 10,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.05)",
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },
    listContent: {
        paddingBottom: 40,
    },
    sectionHeader: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 12,
        backgroundColor: "#05070a",
    },
    sectionTitle: {
        color: "#9CA3AF",
        fontSize: 13,
        fontWeight: "700",
        letterSpacing: 1,
        textTransform: "uppercase",
    },
    itemContainer: {
        flexDirection: "row",
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 12,
        backgroundColor: "#111827",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
        alignItems: "flex-start",
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
        position: "relative",
    },
    alertDot: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#EF4444",
    },
    textContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 6,
    },
    itemTitle: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
        flex: 1,
        paddingRight: 8,
    },
    itemTime: {
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "500",
    },
    itemBody: {
        color: "#9CA3AF",
        fontSize: 13,
        lineHeight: 18,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 100,
    },
    emptyText: {
        color: "#6B7280",
        marginTop: 16,
        fontSize: 15,
        fontWeight: "500",
    },
});
