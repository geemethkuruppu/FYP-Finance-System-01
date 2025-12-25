import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ChatScreen({ navigation }) {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi Alex! I noticed your subscription spending increased by 18% this month. Want to look into that?", sender: "bot" },
        { id: 2, text: "Yeah, which subscriptions?", sender: "user" },
        { id: 3, text: "It looks like Netflix, Spotify, and a new charge from 'Adobe Creative Cloud' contributed to the increase.", sender: "bot" },
    ]);
    const [inputText, setInputText] = useState("");

    const handleSend = () => {
        if (!inputText.trim()) return;
        const newMsg = { id: Date.now(), text: inputText, sender: "user" };
        setMessages([...messages, newMsg]);
        setInputText("");

        // Simulate bot typing
        setTimeout(() => {
            const botResponse = { id: Date.now() + 1, text: "Got it. I can help you set a reminder to cancel Adobe before the trial ends.", sender: "bot" };
            setMessages(prev => [...prev, botResponse]);
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header */}
            <LinearGradient
                colors={["#2563EB", "#1E3A8A"]}
                style={styles.header}
            >
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Ionicons name="chevron-down" size={28} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>FinXAI Coach</Text>
                        <Text style={styles.headerSubtitle}>Always here to help</Text>
                    </View>
                    <View style={{ width: 40 }} />
                </View>
            </LinearGradient>

            {/* Chat Area */}
            <ScrollView
                style={styles.chatContainer}
                contentContainerStyle={styles.chatContent}
                showsVerticalScrollIndicator={false}
            >
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.msgBubble,
                            msg.sender === "user" ? styles.userBubble : styles.botBubble
                        ]}
                    >
                        <Text style={[
                            styles.msgText,
                            msg.sender === "user" ? styles.userText : styles.botText
                        ]}>
                            {msg.text}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {/* Input Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ask anything..."
                        placeholderTextColor="#6B7280"
                        value={inputText}
                        onChangeText={setInputText}
                        returnKeyType="send"
                        onSubmitEditing={handleSend}
                    />
                    <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                        <Ionicons name="arrow-up" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0A0F1F" },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "space-between",
    },
    backBtn: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 20,
    },
    headerTitleContainer: { alignItems: "center" },
    headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
    headerSubtitle: { color: "#A5B4FC", fontSize: 12, fontWeight: "500" },

    chatContainer: { flex: 1 },
    chatContent: { padding: 20, gap: 16 },

    msgBubble: {
        maxWidth: "80%",
        borderRadius: 20,
        padding: 16,
    },
    botBubble: {
        backgroundColor: "#1F2937",
        alignSelf: "flex-start",
        borderBottomLeftRadius: 4,
    },
    userBubble: {
        backgroundColor: "#2563EB",
        alignSelf: "flex-end",
        borderBottomRightRadius: 4,
    },
    msgText: { fontSize: 15, lineHeight: 22 },
    botText: { color: "#E5E7EB" },
    userText: { color: "#fff" },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        paddingBottom: 30,
        backgroundColor: "#111827",
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.05)",
        gap: 12,
    },
    input: {
        flex: 1,
        backgroundColor: "#1F2937",
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 12,
        color: "#fff",
        fontSize: 15,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
    },
});
