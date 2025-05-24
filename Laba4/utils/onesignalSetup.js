import { OneSignal, LogLevel } from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_ID = '50c1eec8-f116-40e2-b1ff-c25fdf277b97';
const EXTERNAL_ID = 'ipz232boo';

export const setupOneSignal = () => {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(APP_ID);
  OneSignal.Notifications.requestPermission(true);
  OneSignal.Notifications.addEventListener("foregroundWillDisplay", (e) => {
    e.preventDefault();
    e.notification.display();
  });
  OneSignal.login(EXTERNAL_ID);
  OneSignal.User.pushSubscription.optIn();
  AsyncStorage.setItem("externalId", EXTERNAL_ID);
};
