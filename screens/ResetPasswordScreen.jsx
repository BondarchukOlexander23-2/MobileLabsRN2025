import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";

const ResetPasswordScreen = () => {
  const [emailInput, setEmailInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigation = useNavigation();

  const resetPassword = async () => {
    if (!emailInput.trim()) {
      Alert.alert("Помилка", "Будь ласка, введіть email.");
      return;
    }

    setIsSending(true);

    try {
      await sendPasswordResetEmail(auth, emailInput);
      Alert.alert(
        "Готово!",
        "Інструкції зі скидання пароля надіслано на вашу електронну адресу."
      );
      navigation.navigate("Login");
    } catch (err) {
      const code = err.code;
      if (code === "auth/invalid-email") {
        Alert.alert("Помилка", "Неправильний email.");
      } else if (code === "auth/user-not-found") {
        Alert.alert("Помилка", "Користувач з таким email не знайдений.");
      } else {
        Alert.alert("Помилка", err.message);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Відновлення пароля</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Електронна пошта</Text>
        <TextInput
          style={styles.input}
          value={emailInput}
          onChangeText={setEmailInput}
          placeholder="Введіть ваш email"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      {isSending ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <View style={styles.buttons}>
          <Button title="Надіслати лист" onPress={resetPassword} />
          <View style={{ marginTop: 10 }}>
            <Button
              title="До сторінки входу"
              onPress={() => navigation.navigate("Login")}
              color="#7f8c8d"
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bdc3c7",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  buttons: {
    marginTop: 10,
  },
});

export default ResetPasswordScreen;
