import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";

function FileCreateModal({ isVisible, onClose, context }) {
  const { activeDirectory, refresh, setRefresh } = context;

  const [newFileName, setNewFileName] = useState("");
  const [newFileContent, setNewFileContent] = useState("");

  const createTextFile = async () => {
    if (!newFileName) {
      Alert.alert("❌ Error", "Enter file name");
      return;
    }

    const fileName = newFileName.endsWith(".txt")
      ? newFileName
      : `${newFileName}.txt`;
    const fullPath = `${activeDirectory}/${fileName}`;

    try {
      await FileSystem.writeAsStringAsync(
        fullPath,
        newFileContent || "New File."
      );
      setNewFileName("");
      setNewFileContent("");
      onClose();
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error creating file:", error);
      Alert.alert("❌ Error", "error creating file");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create new file</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter file name"
            placeholderTextColor="#94a3b8"
            value={newFileName}
            onChangeText={setNewFileName}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.input, styles.contentInput]}
            placeholder="File content"
            placeholderTextColor="#94a3b8"
            value={newFileContent}
            onChangeText={setNewFileContent}
            multiline
            textAlignVertical="top"
          />

          <View style={styles.modalButtonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.cancelButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={createTextFile}
            >
              <Text style={styles.buttonText}>Create</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.85)", // темний напівпрозорий фон
  },
  modalContent: {
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 16,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#f472b6",
    textShadowColor: "#0f172a",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#475569",
    backgroundColor: "#0f172a",
    color: "#e2e8f0",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 18,
    fontWeight: "500",
  },
  contentInput: {
    height: 120,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 14,
  },
  button: {
    flex: 1,
    backgroundColor: "#6366f1",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#4338ca",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 8,
  },
  cancelButton: {
    backgroundColor: "#ef4444",
    shadowColor: "#b91c1c",
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "#dbeafe",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FileCreateModal;
