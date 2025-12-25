import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";

export default function AvatarUploadModal({ visible, onClose, onImageSelected }) {

    const handleCamera = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission Denied", "Sorry, we need camera permissions to make this work!");
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                onImageSelected(result.assets[0].uri);
                onClose();
            }
        } catch (error) {
            console.log("Camera Error:", error);
            Alert.alert("Error", "Failed to open camera.");
        }
    };

    const handleGallery = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission Denied", "Sorry, we need gallery permissions to make this work!");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                onImageSelected(result.assets[0].uri);
                onClose();
            }
        } catch (error) {
            console.log("Gallery Error:", error);
            Alert.alert("Error", "Failed to open gallery.");
        }
    };

    const handleFiles = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['image/*'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                onImageSelected(result.assets[0].uri);
                onClose();
            }
        } catch (error) {
            console.log("File Picker Error:", error);
            Alert.alert("Error", "Failed to pick file.");
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <View style={styles.headerIndicator} />
                            <Text style={styles.modalTitle}>Change Profile Photo</Text>
                            <Text style={styles.modalSubtitle}>Choose an option to upload</Text>

                            <View style={styles.optionsContainer}>
                                <TouchableOpacity
                                    style={styles.optionCard}
                                    onPress={handleCamera}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: "rgba(16, 185, 129, 0.15)" }]}>
                                        <Ionicons name="camera" size={24} color="#10B981" />
                                    </View>
                                    <View>
                                        <Text style={styles.optionTitle}>Camera</Text>
                                        <Text style={styles.optionSub}>Take a new photo</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.optionCard}
                                    onPress={handleGallery}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: "rgba(59, 130, 246, 0.15)" }]}>
                                        <Ionicons name="images" size={24} color="#3B82F6" />
                                    </View>
                                    <View>
                                        <Text style={styles.optionTitle}>Gallery</Text>
                                        <Text style={styles.optionSub}>Select from photos</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.optionCard}
                                    onPress={handleFiles}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: "rgba(139, 92, 246, 0.15)" }]}>
                                        <Ionicons name="folder-open" size={24} color="#8B5CF6" />
                                    </View>
                                    <View>
                                        <Text style={styles.optionTitle}>Files</Text>
                                        <Text style={styles.optionSub}>Select from storage</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#111827",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        minHeight: 380,
    },
    headerIndicator: {
        width: 40,
        height: 4,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 20,
    },
    modalTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 8,
        textAlign: "center",
    },
    modalSubtitle: {
        color: "#9CA3AF",
        fontSize: 14,
        marginBottom: 24,
        textAlign: "center",
    },
    optionsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    optionCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.03)",
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
        gap: 16,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 24, // Circle
        alignItems: "center",
        justifyContent: "center",
    },
    optionTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
    },
    optionSub: {
        color: "#6B7280",
        fontSize: 13,
    },
    cancelBtn: {
        paddingVertical: 16,
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 16,
    },
    cancelText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});
