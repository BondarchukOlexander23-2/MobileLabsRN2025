import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { auth } from "../firebase/config";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const db = getFirestore();

function ProfileScreen({ navigation }) {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [school, setSchool] = useState("");
  const [hobby, setHobby] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name || "");
          setAge(userData.age || "");
          setCity(userData.city || "");
          setSchool(userData.school || "");
          setHobby(userData.hobby || "");
        } else {
          Alert.alert("Помилка", "Дані не знайдено!");
        }
      } catch (error) {
        Alert.alert("Помилка", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      navigation.replace("Login");
    }
  };

  const updateUserData = async () => {
    if (!name || !age || !city || !school || !hobby) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля.");
      return;
    }

    if (user) {
      const userRef = doc(db, "users", user.uid);
      try {
        await setDoc(
          userRef,
          {
            name,
            age,
            city,
            school,
            hobby,
          },
          { merge: true }
        );
        Alert.alert("Успіх", "Дані оновлено!");
      } catch (error) {
        Alert.alert("Помилка", error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ecc71" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ваш Профіль</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ім'я:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ваше ім'я"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Вік:</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Ваш вік"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Місто:</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Ваше місто"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Навчальний заклад:</Text>
        <TextInput
          style={styles.input}
          value={school}
          onChangeText={setSchool}
          placeholder="Назва навчального закладу"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Хобі:</Text>
        <TextInput
          style={styles.input}
          value={hobby}
          onChangeText={setHobby}
          placeholder="Ваші хобі"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, styles.saveButton]}
        onPress={updateUserData}
      >
        <Text style={styles.buttonText}>Зберегти зміни</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => navigation.replace("Logout")}
      >
        <Text style={styles.buttonText}>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#2ecc71",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
  },
});

export default ProfileScreen;
