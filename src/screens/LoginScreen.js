import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function LoginScreen({ navigation }) {
    const { colors } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Simulate login
        navigation.replace("MainTabs");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <StatusBar style="light" />

                {/* Ambient Glows */}
                <View style={[styles.glowTop, { backgroundColor: colors.primary }]} />
                <View style={[styles.glowBottom, { backgroundColor: colors.secondary }]} />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.content}
                >
                    {/* Header Logo Area */}
                    <View style={styles.header}>
                        <View style={styles.logoCircle}>
                            <Ionicons name="wallet-outline" size={40} color={colors.primary} />
                        </View>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Sign in to continue your financial journey</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* Email Input */}
                        <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                            <Ionicons name="mail-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder="Email Address"
                                placeholderTextColor={colors.textSecondary}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        {/* Password Input */}
                        <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                            <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder="Password"
                                placeholderTextColor={colors.textSecondary}
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <TouchableOpacity style={styles.forgotBtn}>
                            <Text style={[styles.forgotText, { color: colors.primary }]}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleLogin}
                            style={styles.shadowBtn}
                        >
                            <LinearGradient
                                colors={[colors.primary, colors.secondary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.loginBtn}
                            >
                                <Text style={styles.loginBtnText}>Log In</Text>
                                <Ionicons name="arrow-forward" size={20} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.line} />
                            <Text style={styles.orText}>Or continue with</Text>
                            <View style={styles.line} />
                        </View>

                        {/* Social Buttons */}
                        <View style={styles.socialRow}>
                            <TouchableOpacity style={styles.socialBtn}>
                                <Ionicons name="logo-google" size={24} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialBtn}>
                                <Ionicons name="logo-apple" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                            <Text style={[styles.signupText, { color: colors.primary }]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, justifyContent: "center", paddingHorizontal: 24 },

    glowTop: {
        position: "absolute",
        top: -100,
        left: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.15,
    },
    glowBottom: {
        position: "absolute",
        bottom: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.15,
    },

    header: { alignItems: "center", marginBottom: 32 },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "rgba(255,255,255,0.05)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    title: { fontSize: 28, fontWeight: "800", color: "#fff", marginBottom: 8 },
    subtitle: { fontSize: 13, color: "#9CA3AF", textAlign: "center" },

    form: { gap: 16 },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 12,
        borderWidth: 1,
        height: 56,
        paddingHorizontal: 16,
    },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, fontSize: 16, color: "#fff" },

    forgotBtn: { alignSelf: "flex-end" },
    forgotText: { fontSize: 13, fontWeight: "600" },

    shadowBtn: {
        marginTop: 8,
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    loginBtn: {
        height: 56,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    loginBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

    dividerContainer: { flexDirection: "row", alignItems: "center", marginVertical: 24 },
    line: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.1)" },
    orText: { color: "#9CA3AF", fontSize: 12, marginHorizontal: 16 },

    socialRow: { flexDirection: "row", justifyContent: "center", gap: 24 },
    socialBtn: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.08)",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },

    footer: { flexDirection: "row", justifyContent: "center", marginTop: 40 },
    footerText: { color: "#9CA3AF", fontSize: 14 },
    signupText: { fontWeight: "700", fontSize: 14 },
});
