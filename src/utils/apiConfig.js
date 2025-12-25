import Constants from "expo-constants";

const getBaseUrl = () => {
    // 1. If explicitly defined in environment variables, use it.
    if (process.env.EXPO_PUBLIC_API_URL) {
        return process.env.EXPO_PUBLIC_API_URL;
    }

    // 2. In development (Expo Go), dynamically get the host machine's IP.
    if (__DEV__) {
        const debuggerHost = Constants.expoConfig?.hostUri;
        const localhost = debuggerHost?.split(":")[0];

        if (localhost) {
            // Check if we are on Android Emulator which calls for 10.0.2.2 usually, 
            // but fetching the debuggerHost is often the safest bet for LAN/Wireless usage.
            // If using standard emulator matching, 10.0.2.2 might be better for Android specifically 
            // but the LAN IP (localhost) works if the backend listens on 0.0.0.0.
            return `http://${localhost}:8000`;
        }
    }

    // 3. Fallback for unexpected cases or emulators if hostUri is missing
    // For Android Emulator: 10.0.2.2
    // For iOS Simulator: 127.0.0.1
    // We return localhost as a default default
    return "http://127.0.0.1:8000";
};

export const API_URL = getBaseUrl();
