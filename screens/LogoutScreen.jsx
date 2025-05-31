import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import { auth } from "../firebase/config";

const AccountActions = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [confirmStep, setConfirmStep] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const updateCredential = (field, value) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      Alert.alert("Успішний вихід", "Ви вийшли з акаунта");
    } catch (err) {
      Alert.alert("Помилка при виході", err.message);
    }
  };

  const deleteCurrentUser = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userCredentials = EmailAuthProvider.credential(
      credentials.email,
      credentials.password
    );

    try {
      await reauthenticateWithCredential(user, userCredentials);
      await deleteUser(user);
      Alert.alert("Акаунт видалено", "Ваш акаунт було успішно видалено");
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  const resetDeletionState = () => {
    setDeleteMode(false);
    setConfirmStep(false);
    setCredentials({ email: "", password: "" });
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Керування акаунтом</Text>

      {!deleteMode && (
        <>
          <TouchableOpacity
            style={[styles.btn, styles.dangerBtn]}
            onPress={() => setDeleteMode(true)}
          >
            <Text style={styles.btnText}>Видалити акаунт</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.logoutBtn]}
            onPress={signOutUser}
          >
            <Text style={styles.btnText}>Вийти</Text>
          </TouchableOpacity>
        </>
      )}

      {deleteMode && !confirmStep && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={credentials.email}
            onChangeText={(val) => updateCredential("email", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry
            value={credentials.password}
            onChangeText={(val) => updateCredential("password", val)}
          />

          <TouchableOpacity
            style={[styles.btn, styles.primaryBtn]}
            onPress={() => setConfirmStep(true)}
          >
            <Text style={styles.btnText}>Підтвердити</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.grayBtn]}
            onPress={resetDeletionState}
          >
            <Text style={styles.btnText}>Скасувати</Text>
          </TouchableOpacity>
        </>
      )}

      {confirmStep && (
        <>
          <TouchableOpacity
            style={[styles.btn, styles.primaryBtn]}
            onPress={deleteCurrentUser}
          >
            <Text style={styles.btnText}>Підтвердити видалення акаунта</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.grayBtn]}
            onPress={resetDeletionState}
          >
            <Text style={styles.btnText}>Скасувати</Text>
          </TouchableOpacity>
        </>
      )}

      {inProgress && <Text style={styles.loadingText}>Обробка...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fcfcfc",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  btn: {
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  dangerBtn: {
    backgroundColor: "#d63031",
  },
  logoutBtn: {
    backgroundColor: "#00b894",
  },
  primaryBtn: {
    backgroundColor: "#0984e3",
  },
  grayBtn: {
    backgroundColor: "#636e72",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 10,
    color: "#555",
  },
});

export default AccountActions;
