import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useThemeContext } from '../../hooks/themeContext';  // Імпортуємо контекст теми

export default function TabLayout() {
    const { theme } = useThemeContext();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.text,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: {
                    backgroundColor: theme.colors.card,
                    position: Platform.OS === 'ios' ? 'absolute' : 'relative',
                },
                tabBarLabelStyle: {
                    padding: 10,
                },
            }}>
            <Tabs.Screen
                name=""
                options={{
                    tabBarIcon: ({ color }) => <Icon size={28} name="shopping-bag" color={color} />,
                }}
            />
            <Tabs.Screen
                name=""
                options={{
                    tabBarIcon: ({ color }) => <Icon size={28} name="person" color={color} />,
                }}
            />
            <Tabs.Screen
                name=""
                options={{
                    tabBarIcon: ({ color }) => <Feather size={28} name="message-circle" color={color} />,
                }}
            />
            <Tabs.Screen
                name=""
                options={{
                    tabBarIcon: ({ color }) => <Icon size={28} name="shield" color={color} />,
                }}
            />
            <Tabs.Screen
                name=""
                options={{
                    tabBarIcon: ({ color }) => <Icon size={28} name="person" color={color} />,
                }}
            />
        </Tabs>
    );
}
