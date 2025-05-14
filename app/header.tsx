import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import { useThemeContext } from '../hooks/themeContext';

export default function Header() {
    const pathname = usePathname();
    const { theme } = useThemeContext();


    const formattedTitle = pathname.replace('/', '').toUpperCase() || 'STORE';

    return (
        <View style={[styles.headerContainer, { backgroundColor: theme.colors.background }]}>
            <View style={styles.flex}>
                <Image
                    source={require('../assets/images/Steam.png')}
                    style={styles.logo}
                />
                <Text style={[styles.pageTitle, { color: theme.colors.text }]}>{formattedTitle}</Text>
            </View>

            <TouchableOpacity style={styles.searchButton}>
                <Feather name="search" size={24} color={theme.colors.text} />
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'transparent',
    },
    logo: {
        width: 100,
        height: 40,
        resizeMode: 'contain',
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        textTransform: 'capitalize',
    },
    searchButton: {
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
};
