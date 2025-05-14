import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

const DarkBlueTheme = {
    ...NavigationDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        primary: '#0D47A1',
        background: '#001933',
        card: '#101e30',
        text: '#FFFFFF',
        border: '#0c214c',
        notification: '#00234c',
        accent: '#E10075',
        secondaryText: '#BBBBBB',
        like: '#32CD32',
    },
};

const LightTheme = {
    ...NavigationDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        primary: '#0D47A1',
        background: '#FFFFFF',
        card: '#f5f5f5',
        text: '#000000',
        border: '#dcdcdc',
        notification: '#e6f7ff',
        accent: '#E10075',
        secondaryText: '#7A7A7A',
        like: '#32CD32',
    },
};

type ThemeContextType = {
    theme: typeof DarkBlueTheme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState(DarkBlueTheme);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === DarkBlueTheme ? LightTheme : DarkBlueTheme));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
