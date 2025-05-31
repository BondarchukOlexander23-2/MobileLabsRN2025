import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";

const AuthScreen = ({ navigation }) => {
  const { setLoggedInUser } = useAuth();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  const updateField = (field, value) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };

  const loginUser = async () => {
    setIsSubmitting(true);
    setAuthError("");

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      setLoggedInUser(result.user);
      navigation.navigate("Profile");
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Sign In</Text>

      <TextInput
        style={styles.textField}
        placeholder="Email address"
        keyboardType="email-address"
        value={credentials.email}
        onChangeText={(val) => updateField("email", val)}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.textField}
        placeholder="Password"
        secureTextEntry
        value={credentials.password}
        onChangeText={(val) => updateField("password", val)}
      />

      {authError.length > 0 && (
        <Text style={styles.errorMessage}>{authError}</Text>
      )}

      <Button
        title={isSubmitting ? "Signing in..." : "Sign In"}
        onPress={loginUser}
        disabled={isSubmitting}
        color="#3baf4a"
      />

      <View style={styles.spacer} />

      <Button
        title="Create Account"
        onPress={() => navigation.navigate("SignUp")}
        color="#1e88e5"
      />

      <View style={styles.spacer} />

      <Button
        title="Forgot Password?"
        onPress={() => navigation.navigate("ResetPass")}
        color="#f44336"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  header: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 25,
    textAlign: "center",
  },
  textField: {
    height: 45,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  errorMessage: {
    color: "#d32f2f",
    marginBottom: 12,
    textAlign: "center",
  },
  spacer: {
    marginVertical: 10,
  },
});

export default AuthScreen;
