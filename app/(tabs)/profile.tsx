import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeContext } from '../../hooks/themeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Profile() {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.avatarContainer}>
                <Image source={require('../../assets/images/motosport.png')} style={styles.avatar} />
                <View style={[styles.statusIndicator, { backgroundColor: theme.colors.accent }]} />
            </View>

            <Text style={[styles.name, { color: theme.colors.text }]}>Bondarchuk Oleksandr</Text>
            <Text style={[styles.group, { color: theme.colors.secondaryText }]}>IPZ-23-2</Text>

            <View style={[styles.menu, { backgroundColor: theme.colors.card }]}>
                <TouchableOpacity onPress={toggleTheme} style={styles.menuItem}>
                    <Text style={[styles.menuText, { color: theme.colors.text }]}>Change Theme</Text>
                    <Icon name="color-palette-outline" size={20} color={theme.colors.text} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={[styles.menuText, { color: theme.colors.text }]}>Logout</Text>
                    <Icon name="log-out-outline" size={20} color={theme.colors.text} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    statusIndicator: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 15,
        height: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#121212',
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
        textAlign: 'center',
    },
    group: {
        fontSize: 16,
        color: '#888',
        marginBottom: 20,
        textAlign: 'center',
    },
    menu: {
        width: '90%',
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    menuItem: {
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuText: {
        fontSize: 16,
    },
});
