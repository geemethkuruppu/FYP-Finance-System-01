import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabButton = ({ state, descriptors, navigation, route, index }) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;
    const scale = useSharedValue(1);

    // Bounce animation on focus
    useEffect(() => {
        if (isFocused) {
            scale.value = withSpring(1.1);
        } else {
            scale.value = withSpring(1);
        }
    }, [isFocused]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    const onPress = () => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    };

    const iconName = options.tabBarIconName || "square";

    return (
        <Pressable
            onPress={onPress}
            className="flex-1 items-center justify-center py-2"
        >
            <Animated.View style={animatedStyle} className={`items-center px-4 py-2 rounded-2xl ${isFocused ? 'bg-cyan-500/20' : 'bg-transparent'}`}>
                <Ionicons
                    name={isFocused ? iconName : `${iconName}-outline`}
                    size={24}
                    color={isFocused ? '#2D9CDB' : '#64748b'}
                />
                {isFocused && (
                    <Text className="text-[10px] text-[#2D9CDB] font-medium mt-1">
                        {route.name}
                    </Text>
                )}
            </Animated.View>
        </Pressable>
    );
};

export default function CustomTabBar(props) {
    const insets = useSafeAreaInsets();

    return (
        <View className="absolute bottom-0 w-full items-center">
            {/* Glassmorphic Container - Deep Navy */}
            <View
                className="flex-row bg-[#0A0F1F]/95 border-t border-[#2D9CDB]/20 w-full justify-around items-center"
                style={{
                    paddingBottom: Platform.OS === 'ios' ? insets.bottom : 16,
                    paddingTop: 12,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    // Simple shadow for depth
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 10,
                }}
            >
                {props.state.routes.map((route, index) => (
                    <TabButton
                        key={route.key}
                        {...props}
                        route={route}
                        index={index}
                    />
                ))}
            </View>
        </View>
    );
}
