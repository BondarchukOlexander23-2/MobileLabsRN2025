import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";

const RegisterScreen = ({ navigation }) => {
  const { setLoggedInUser } = useAuth();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [message, setMessage] = useState(null);

  const registerAccount = async () => {
    if (!emailValue || !passwordValue) {
      setMessage("Будь ласка, заповніть всі поля.");
      return;
    }

    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );
      setLoggedInUser(userData.user);
      navigation.navigate("Login");
    } catch (err) {
      setMessage("Помилка: " + err.message);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Реєстрація</Text>

      <TextInput
        style={styles.input}
        placeholder="Ваша електронна адреса"
        value={emailValue}
        onChangeText={setEmailValue}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Створіть пароль"
        secureTextEntry
        value={passwordValue}
        onChangeText={setPasswordValue}
      />

      {message && <Text style={styles.warning}>{message}</Text>}

      <TouchableOpacity style={styles.registerBtn} onPress={registerAccount}>
        <Text style={styles.btnText}>Зареєструватися</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backToLogin}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.btnText}>Увійти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#eef2f3",
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  warning: {
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 10,
  },
  registerBtn: {
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  backToLogin: {
    backgroundColor: "#2980b9",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default RegisterScreen;
