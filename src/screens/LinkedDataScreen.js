import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import LinkBankModal from "../components/LinkBankModal";
import UploadCSVModal from "../components/UploadCSVModal";
import UploadStatementModal from "../components/UploadStatementModal";

const OptionCard = ({ icon, title, description, color, onPress, isBeta }) => (
    <TouchableOpacity
        style={styles.optionCard}
        activeOpacity={0.7}
        onPress={onPress}
    >
        <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
            <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.optionContent}>
            <View style={styles.titleRow}>
                <Text style={styles.optionTitle}>{title}</Text>
                {isBeta && (
                    <View style={styles.betaBadge}>
                        <Text style={styles.betaText}>BETA</Text>
                    </View>
                )}
            </View>
            <Text style={styles.optionDesc}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#4B5563" />
    </TouchableOpacity>
);

export default function LinkedDataScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [statementModalVisible, setStatementModalVisible] = useState(false);
    const [linkBankModalVisible, setLinkBankModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <UploadCSVModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />

            <UploadStatementModal
                visible={statementModalVisible}
                onClose={() => setStatementModalVisible(false)}
            />

            <LinkBankModal
                visible={linkBankModalVisible}
                onClose={() => setLinkBankModalVisible(false)}
            />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Linked Data</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Data Sources</Text>

                <OptionCard
                    icon="cloud-upload"
                    title="Upload CSV"
                    description="Import transactions from a CSV file manually."
                    color="#34D399"
                    onPress={() => setModalVisible(true)}
                />

                <OptionCard
                    icon="link"
                    title="Link Bank Accounts"
                    description="Connect your bank using Plaid securely."
                    color="#60A5FA"
                    onPress={() => setLinkBankModalVisible(true)}
                    isBeta
                />

                <OptionCard
                    icon="document-text"
                    title="Update Statements"
                    description="Refresh or re-upload past transaction statements."
                    color="#FACC15"
                    onPress={() => setStatementModalVisible(true)}
                />

                <View style={styles.infoBox}>
                    <Ionicons name="shield-checkmark" size={20} color="#9CA3AF" />
                    <Text style={styles.infoText}>
                        Your data is encrypted and stored locally on your device where possible. We never share your financial data.
                    </Text>
                </View>
            </ScrollView>
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
    content: {
        padding: 24,
    },
    sectionTitle: {
        color: "#6B7280",
        fontSize: 13,
        fontWeight: "700",
        letterSpacing: 1,
        marginBottom: 16,
        marginTop: 8,
        textTransform: "uppercase",
    },

    /* Option Card */
    optionCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#111827",
        padding: 16,
        borderRadius: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    optionContent: {
        flex: 1,
        marginRight: 12,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    optionTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginRight: 8,
    },
    betaBadge: {
        backgroundColor: "rgba(96, 165, 250, 0.2)",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    betaText: {
        color: "#60A5FA",
        fontSize: 10,
        fontWeight: "800",
    },
    optionDesc: {
        color: "#9CA3AF",
        fontSize: 13,
        lineHeight: 18,
    },

    /* Info Box */
    infoBox: {
        marginTop: 24,
        padding: 16,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.03)",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
    },
    infoText: {
        flex: 1,
        color: "#6B7280",
        fontSize: 13,
        lineHeight: 20,
    },
});
