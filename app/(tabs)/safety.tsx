import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Header from "@/app/header";
import TabSwitcher from "@/app/tabSwitcher";
import { useThemeContext } from '../../hooks/themeContext';

export default function SteamGuard() {
    const [activeTab, setActiveTab] = useState('openChats');
    const { theme, toggleTheme } = useThemeContext();

    return (

        <View style={{backgroundColor: theme.colors.background}}>
            <Header />
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>


                <TabSwitcher
                    firstTabText="Guard"
                    secondTabText="Confirmations"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <View style={[styles.container,{backgroundColor: theme.colors.background}]}>
                    <ImageBackground
                        source={require('../../assets/images/partial-react-logo.png')}
                        style={[styles.backgroundImage, { backgroundColor: theme.colors.card }]}
                    >
                        <View style={[styles.centered]}>
                            <Text style={[styles.header, { color: theme.colors.text }]}>Logged in as player</Text>
                                                        <Text style={[styles.code, { color: theme.colors.text }]}>N5KCV</Text>
                            <View style={styles.progressBarContainer}>
                                <View style={[styles.progressBar, { backgroundColor: theme.colors.accent }]} />
                            </View>
                        </View>
                    </ImageBackground>

                    <Text style={[styles.description, { color: theme.colors.secondaryText }]}>
                        You’ll enter your code each time you enter your password to sign in to your Steam account.
                    </Text>
                    <Text style={[styles.tip, { color: theme.colors.accent }]}>
                        Tip: If you don’t share your PC, you can select "Remember my password" when you sign in to the PC client
                        to enter your password and authenticator code less often.
                    </Text>

                  <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.card }]}>
                      <Text style={[styles.buttonText, { color: '#fff' }]}>Remove Authenticator</Text>
                      <Text style={[styles.buttonText, { color: '#fff' }]}> &gt; </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.card }]}>
                      <Text style={[styles.buttonText, { color: '#fff' }]}>My Recovery Code</Text>
                      <Text style={[styles.buttonText, { color: '#fff' }]}> &gt; </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.card }]} onPress={toggleTheme}>
                      <Text style={[styles.buttonText, { color: '#fff' }]}>Help</Text>
                      <Text style={[styles.buttonText, { color: '#fff' }]}> &gt; </Text>
                  </TouchableOpacity>
                </View>
            </View>
        </View>


    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 16,
        marginBottom: 10,
        color: '#fff',
    },
    code: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    progressBarContainer: {
        width: '80%',
        height: 5,
        borderRadius: 5,
        marginVertical: 10,
    },
    progressBar: {
        width: '50%',
        height: '100%',
        borderRadius: 5,
    },
    description: {
        textAlign: 'left',
        fontSize: 14,
        marginBottom: 10,
        color: '#fff',
    },
    tip: {
        textAlign: 'left',
        fontSize: 12,
        marginBottom: 20,
        color: '#fff',
    },
    button: {
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
    backgroundImage: {
        width: 500,
        height: 302,
        marginBottom: 10,
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
