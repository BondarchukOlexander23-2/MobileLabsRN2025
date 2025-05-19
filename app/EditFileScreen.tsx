import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";

const EditFileScreen = ({ route, navigation }) => {
  const { fileUri, fileName } = route.params;
  const [content, setContent] = useState("");

  useEffect(() => {
    FileSystem.readAsStringAsync(fileUri)
      .then(setContent)
      .catch(() => {
        Alert.alert("Error", "Can't read file");
        navigation.goBack();
      });
  }, [fileUri]);

  const saveFile = async () => {
    try {
      await FileSystem.writeAsStringAsync(fileUri, content);
      Alert.alert("✅ Збережено", "File updated successfully");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("❌ Error", "Couldn't save file");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editing: {fileName}</Text>
      <TextInput
        style={styles.textArea}
        multiline
        value={content}
        onChangeText={setContent}
        textAlignVertical="top"
        placeholder="Enter text here..."
        placeholderTextColor="#94a3b8"
      />
      <Pressable style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: "#4338ca" }
        ]} onPress={saveFile}
      >
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#0f172a",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#f472b6",
    textShadowColor: "#0f172a",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 10,
    letterSpacing: 1.1,
  },
  textArea: {
    flex: 1,
    borderColor: "#334155",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    color: "#e0e7ff",
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#6366f1",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#4338ca",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  buttonText: {
    color: "#dbeafe",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default EditFileScreen;
