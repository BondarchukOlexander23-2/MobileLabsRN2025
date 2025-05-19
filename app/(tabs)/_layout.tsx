import { Slot } from "expo-router";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";

export default function Layout() {
    return (
        <>
            <Tabs
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName: keyof typeof AntDesign.glyphMap = "home";
                        if (route.name === "index") iconName = "home";
                        else if (route.name === "Directory") iconName = "inbox";
                        return <AntDesign name={iconName} size={size} color={color} />;
                    },
                    tabBarStyle: {
                        backgroundColor: "#1f2937",
                        borderTopWidth: 0,
                    },
                    tabBarActiveTintColor: "#dbeafe",
                    tabBarInactiveTintColor: "#94a3b8",
                    tabBarLabelStyle: {
                        fontWeight: "600",
                    },
                })}
            />
            <StatusBar style="auto" />
        </>
    );
}
