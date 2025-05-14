import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';

interface ButtonItem {
    label: string;
}

interface ButtonListProps {
    buttons: ButtonItem[];
}

const ButtonList: React.FC<ButtonListProps> = ({ buttons }) => {
    const [pressedButtonIndex, setPressedButtonIndex] = useState<number | null>(null);

    const handlePress = (index: number) => {
        setPressedButtonIndex(index);
    };

    return (
        <ScrollView
            horizontal
            contentContainerStyle={styles.buttonListContainer}
            showsHorizontalScrollIndicator={false}
        >
            {buttons.map((button, index) => (
                <View key={index} style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            {
                                backgroundColor:
                                    pressedButtonIndex === index ? '#0078FF' : '#E0E0E0',
                            },
                        ]}
                        onPress={() => handlePress(index)}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                {
                                    color:
                                        pressedButtonIndex === index ? '#fff' : '#333',
                                },
                            ]}
                        >
                            {button.label}
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    buttonListContainer: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    buttonContainer: {
        flexShrink: 0,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        minWidth: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '600',
    },
});

export default ButtonList;
