import React from 'react';
import { ThemeProvider, useThemeContext } from '../hooks/themeContext';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Profile from "@/app/(tabs)/profile";

export default function RootLayout() {
  return (
      <ThemeProvider >
        <MainLayout />
      </ThemeProvider>
  );
}

function MainLayout() {
  const { theme } = useThemeContext();

  return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen  name="(tabs)" />
        <StatusBar style={theme.colors.text === '#FFFFFF' ? 'light' : 'dark'} />
      </Stack>
  );
}
