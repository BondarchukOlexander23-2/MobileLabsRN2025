import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import * as FileSystem from "expo-file-system";
import DirectoriesList from "../components/DirectoriesList";
import FolderCreateModal from "../components/FolderCreateModal";
import FileCreateModal from "../components/FileCreateModal";
import { useNavigation } from "@react-navigation/native";

const directoryPath = FileSystem.documentDirectory + "AppData";

function FilesScreen() {
  const [activeDirectory, setActiveDirectory] = useState(directoryPath);
  const [refresh, setRefresh] = useState(true);
  const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
  const [isFileModalVisible, setIsFileModalVisible] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current directory:</Text>
      <Text style={styles.path}>{activeDirectory}</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => setIsFolderModalVisible(true)}
        >
          <Text style={styles.buttonText}>📁 Create folder</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => setIsFileModalVisible(true)}
        >
          <Text style={styles.buttonText}>📄 Create file</Text>
        </Pressable>
      </View>

      <FolderCreateModal
        isVisible={isFolderModalVisible}
        onClose={() => setIsFolderModalVisible(false)}
        context={{
          activeDirectory,
          refresh,
          setRefresh,
        }}
      />

      <FileCreateModal
        isVisible={isFileModalVisible}
        onClose={() => setIsFileModalVisible(false)}
        context={{
          activeDirectory,
          refresh,
          setRefresh,
        }}
      />

      <DirectoriesList
        directoryPath={activeDirectory}
        changeActiveDirectory={setActiveDirectory}
        refreshTrigger={refresh}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#0f172a",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f472b6",
    marginBottom: 6,
    textShadowColor: "#0f172a",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 10,
  },
  path: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6366f1",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#4338ca",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  buttonPressed: {
    backgroundColor: "#4338ca",
  },
  buttonText: {
    color: "#dbeafe",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FilesScreen;
