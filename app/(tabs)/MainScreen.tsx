import { StyleSheet, View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import ClickerObject from "../../components/ClickerObject";
import { useGame } from "../../components/GameContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MainScreen = () => {
  const { score, tapUpgrades } = useGame();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TapSwap</Text>
        <View style={styles.scoreContainer}>
          <View style={styles.coinContainer}>
            <Image
              source={require("../../assets/images/react-logo.png")}
              style={styles.coinImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.scoreValue}>{Math.floor(score)}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <ClickerObject />

        <View style={styles.pointsInfoContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.pointsInfoRow}>
              <View style={styles.pointsInfoItem}>
                <Icon name="gesture-tap" size={24} color="#2196F3" />
                <Text style={styles.pointsInfoText}>
                  +{tapUpgrades.singleTap.toFixed(1)} очкок
                </Text>
              </View>

              <View style={styles.pointsInfoItem}>
                <Icon name="gesture-tap-hold" size={24} color="#03A9F4" />
                <Text style={styles.pointsInfoText}>
                  +{tapUpgrades.doubleTap.toFixed(1)} очкок
                </Text>
              </View>

              <View style={styles.pointsInfoItem}>
                <Icon name="timer-outline" size={24} color="#9C27B0" />
                <Text style={styles.pointsInfoText}>
                  +{tapUpgrades.longPress.toFixed(1)} очкок
                </Text>
              </View>

              <View style={styles.pointsInfoItem}>
                <Icon name="gesture-swipe" size={24} color="#673AB7" />
                <Text style={styles.pointsInfoText}>
                  +{tapUpgrades.swipeUpgradeValue.toFixed(1)} очкок
                </Text>
              </View>

              <View style={styles.pointsInfoItem}>
                <Icon name="gesture-spread" size={24} color="#009688" />
                <Text style={styles.pointsInfoText}>
                  +{tapUpgrades.pinchUpgradeValue.toFixed(1)} очкок
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2C",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#00BCD4",
    textTransform: "uppercase",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#263238",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#00ACC1",
  },
  coinContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#00ACC1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  coinImage: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E0F7FA",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  pointsInfoContainer: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 6,
    width: "100%",
    borderWidth: 1,
    borderColor: "#2C2C2C",
    marginBottom: 20,
  },
  pointsInfoRow: {
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  pointsInfoItem: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    width: 80,
  },
  pointsInfoText: {
    marginTop: 6,
    fontSize: 13,
    color: "#B0BEC5",
    fontWeight: "400",
    textAlign: "center",
  },
});

export default MainScreen;
