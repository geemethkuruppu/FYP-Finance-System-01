import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function LinkBankModal({ visible, onClose }) {
    const [connecting, setConnecting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);

    const checkBank = (bankName) => {
        setSelectedBank(bankName);
        setConnecting(true);

        // Simulate connection delay
        setTimeout(() => {
            setConnecting(false);
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
                setSelectedBank(null);
                onClose();
            }, 1000);
        }, 2000);
    };

    const handleCancel = () => {
        if (connecting) return;
        setSuccess(false);
        setSelectedBank(null);
        onClose();
    };

    const banks = [
        { name: "Chase", color: "#117aca", icon: "briefcase" },
        { name: "Bank of America", color: "#e31837", icon: "business" },
        { name: "Wells Fargo", color: "#d71e28", icon: "card" },
        { name: "Citi", color: "#003b70", icon: "cash" },
        { name: "Capital One", color: "#004879", icon: "wallet" },
    ];

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={handleCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.iconBox}>
                            <Ionicons name="link" size={24} color="#60A5FA" />
                        </View>
                        <Text style={styles.title}>Link Bank Account</Text>
                        <Text style={styles.subtitle}>Select your bank to securely connect via Plaid.</Text>
                    </View>

                    {/* Bank Selection List */}
                    {!connecting && !success && (
                        <View style={styles.bankList}>
                            {banks.map((bank, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.bankItem}
                                    activeOpacity={0.7}
                                    onPress={() => checkBank(bank.name)}
                                >
                                    <View style={[styles.bankIcon, { backgroundColor: `${bank.color}20` }]}>
                                        <Ionicons name={bank.icon} size={20} color={bank.color} />
                                    </View>
                                    <Text style={styles.bankName}>{bank.name}</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#6B7280" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* Connecting State */}
                    {connecting && (
                        <View style={styles.stateContainer}>
                            <ActivityIndicator size="large" color="#60A5FA" />
                            <Text style={styles.stateText}>Connecting to {selectedBank}...</Text>
                            <Text style={styles.subStateText}>Verifying credentials securely</Text>
                        </View>
                    )}

                    {/* Success State */}
                    {success && (
                        <View style={styles.stateContainer}>
                            <Ionicons name="checkmark-circle" size={48} color="#34D399" />
                            <Text style={styles.successText}>Account Linked!</Text>
                            <Text style={styles.subStateText}>Your data is now syncing.</Text>
                        </View>
                    )}

                    {/* Actions */}
                    {!connecting && !success && (
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.75)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalContent: {
        width: "100%",
        backgroundColor: "#111827",
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        alignItems: "center",
    },
    header: {
        alignItems: "center",
        marginBottom: 24,
    },
    iconBox: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "rgba(96, 165, 250, 0.15)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    subtitle: {
        color: "#9CA3AF",
        fontSize: 14,
        textAlign: "center",
        marginTop: 6,
    },
    bankList: {
        width: "100%",
        marginBottom: 24,
    },
    bankItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "rgba(255,255,255,0.03)",
        borderRadius: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
    },
    bankIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    bankName: {
        flex: 1,
        color: "#E5E7EB",
        fontWeight: "600",
        fontSize: 14,
    },
    stateContainer: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },
    stateText: {
        color: "#fff",
        marginTop: 16,
        fontSize: 16,
        fontWeight: "600",
    },
    subStateText: {
        color: "#9CA3AF",
        marginTop: 4,
        fontSize: 13,
    },
    successText: {
        color: "#34D399",
        marginTop: 12,
        fontSize: 18,
        fontWeight: "bold",
    },
    actions: {
        flexDirection: "row",
        width: "100%",
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.05)",
        alignItems: "center",
        justifyContent: "center",
    },
    cancelText: {
        color: "#E5E7EB",
        fontWeight: "600",
    },
});
