import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

// Default Theme
const defaultColors = {
    primary: "#2563EB",  // Blue
    secondary: "#8B5CF6", // Purple
    background: "#05070a",
    card: "#111827",
    text: "#FFFFFF",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [colors, setColors] = useState(defaultColors);

    // Load saved theme on mount
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedPrimary = await AsyncStorage.getItem("theme_primary");
                const savedSecondary = await AsyncStorage.getItem("theme_secondary");

                if (savedPrimary && savedSecondary) {
                    setColors((prev) => ({
                        ...prev,
                        primary: savedPrimary,
                        secondary: savedSecondary,
                    }));
                }
            } catch (e) {
                console.log("Failed to load theme", e);
            }
        };
        loadTheme();
    }, []);

    const updateTheme = async (newPrimary, newSecondary) => {
        const newColors = {
            ...colors,
            primary: newPrimary,
            secondary: newSecondary,
        };
        setColors(newColors);
        try {
            await AsyncStorage.setItem("theme_primary", newPrimary);
            await AsyncStorage.setItem("theme_secondary", newSecondary);
        } catch (e) {
            console.log("Failed to save theme", e);
        }
    };

    const resetTheme = async () => {
        setColors(defaultColors);
        try {
            await AsyncStorage.removeItem("theme_primary");
            await AsyncStorage.removeItem("theme_secondary");
        } catch (e) {
            console.log("Failed to reset theme", e);
        }
    };

    return (
        <ThemeContext.Provider value={{ colors, updateTheme, resetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
