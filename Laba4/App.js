import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/Ekran';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export default function App() {
  useEffect(() => {
    // === 🔔 Expo Notifications ===
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    const requestPermissions = async () => {
      if (Device.isDevice) {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          const { status: newStatus } = await Notifications.requestPermissionsAsync();
          if (newStatus !== 'granted') {
            alert('❌ Немає дозволу на сповіщення');
          }
        }
      } else {
        alert('⚠️ Тестуйте на фізичному пристрої');
      }
    };

    requestPermissions();

    // === 🧩 OneSignal ===
    const initializeOneSignal = async () => {
      OneSignal.setAppId('50c1eec8-f116-40e2-b1ff-c25fdf277b97');

      const savedId = await AsyncStorage.getItem('externalId');
      if (!savedId) {
        const generatedId = 'ipz232boo';
        OneSignal.setExternalUserId(generatedId)
          .then(() => console.log('✅ External user ID встановлено:', generatedId))
          .catch((e) => console.error('❌ Помилка встановлення external user ID:', e));
        await AsyncStorage.setItem('externalId', generatedId);
      } else {
        OneSignal.setExternalUserId(savedId)
          .then(() => console.log('✅ External user ID встановлено:', savedId))
          .catch((e) => console.error('❌ Помилка встановлення external user ID:', e));
      }

      OneSignal.setNotificationOpenedHandler(notification => {
        console.log('🔔 Сповіщення відкрите:', notification);
      });
    };

    initializeOneSignal();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
