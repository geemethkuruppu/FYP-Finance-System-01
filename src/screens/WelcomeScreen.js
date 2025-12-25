import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useTheme } from "../context/ThemeContext";

const { width, height } = Dimensions.get("window");

/* ---------------- COIN CONFIG ---------------- */
const COIN_COUNT = 15;
const coins = Array.from({ length: COIN_COUNT }).map(() => ({
    x: Math.random() * width,
    size: 18 + Math.random() * 26,
    delay: Math.random() * 1500,
    duration: 3500 + Math.random() * 2000,
}));

export default function WelcomeScreen({ navigation }) {
    const { colors } = useTheme();
    const buttonTranslateY = useRef(new Animated.Value(120)).current;

    // Each coin has its own Animated.Value
    const coinAnimations = useRef(
        coins.map(() => new Animated.Value(-60))
    ).current;

    useEffect(() => {
        /* -------- Falling coins -------- */
        const coinLoops = coinAnimations.map((anim, index) =>
            Animated.loop(
                Animated.sequence([
                    Animated.timing(anim, {
                        toValue: height + 80,
                        duration: coins[index].duration,
                        delay: coins[index].delay,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: -60,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ])
            )
        );

        Animated.parallel(coinLoops).start();

        /* -------- Button slide-up -------- */
        Animated.timing(buttonTranslateY, {
            toValue: 0,
            duration: 900,
            delay: 600,
            easing: Easing.out(Easing.back(1.3)),
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="light" translucent />
            <LinearGradient
                colors={[colors.background, colors.card, colors.background]}
                style={styles.gradient}
            >
                {/* ---------------- Falling Coins ---------------- */}
                {coins.map((coin, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.coin,
                            {
                                left: coin.x,
                                transform: [{ translateY: coinAnimations[index] }],
                            },
                        ]}
                    >
                        <Ionicons name="logo-usd" size={coin.size} color={colors.primary} />
                    </Animated.View>
                ))}

                {/* ---------------- Center Content ---------------- */}
                <View style={styles.centerContent}>
                    {/* Logo */}
                    <View style={[styles.logoOuter, { backgroundColor: colors.primary + "25", borderColor: colors.primary + "60" }]}>
                        <View style={[styles.logoInner, { backgroundColor: colors.primary }]}>
                            <Ionicons name="logo-usd" size={width * 0.12} color="#0F172A" />
                        </View>
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>
                        Fin<Text style={{ color: colors.secondary }}>X</Text>AI
                    </Text>

                    {/* Tagline */}
                    <Text style={styles.tagline}>
                        Your stress-free financial coach{"\n"}
                        <Text style={styles.subTagline}>
                            Build better money habits with clarity
                        </Text>
                    </Text>
                </View>

                {/* ---------------- Bottom Button ---------------- */}
                <Animated.View
                    style={[
                        styles.buttonWrapper,
                        { transform: [{ translateY: buttonTranslateY }] },
                    ]}
                >
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.primary }]}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                        <Ionicons name="arrow-forward" size={22} color="#fff" />
                    </TouchableOpacity>
                </Animated.View>
            </LinearGradient>
        </View>
    );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },

    /* Coins */
    coin: {
        position: "absolute",
        opacity: 0.35,
    },

    /* Center content */
    centerContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    logoOuter: {
        width: width * 0.28,
        height: width * 0.28,
        borderRadius: (width * 0.28) / 2,
        // backgroundColor: dynamic via inline styles
        borderWidth: 2,
        // borderColor: dynamic via inline styles
        alignItems: "center",
        justifyContent: "center",
        marginBottom: height * 0.03,
    },
    logoInner: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: (width * 0.2) / 2,
        // backgroundColor: dynamic via inline styles
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: width * 0.12,
        fontWeight: "800",
        color: "#fff",
        letterSpacing: 1.2,
    },
    highlight: {
        // color: dynamic
    },

    tagline: {
        marginTop: height * 0.02,
        fontSize: width * 0.045,
        color: "#9CA3AF",
        textAlign: "center",
        lineHeight: 24,
    },
    subTagline: {
        fontSize: width * 0.035,
        color: "#6B7280",
    },

    /* Button */
    buttonWrapper: {
        position: "absolute",
        bottom: height * 0.08,
        width: "100%",
        alignItems: "center",
    },
    button: {
        width: "80%",
        // backgroundColor: dynamic
        paddingVertical: 16,
        borderRadius: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
});
