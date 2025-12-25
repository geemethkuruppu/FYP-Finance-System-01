import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

/* ---------------- DATA ---------------- */
const CHAT_HISTORY = [
    {
        id: 1,
        sender: "coach",
        message: "Yo Alex! 👋 I saw that $150 transaction at 'Starbucks'. We need to talk bestie... 💀",
    },
    {
        id: 2,
        sender: "user",
        message: "It was for the team! 😭 Don't roast me.",
    },
    {
        id: 3,
        sender: "coach",
        message: "I gotchu, but that's like 15% of your entertainment budget gone in one go. 📉 Want me to suggest a cheaper spot for next time?",
    },
    {
        id: 4,
        sender: "coach",
        message: "Btw, you're killing it on the savings goal tho! 🔥 Keep that energy up.",
    },
];

const SUGGESTIONS = [
    "Roast my spending 🔥",
    "Am I broke? 📉",
    "Save me money 💰",
    "Budget check ✅",
];

/* ---------------- COMPONENT ---------------- */
export default function CoachScreen() {
    const [inputText, setInputText] = useState("");

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header */}
            <LinearGradient
                colors={["#0F172A", "#0A0F1F"]}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <View style={styles.avatarContainer}>
                        <LinearGradient
                            colors={["#8B5CF6", "#EC4899"]}
                            style={styles.avatarGradient}
                        >
                            <Ionicons name="sparkles" size={20} color="#fff" />
                        </LinearGradient>
                        <View style={styles.onlineBadge} />
                    </View>
                    <View>
                        <Text style={styles.headerTitle}>FinBestie 💸</Text>
                        <Text style={styles.headerSubtitle}>Always watching...</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.headerBtn}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
                </TouchableOpacity>
            </LinearGradient>

            {/* Chat Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={90}
            >
                <ScrollView
                    contentContainerStyle={styles.chatContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.dateLabel}>Today, 8:42 PM</Text>

                    {CHAT_HISTORY.map((chat) => (
                        <View
                            key={chat.id}
                            style={[
                                styles.msgRow,
                                chat.sender === "user" ? styles.msgRowRight : styles.msgRowLeft,
                            ]}
                        >
                            {chat.sender === "coach" && (
                                <View style={styles.msgAvatar}>
                                    <Ionicons name="sparkles" size={12} color="#fff" />
                                </View>
                            )}
                            <LinearGradient
                                colors={
                                    chat.sender === "user"
                                        ? ["#2D9CDB", "#3B82F6"]
                                        : ["#1F2937", "#111827"]
                                }
                                style={[
                                    styles.msgBubble,
                                    chat.sender === "user" ? styles.bubbleRight : styles.bubbleLeft,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.msgText,
                                        chat.sender === "user" ? styles.textRight : styles.textLeft,
                                    ]}
                                >
                                    {chat.message}
                                </Text>
                            </LinearGradient>
                        </View>
                    ))}
                </ScrollView>

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.suggestionsRow}
                    >
                        {SUGGESTIONS.map((s, i) => (
                            <TouchableOpacity key={i} style={styles.suggestionChip}>
                                <Text style={styles.suggestionText}>{s}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.inputBar}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Ask me anything..."
                            placeholderTextColor="#6B7280"
                            value={inputText}
                            onChangeText={setInputText}
                        />
                        <TouchableOpacity style={styles.sendBtn}>
                            <Ionicons name="arrow-up" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#05070a",
    },

    /* Header */
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.05)",
        zIndex: 10,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatarContainer: {
        marginRight: 12,
        position: "relative",
    },
    avatarGradient: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
    },
    onlineBadge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#34D399",
        borderWidth: 2,
        borderColor: "#0F172A",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    headerSubtitle: {
        color: "#9CA3AF",
        fontSize: 12,
    },
    headerBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.05)",
        alignItems: "center",
        justifyContent: "center",
    },

    /* Chat Messages */
    chatContent: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 20,
    },
    dateLabel: {
        textAlign: "center",
        color: "#6B7280",
        fontSize: 12,
        marginBottom: 24,
        fontWeight: "600",
    },
    msgRow: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "flex-end",
    },
    msgRowLeft: {
        justifyContent: "flex-start",
    },
    msgRowRight: {
        justifyContent: "flex-end",
    },
    msgAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#8B5CF6",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
        marginBottom: 2,
    },
    msgBubble: {
        maxWidth: "75%",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
    },
    bubbleLeft: {
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    bubbleRight: {
        borderBottomRightRadius: 4,
    },
    msgText: {
        fontSize: 15,
        lineHeight: 22,
    },
    textLeft: {
        color: "#E5E7EB",
    },
    textRight: {
        color: "#fff",
        fontWeight: "500",
    },

    /* Input Area */
    inputContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#0A0F1F",
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.05)",
        paddingBottom: Platform.OS === "ios" ? 130 : 90,
    },
    suggestionsRow: {
        paddingBottom: 12,
        gap: 8,
    },
    suggestionChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
    },
    suggestionText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "500",
    },
    inputBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1F2937",
        borderRadius: 28,
        paddingHorizontal: 6,
        paddingVertical: 6,
    },
    inputField: {
        flex: 1,
        color: "#fff",
        fontSize: 15,
        paddingHorizontal: 16,
        height: 40,
    },
    sendBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#2D9CDB",
        alignItems: "center",
        justifyContent: "center",
    },
});
