import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GameProvider } from "../../components/GameContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Додаємо імпорт

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {}
      <GameProvider>
        <Tabs
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === "MainScreen") {
                return <Icon name="gesture-tap" size={size} color={color} />;
              } else if (route.name === "TasksScreen") {
                return (
                  <Icon name="view-grid-outline" size={size} color={color} />
                );
              }
            },
            tabBarActiveTintColor: "#2196F3",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          })}
        />
      </GameProvider>
    </GestureHandlerRootView>
  );
}