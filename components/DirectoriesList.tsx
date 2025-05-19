import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import DeleteItemModal from "./DeleteItemModal";
import InfoFileModal from "./InfoFileModal";

function DirectoriesList({
  directoryPath,
  changeActiveDirectory,
  refreshTrigger,
  navigation,
}) {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const parentDirectory = getParentDirectory(directoryPath);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        const names = await FileSystem.readDirectoryAsync(directoryPath);
        const itemsWithType = await Promise.all(
          names.map(async (name) => {
            const fullPath = directoryPath + "/" + name;
            const info = await FileSystem.getInfoAsync(fullPath);

            return {
              name,
              info,
            };
          })
        );
        setItems(itemsWithType);
      } catch (error) {
        console.error("Error reading directory:", error);
      }
    };

    fetchDirectories();
  }, [directoryPath, refreshTrigger]);

  function deleteItem(item) {
    const fullPath = directoryPath + "/" + item.name;
    FileSystem.deleteAsync(fullPath, { idempotent: true })
      .then(() => {
        setItems((prevItems) => prevItems.filter((i) => i.name !== item.name));
        setActiveItem(null);
        setIsDeleteModalVisible(false);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  }

  function getParentDirectory(directoryPath) {
    const appDataPath = FileSystem.documentDirectory;

    const normalized = directoryPath.endsWith("/")
      ? directoryPath.slice(0, -1)
      : directoryPath;

    const parentPath = normalized.substring(0, normalized.lastIndexOf("/") + 1);

    if (
      !parentPath ||
      parentPath.length <= appDataPath.length ||
      !parentPath.startsWith(appDataPath)
    ) {
      return null;
    }

    return parentPath;
  }

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => {
          item.info.isDirectory
            ? changeActiveDirectory(item.info.uri)
            : navigation.navigate("EditFile", {
                fileUri: item.info.uri,
                fileName: item.name,
              });
        }}
      >
        <Text style={styles.buttonText}>
          {item.name} {item.info.isDirectory ? "📁" : "📄"}
        </Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.buttonAction,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => {
          setActiveItem(item);
          setIsInfoModalVisible(true);
        }}
      >
        <Entypo name={"info-with-circle"} size={22} color={"white"} />
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.buttonAction,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => {
          setActiveItem(item);
          setIsDeleteModalVisible(true);
        }}
      >
        <Entypo name={"circle-with-cross"} size={22} color={"red"} />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      {parentDirectory && (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => {
            changeActiveDirectory(parentDirectory);
          }}
        >
          <Entypo name={"level-up"} size={22} color={"black"} />
        </Pressable>
      )}
      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      {activeItem && (
        <View>
          <InfoFileModal
            isVisible={isInfoModalVisible}
            onClose={() => {
              setIsInfoModalVisible(false);
              setActiveItem(null);
            }}
            item={activeItem}
          />
          <DeleteItemModal
            isVisible={isDeleteModalVisible}
            onClose={() => {
              setIsDeleteModalVisible(false);
              setActiveItem(null);
            }}
            onDelete={deleteItem}
            item={activeItem}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#0f172a",
  },
  button: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonAction: {
    backgroundColor: "#1e40af",
    paddingHorizontal: 8,
  },
  buttonText: {
    color: "#dbeafe",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#1f2937",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#e0f2fe",
  },
  modalButtonContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#ef4444",
  },
});


export default DirectoriesList;