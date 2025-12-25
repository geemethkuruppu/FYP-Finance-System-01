import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    Alert,
    BackHandler,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import AvatarUploadModal from "../components/AvatarUploadModal";
import SuccessModal from "../components/SuccessModal";

const InputField = ({ label, value, icon, onChangeText }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputContainer}>
            <View style={styles.iconBox}>
                <Ionicons name={icon} size={20} color="#6B7280" />
            </View>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#4B5563"
            />
        </View>
    </View>
);

export default function PersonalInfoScreen({ navigation }) {
    const [form, setForm] = useState({
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 000-0000",
        occupation: "Software Engineer",
    });
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState("Changes Saved Successfully!");

    // Avatar State
    const [avatarUri, setAvatarUri] = useState(null);
    const [avatarModalVisible, setAvatarModalVisible] = useState(false);

    // Effect to handle Hardware Back (Android) and Disable Swipe Gesture (iOS/Android)
    useEffect(() => {
        // Disable swipe gesture if there are unsaved changes
        navigation.setOptions({
            gestureEnabled: !hasUnsavedChanges,
        });

        // Handle Android Hardware Back Button
        const backAction = () => {
            if (hasUnsavedChanges) {
                Alert.alert(
                    'Discard changes?',
                    'You have unsaved changes. Are you sure you want to discard them and leave the screen?',
                    [
                        { text: "Don't leave", style: 'cancel', onPress: () => { } },
                        {
                            text: 'Discard',
                            style: 'destructive',
                            onPress: () => {
                                // We don't need to manually set flags here because we're just going back natively
                                // But to be safe and consistent with state updates:
                                setHasUnsavedChanges(false);
                                navigation.goBack();
                            },
                        },
                    ]
                );
                return true; // Prevent default behavior (exit app/pop)
            }
            return false; // Allow default behavior
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => {
            backHandler.remove();
            // Reset gesture enabled when unmounting or changing state
            navigation.setOptions({ gestureEnabled: true });
        };
    }, [hasUnsavedChanges, navigation]);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setHasUnsavedChanges(true);
    };

    const handleSave = () => {
        setHasUnsavedChanges(false);
        setSuccessMessage("Changes Saved Successfully!");
        // Show success modal
        setSuccessVisible(true);
    };

    const handleSuccessClose = () => {
        setSuccessVisible(false);
        // Only navigate back if we just saved the form (not photo upload)
        if (successMessage === "Changes Saved Successfully!") {
            navigation.goBack();
        }
    };

    const handleImageSelected = (uri) => {
        setAvatarUri(uri);
        setAvatarModalVisible(false);
        // We do typically save this to backend here, but for now just show success
        setSuccessMessage("Photo Uploaded Successfully!");
        setSuccessVisible(true);
    };

    // Manual Back Button Handler (UI Header Button)
    const handleBackPress = () => {
        if (hasUnsavedChanges) {
            Alert.alert(
                'Discard changes?',
                'You have unsaved changes. Are you sure you want to discard them and leave the screen?',
                [
                    { text: "Don't leave", style: 'cancel', onPress: () => { } },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        onPress: () => {
                            setHasUnsavedChanges(false);
                            navigation.goBack();
                        },
                    },
                ]
            );
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <SuccessModal
                visible={successVisible}
                message={successMessage}
                onClose={handleSuccessClose}
            />

            <AvatarUploadModal
                visible={avatarModalVisible}
                onClose={() => setAvatarModalVisible(false)}
                onImageSelected={handleImageSelected}
            />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleBackPress}
                    style={styles.backBtn}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Personal Info</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Avatar Section */}
                <View style={styles.avatarSection}>
                    <TouchableOpacity
                        style={styles.avatarContainer}
                        activeOpacity={0.8}
                        onPress={() => setAvatarModalVisible(true)}
                    >
                        {avatarUri ? (
                            <Image
                                source={{ uri: avatarUri }}
                                style={styles.avatarImage}
                            />
                        ) : (
                            <LinearGradient
                                colors={["#2D9CDB", "#8B5CF6"]}
                                style={styles.avatarGradient}
                            >
                                <View style={styles.avatarInner}>
                                    <Text style={styles.avatarText}>AJ</Text>
                                </View>
                            </LinearGradient>
                        )}
                        <View style={styles.editBadge}>
                            <Ionicons name="camera" size={14} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.helperText}>Tap to change photo</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <InputField
                        label="Full Name"
                        value={form.name}
                        onChangeText={(text) => handleChange("name", text)}
                        icon="person"
                    />
                    <InputField
                        label="Email Address"
                        value={form.email}
                        onChangeText={(text) => handleChange("email", text)}
                        icon="mail"
                    />
                    <InputField
                        label="Phone Number"
                        value={form.phone}
                        onChangeText={(text) => handleChange("phone", text)}
                        icon="call"
                    />
                    <InputField
                        label="Occupation"
                        value={form.occupation}
                        onChangeText={(text) => handleChange("occupation", text)}
                        icon="briefcase"
                    />
                </View>

                <TouchableOpacity
                    style={[styles.saveBtn, !hasUnsavedChanges && styles.saveBtnDisabled]}
                    onPress={handleSave}
                    disabled={!hasUnsavedChanges}
                >
                    <LinearGradient
                        colors={hasUnsavedChanges ? ["#2D9CDB", "#3B82F6"] : ["#374151", "#4B5563"]}
                        style={styles.saveBtnGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={[styles.saveBtnText, !hasUnsavedChanges && { color: "#9CA3AF" }]}>Save Changes</Text>
                    </LinearGradient>
                </TouchableOpacity>
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

    avatarSection: {
        alignItems: "center",
        marginBottom: 32,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 12,
    },
    avatarGradient: {
        width: 100,
        height: 100,
        borderRadius: 50,
        padding: 3,
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#2D9CDB",
    },
    avatarInner: {
        flex: 1,
        backgroundColor: "#111827",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
    },
    editBadge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#3B82F6",
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#05070a",
    },
    helperText: {
        color: "#6B7280",
        fontSize: 13,
    },

    /* Form */
    form: {
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: "#9CA3AF",
        fontSize: 13,
        marginBottom: 8,
        fontWeight: "500",
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#111827",
        borderRadius: 16,
        padding: 4,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
    },
    iconBox: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        flex: 1,
        color: "#fff",
        fontSize: 15,
        paddingHorizontal: 8,
        height: 44,
    },

    /* Button */
    saveBtn: {
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#3B82F6",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    saveBtnDisabled: {
        shadowOpacity: 0,
    },
    saveBtnGradient: {
        paddingVertical: 16,
        alignItems: "center",
    },
    saveBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
