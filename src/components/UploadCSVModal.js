import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function UploadCSVModal({ visible, onClose }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "*/*"],
                copyToCacheDirectory: true,
            });

            if (result.canceled) return;

            const asset = result.assets ? result.assets[0] : result;
            const { name } = asset;

            // Validation: Check extension
            const lowerName = name.toLowerCase();
            if (
                !lowerName.endsWith(".csv") &&
                !lowerName.endsWith(".xls") &&
                !lowerName.endsWith(".xlsx")
            ) {
                Alert.alert("Invalid File Type", "Please upload a CSV or Excel file only.");
                return;
            }

            setFile(asset);
            setSuccess(false);
        } catch (err) {
            console.log("Error picking document: ", err);
        }
    };

    const handleUpload = () => {
        if (!file) return;
        setUploading(true);

        // Simulate upload delay
        setTimeout(() => {
            setUploading(false);
            setSuccess(true);
            setFile(null);
            // In a real app, you would process the file here
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 1000);
        }, 1500);
    };

    const handleCancel = () => {
        setFile(null);
        setSuccess(false);
        onClose();
    };

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
                            <Ionicons name="cloud-upload" size={24} color="#34D399" />
                        </View>
                        <Text style={styles.title}>Upload Transactions</Text>
                        <Text style={styles.subtitle}>Select a CSV file to import your data.</Text>
                    </View>

                    {/* File Selection Area */}
                    {!file && !uploading && !success && (
                        <TouchableOpacity
                            style={styles.uploadZone}
                            activeOpacity={0.8}
                            onPress={pickDocument}
                        >
                            <Ionicons name="document-text-outline" size={32} color="#6B7280" />
                            <Text style={styles.zoneText}>Tap to choose a file</Text>
                            <Text style={styles.zoneSubText}>Supports .CSV or .XLS</Text>
                        </TouchableOpacity>
                    )}

                    {/* Selected File State */}
                    {file && !uploading && !success && (
                        <View style={styles.fileSelected}>
                            <View style={styles.fileIcon}>
                                <Ionicons name="document" size={20} color="#3B82F6" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.fileName} numberOfLines={1}>
                                    {file.name}
                                </Text>
                                <Text style={styles.fileSize}>
                                    {(file.size / 1024).toFixed(1)} KB
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => setFile(null)}>
                                <Ionicons name="close-circle" size={22} color="#EF4444" />
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Uploading State */}
                    {uploading && (
                        <View style={styles.stateContainer}>
                            <ActivityIndicator size="large" color="#34D399" />
                            <Text style={styles.stateText}>Processing data...</Text>
                        </View>
                    )}

                    {/* Success State */}
                    {success && (
                        <View style={styles.stateContainer}>
                            <Ionicons name="checkmark-circle" size={48} color="#34D399" />
                            <Text style={styles.successText}>Upload Complete!</Text>
                        </View>
                    )}

                    {/* Actions */}
                    {!uploading && !success && (
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.uploadBtn,
                                    !file && styles.uploadBtnDisabled,
                                ]}
                                disabled={!file}
                                onPress={handleUpload}
                            >
                                <LinearGradient
                                    colors={file ? ["#2D9CDB", "#3B82F6"] : ["#374151", "#4B5563"]}
                                    style={styles.gradient}
                                >
                                    <Text style={[styles.uploadText, !file && { color: "#9CA3AF" }]}>
                                        Upload
                                    </Text>
                                </LinearGradient>
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
        backgroundColor: "rgba(52, 211, 153, 0.15)",
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
    uploadZone: {
        width: "100%",
        height: 140,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.1)",
        borderStyle: "dashed",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.02)",
        marginBottom: 24,
    },
    zoneText: {
        color: "#E5E7EB",
        fontSize: 15,
        fontWeight: "600",
        marginTop: 12,
    },
    zoneSubText: {
        color: "#6B7280",
        fontSize: 12,
        marginTop: 4,
    },
    fileSelected: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(59, 130, 246, 0.3)",
        marginBottom: 24,
    },
    fileIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    fileName: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
    fileSize: {
        color: "#9CA3AF",
        fontSize: 12,
    },
    stateContainer: {
        height: 140,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },
    stateText: {
        color: "#9CA3AF",
        marginTop: 16,
        fontSize: 14,
    },
    successText: {
        color: "#34D399",
        marginTop: 12,
        fontSize: 16,
        fontWeight: "bold",
    },
    actions: {
        flexDirection: "row",
        width: "100%",
        gap: 12,
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
    uploadBtn: {
        flex: 1,
        borderRadius: 14,
        overflow: "hidden",
    },
    uploadBtnDisabled: {
        opacity: 0.7,
    },
    gradient: {
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    uploadText: {
        color: "#fff",
        fontWeight: "700",
    },
});
