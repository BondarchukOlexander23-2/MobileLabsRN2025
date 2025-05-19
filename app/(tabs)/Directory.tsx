import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilesScreen from "../FilesScreen";
import EditFileScreen from "../EditFileScreen";

const Stack = createNativeStackNavigator();

export default function DirectoryStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#1e293b",
                },
                headerTintColor: "#dbeafe",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                contentStyle: {
                    backgroundColor: "#0f172a",
                },
            }}
        >
            <Stack.Screen
                name="Files"
                component={FilesScreen}
                options={{ title: "Directory" }}
            />
            <Stack.Screen
                name="EditFile"
                component={EditFileScreen}
                options={{ title: "File Editing" }}
            />
        </Stack.Navigator>
    );
}