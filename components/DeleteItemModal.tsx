import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

function DeleteItemModal({ isVisible, onClose, item, onDelete }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Are you sure you want to delete{" "}
            <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>?
          </Text>
          <View style={styles.modalButtonContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                onDelete(item);
              }}
            >
              <Text style={styles.buttonText}>Delete</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#1f2937",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#e0f2fe",
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: "#1e3a8a",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "#dbeafe",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DeleteItemModal;
