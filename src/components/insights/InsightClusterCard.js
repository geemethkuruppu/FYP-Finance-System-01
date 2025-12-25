import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

export default function InsightClusterCard({ distribution, totalClusters }) {
    if (!distribution) return null;

    // Process data for chart
    const clusters = Object.entries(distribution)
        .map(([id, count]) => ({ id, count }))
        .sort((a, b) => b.count - a.count);

    const total = clusters.reduce((sum, item) => sum + item.count, 0);

    // Chart Configuration
    const size = 160;
    const strokeWidth = 20;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    // Colors for clusters (limit to top 4 + 'others' concept if needed, but for now map directly)
    const COLORS = ["#F59E0B", "#3B82F6", "#10B981", "#EC4899", "#8B5CF6"];

    let currentAngle = -90; // Start from top

    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <View style={styles.iconBox}>
                    <Ionicons name="pie-chart" size={20} color="#F59E0B" />
                </View>
                <View>
                    <Text style={styles.title}>Spending Clusters</Text>
                    <Text style={styles.subtitle}>Behavioral Groups</Text>
                </View>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalClusters} Found</Text>
                </View>
            </View>

            <View style={styles.contentContainer}>
                {/* Donut Chart */}
                <View style={styles.chartContainer}>
                    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                        <G rotation={0} origin={`${center}, ${center}`}>
                            {clusters.map((cluster, index) => {
                                const percentage = cluster.count / total;
                                const strokeDashoffset = circumference - (circumference * percentage);
                                const angle = (cluster.count / total) * 360;
                                const color = COLORS[index % COLORS.length];

                                const path = (
                                    <Circle
                                        key={cluster.id}
                                        cx={center}
                                        cy={center}
                                        r={radius}
                                        stroke={color}
                                        strokeWidth={strokeWidth}
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        rotation={currentAngle}
                                        origin={`${center}, ${center}`}
                                        strokeLinecap="round" // Optional: makes ends rounded
                                    />
                                );

                                currentAngle += angle;
                                return path;
                            })}
                        </G>
                    </Svg>
                    {/* Absolute positioning for center text doesn't work well inside SVG on RN sometimes, using overlay */}
                    <View style={styles.absoluteCenter}>
                        <Text style={styles.centerValue}>{total}</Text>
                        <Text style={styles.centerLabel}>Items</Text>
                    </View>
                </View>

                {/* Legend */}
                <View style={styles.legendContainer}>
                    {clusters.map((cluster, index) => (
                        <View key={cluster.id} style={styles.legendItem}>
                            <View style={[styles.dot, { backgroundColor: COLORS[index % COLORS.length] }]} />
                            <Text style={styles.legendText}>
                                Group {cluster.id} <Text style={styles.legendCount}>({cluster.count})</Text>
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Groups based on similar spending behavior.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(255,255,255,0.03)",
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
        marginTop: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "rgba(245, 158, 11, 0.15)", // Amber
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    title: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    subtitle: {
        color: "#9CA3AF",
        fontSize: 12,
        marginTop: 2,
    },
    badge: {
        marginLeft: "auto",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(245, 158, 11, 0.3)",
    },
    badgeText: {
        color: "#F59E0B",
        fontSize: 12,
        fontWeight: "700",
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
    },
    chartContainer: {
        width: 160,
        height: 160,
        alignItems: "center",
        justifyContent: "center",
        position: 'relative',
    },
    absoluteCenter: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerValue: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "800",
    },
    centerLabel: {
        color: "#9CA3AF",
        fontSize: 12,
        textTransform: "uppercase",
    },
    legendContainer: {
        flex: 1,
        gap: 12,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    },
    legendText: {
        color: "#D1D5DB",
        fontSize: 13,
        fontWeight: "500",
    },
    legendCount: {
        color: "#9CA3AF",
        fontWeight: "normal",
    },
    footer: {
        marginTop: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.05)",
    },
    footerText: {
        color: "#6B7280",
        fontSize: 12,
        fontStyle: "italic",
    },
});
