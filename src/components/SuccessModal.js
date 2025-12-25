import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function SuccessModal({ visible, message, onClose }) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000); // Auto close after 2 seconds
            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Ionicons name="checkmark-circle" size={64} color="#34D399" />
                    <Text style={styles.message}>{message}</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#1F2937",
        padding: 32,
        borderRadius: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    message: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginTop: 16,
        textAlign: "center",
    },
});
