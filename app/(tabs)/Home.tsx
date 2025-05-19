import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import * as FileSystem from "expo-file-system";

function MainScreen() {
  const [freeSpace, setFreeSpace] = useState(null);
  const [usedSpace, setUsedSpace] = useState(null);
  const [totalSpace, setTotalSpace] = useState(null);
  const [loading, setLoading] = useState(true);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function getStorageInfo() {
      try {
        const freeBytes = await FileSystem.getFreeDiskStorageAsync();
        const totalBytes = await FileSystem.getTotalDiskCapacityAsync();
        const usedBytes = totalBytes - freeBytes;

        setFreeSpace(freeBytes);
        setUsedSpace(usedBytes);
        setTotalSpace(totalBytes);
        setLoading(false);

        const progress = usedBytes / totalBytes;
        Animated.timing(progressAnim, {
          toValue: progress,
          duration: 1000,
          useNativeDriver: false,
        }).start();

        Animated.timing(cardAnim, {
          toValue: 1,
          duration: 600,
          delay: 300,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error("Error getting storage info:", error);
        Alert.alert("Error", "error");
      }
    }

    getStorageInfo();
  }, []);

  const formatGB = (bytes) =>
    (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Storage Info</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#f43f5e" />
      ) : (
        <Animated.View
          style={[
            styles.card,
            {
              opacity: cardAnim,
              transform: [
                {
                  translateY: cardAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.label}>
            Total space: {formatGB(totalSpace)}
          </Text>
          <Text style={styles.label}>Used: {formatGB(usedSpace)}</Text>
          <Text style={styles.label}>Free: {formatGB(freeSpace)}</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.percentage}>
              {((usedSpace / totalSpace) * 100).toFixed(1)}% used
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    marginBottom: 26,
    fontWeight: "bold",
    color: "#f472b6", // рожевий акцент
    textShadowColor: "#0f172a",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 10,
    letterSpacing: 1.2,
  },
  card: {
    width: "100%",
    padding: 24,
    borderRadius: 20,
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  label: {
    fontSize: 18,
    marginVertical: 6,
    color: "#f1f5f9",
    fontWeight: "500",
  },
  progressContainer: {
    marginTop: 24,
  },
  progressBar: {
    height: 16,
    backgroundColor: "#1e293b",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#a78bfa", // фіолетовий
    borderRadius: 8,
  },
  percentage: {
    marginTop: 10,
    fontSize: 16,
    color: "#cbd5e1",
    textAlign: "right",
    fontWeight: "600",
    fontStyle: "italic",
  },
});

export default MainScreen;
