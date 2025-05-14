import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';


interface TabSwitcherProps {
    firstTabText: string;
    secondTabText: string;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}


const TabSwitcher: React.FC<TabSwitcherProps> = ({ firstTabText, secondTabText, activeTab, setActiveTab }) => {
    return (
        <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setActiveTab('openChats')}>
                <Text style={[styles.tab, activeTab === 'openChats' && styles.activeTab]}>
                    {firstTabText}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('myFriends')}>
                <Text style={[styles.tab, activeTab === 'myFriends' && styles.activeTab]}>
                    {secondTabText}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#e0e6f0',
        padding: 8,
        borderRadius: 12,
    },
    tab: {
        fontSize: 16,
        color: '#555',
        width: 160,
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#3478f6',
        color: '#fff',
    },
});

export default TabSwitcher;
