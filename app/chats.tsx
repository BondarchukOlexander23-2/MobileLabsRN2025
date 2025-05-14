import { Image, StyleSheet, View, Text, FlatList } from 'react-native';
import { useState } from 'react';
import Header from "@/app/header";
import TabSwitcher from "@/app/tabSwitcher";
import { useThemeContext } from '../hooks/themeContext';

const chats = [
    { id: 1, name: 'Petro Dudka', message: "I'm already starting to play", date: '14 Jun', avatar: require('../assets/images/user1.jpg'), status: 'online' },
    { id: 2, name: 'Mad Max', message: 'Ok', date: '11 Feb', avatar: require('../assets/images/user2.jpg'), status: 'offline' },
    { id: 3, name: 'Pepejan', message: 'Ok', date: '16 Jul', avatar: require('../assets/images/user3.jpg'), status: 'offline' },
    { id: 4, name: 'Aligator', message: 'Ok', date: '14 Oct', avatar: require('../assets/images/user4.jpg'), status: 'offline' },
    { id: 5, name: 'Godbless', message: 'Hello!', date: '12 Feb', avatar: require('../assets/images/user5.jpg'), status: 'offline' },

    { id: 7, name: 'Yolo', message: 'Ok', date: '12 Mar', avatar: require('../assets/images/user1.jpg'), status: 'online' },
    { id: 8, name: 'Nipl', message: 'Ok', date: '12 Mar', avatar: require('../assets/images/user2.jpg'), status: 'online' },
    { id: 9, name: 'Jojo', message: 'Ok', date: '12 Mar', avatar: require('../assets/images/user3.jpg'), status: 'online' },
    { id: 10, name: 'Minimishka', message: 'Ok', date: '12 Mar', avatar: require('../assets/images/user4.jpg'), status: 'online' },
    { id: 11, name: 'Kola', message: 'Ok', date: '12 Mar', avatar: require('../assets/images/user5.jpg'), status: 'online' },
];

export default function Chat() {
    const [activeTab, setActiveTab] = useState('openChats');
    const { theme } = useThemeContext();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Header />

            <TabSwitcher
                firstTabText="Open chats"
                secondTabText="My friends"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <FlatList
                data={chats}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.chatItem}>
                        <Image source={item.avatar} style={styles.avatar} />
                        <View style={styles.textContainer}>
                            <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
                            <Text style={[styles.message, { color: theme.colors.text }]}>{item.message} • {item.date}</Text>
                        </View>
                        {item.status === 'online' && <View style={styles.statusIndicator} />}
                    </View>
                )}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 14,
    },
    statusIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'green',
    },
    flatListContainer: {
        paddingBottom: 16,
    },
});
