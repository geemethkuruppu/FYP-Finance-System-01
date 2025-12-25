import { Text, View } from "react-native";

const PlaceholderScreen = ({ title }) => (
    <View className="flex-1 bg-[#0B1220] items-center justify-center">
        <Text className="text-white text-2xl font-bold tracking-wider">{title}</Text>
        <Text className="text-gray-500 mt-2">Coming Soon</Text>
    </View>
);

export const WalletScreen = () => <PlaceholderScreen title="Wallet" />;
export const AnalyticsScreen = () => <PlaceholderScreen title="Analytics" />;
export const ProfileScreen = () => <PlaceholderScreen title="Profile" />;
