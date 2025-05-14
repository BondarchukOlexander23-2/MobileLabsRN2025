import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import TaskItem from "../../components/TaskItem";
import { useGame } from "../../components/GameContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const UpgradeItem = ({
  title,
  description,
  level,
  cost,
  onPress,
  icon,
  color,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[styles.upgradeItem, disabled && styles.upgradeItemDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={[styles.upgradeIconContainer, { backgroundColor: color + "20" }]}
      >
        <Icon name={icon} size={24} color={color} />
      </View>
      <View style={styles.upgradeContent}>
        <Text style={styles.upgradeTitle}>{title}</Text>
        <Text style={styles.upgradeDescription}>{description}</Text>
        <Text style={styles.upgradeLevel}>Рівень: {level}</Text>
      </View>
      <View style={styles.upgradeCost}>
        <Text
          style={[
            styles.upgradeCostText,
            disabled && styles.upgradeCostTextDisabled,
          ]}
        >
          {cost}
        </Text>
        <Image
          source={require("../../assets/images/react-logo.png")}
          style={styles.coinImage}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

const TasksScreen = () => {
  const { tasks, tapUpgrades, upgradeTap, score } = useGame();

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const getProgressColor = (percentage) => {
    if (percentage === 0) return "#FF0000";
    if (percentage < 25) return "#FF8000";
    if (percentage < 50) return "#FFFF00";
    if (percentage < 75) return "#00FF00";
    return "#8BC34A";
  };

  const singleTapCost = tapUpgrades.singleTapLevel * 10;
  const doubleTapCost = tapUpgrades.doubleTapLevel * 20;
  const longPressCost = tapUpgrades.longPressLevel * 30;
  const criticalClickCost = tapUpgrades.criticalClickLevel * 75;
  const comboClickCost = tapUpgrades.comboClickLevel * 100;
  const swipeUpgradeCost = tapUpgrades.swipeUpgradeLevel * 40;
  const pinchUpgradeCost = tapUpgrades.pinchUpgradeLevel * 60;

  const canUpgradeSingleTap = score >= singleTapCost;
  const canUpgradeDoubleTap = score >= doubleTapCost;
  const canUpgradeLongPress = score >= longPressCost;
  const canUpgradeCriticalClick = score >= criticalClickCost;
  const canUpgradeComboClick = score >= comboClickCost;
  const canUpgradeSwipe = score >= swipeUpgradeCost;
  const canUpgradePinch = score >= pinchUpgradeCost;

  const handleUpgrade = (type) => {
    upgradeTap(type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Завдання</Text>
        <View style={styles.scoreContainer}>
          <Image
            source={require("../../assets/images/react-logo.png")}
            style={styles.coinImage}
            resizeMode="contain"
          />
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.upgradesContainer}>
          <Text style={styles.upgradesTitle}>Покращення</Text>

          <UpgradeItem
            title="Одиночний клік"
            description={`+${(tapUpgrades.singleTap + 0.5).toFixed(
              1
            )} очків за клік`}
            level={tapUpgrades.singleTapLevel}
            cost={singleTapCost}
            icon="gesture-tap"
            color="#2196F3"
            onPress={() => handleUpgrade("singleTap")}
            disabled={!canUpgradeSingleTap}
          />

          <UpgradeItem
            title="Подвійний клік"
            description={`+${(tapUpgrades.doubleTap + 1).toFixed(
              1
            )} очків за подвійний клік`}
            level={tapUpgrades.doubleTapLevel}
            cost={doubleTapCost}
            icon="gesture-tap-hold"
            color="#03A9F4"
            onPress={() => handleUpgrade("doubleTap")}
            disabled={!canUpgradeDoubleTap}
          />

          <UpgradeItem
            title="Довге натискання"
            description={`+${(tapUpgrades.longPress + 1.5).toFixed(
              1
            )} очків за утримання`}
            level={tapUpgrades.longPressLevel}
            cost={longPressCost}
            icon="timer-outline"
            color="#9C27B0"
            onPress={() => handleUpgrade("longPress")}
            disabled={!canUpgradeLongPress}
          />

          <UpgradeItem
            title="Критичний клік"
            description={`${
              tapUpgrades.criticalClickChance
            }% шанс x${tapUpgrades.criticalClickMultiplier.toFixed(1)} очків`}
            level={tapUpgrades.criticalClickLevel}
            cost={criticalClickCost}
            icon="flash"
            color="#FF9800"
            onPress={() => handleUpgrade("criticalClick")}
            disabled={!canUpgradeCriticalClick}
          />

          <UpgradeItem
            title="Комбо клік"
            description={`+${tapUpgrades.comboClickBonus.toFixed(
              1
            )} очків за кожен клік у комбо`}
            level={tapUpgrades.comboClickLevel}
            cost={comboClickCost}
            icon="numeric"
            color="#E91E63"
            onPress={() => handleUpgrade("comboClick")}
            disabled={!canUpgradeComboClick}
          />

          <UpgradeItem
            title="Покращення свайпу"
            description={`+${tapUpgrades.swipeUpgradeValue.toFixed(
              1
            )} очків за свайп`}
            level={tapUpgrades.swipeUpgradeLevel}
            cost={swipeUpgradeCost}
            icon="gesture-swipe"
            color="#673AB7"
            onPress={() => handleUpgrade("swipeUpgrade")}
            disabled={!canUpgradeSwipe}
          />

          <UpgradeItem
            title="Покращення щипка"
            description={`+${tapUpgrades.pinchUpgradeValue.toFixed(
              1
            )} очків за щипок`}
            level={tapUpgrades.pinchUpgradeLevel}
            cost={pinchUpgradeCost}
            icon="gesture-spread"
            color="#009688"
            onPress={() => handleUpgrade("pinchUpgrade")}
            disabled={!canUpgradePinch}
          />
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.mainTasksTitle}>Основні завдання</Text>
          <Text style={styles.subtitle}>
            Виконуйте завдання, щоб отримати досягнення
          </Text>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${progressPercentage}%`,
                  backgroundColor: getProgressColor(progressPercentage),
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {completedTasks}/{totalTasks} виконано
          </Text>
        </View>

        <FlatList
          data={tasks}
          renderItem={({ item }) => <TaskItem task={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
          nestedScrollEnabled={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272727",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#00C8FF",
  },
  coinImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00C8FF",
  },
  upgradesContainer: {
    padding: 16,
    backgroundColor: "#1E1E1E",
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  upgradesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  upgradeItem: {
    flexDirection: "row",
    backgroundColor: "#2A2A2A",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  upgradeItemDisabled: {
    opacity: 0.4,
  },
  upgradeIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  upgradeContent: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  upgradeDescription: {
    fontSize: 14,
    color: "#BBBBBB",
    marginTop: 2,
  },
  upgradeLevel: {
    fontSize: 12,
    color: "#777",
    marginTop: 6,
  },
  upgradeCost: {
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#444",
    flexDirection: "row",
    alignItems: "center",
  },
  upgradeCostText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 4,
  },
  upgradeCostTextDisabled: {
    color: "#666666",
  },
  progressSection: {
    padding: 16,
    backgroundColor: "#1E1E1E",
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  mainTasksTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#BBBBBB",
    marginBottom: 14,
  },
  progressContainer: {
    height: 10,
    backgroundColor: "#333",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: "#AAAAAA",
    textAlign: "right",
  },
  listContent: {
    padding: 16,
    backgroundColor: "#121212",
  },
  taskContainer: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: "flex-start",
    backgroundColor: "#1E1E1E",
  },
  taskIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#2C2C2C",
  },
  taskIcon: {
    fontSize: 20,
    color: "#000000",
  },
  taskContentContainer: {
    flex: 1,
  },
  taskTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FAFAFA",
    flex: 1,
  },
  taskExpandButton: {
    padding: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: "#BDBDBD",
    marginBottom: 8,
  },
  taskInstructionsContainer: {
    overflow: "hidden",
    marginBottom: 8,
  },
  taskInstructions: {
    fontSize: 13,
    color: "#E0E0E0",
    backgroundColor: "#2A2A2A",
    padding: 8,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#EF5350",
  },
  taskProgressContainer: {
    height: 6,
    backgroundColor: "#3A3A3A",
    borderRadius: 3,
    overflow: "hidden",
    position: "relative",
  },
  taskProgressBar: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#29B6F6",
  },
  taskProgressText: {
    position: "absolute",
    right: 0,
    top: 8,
    fontSize: 12,
    color: "#AAAAAA",
  },
  taskStatusContainer: {
    marginLeft: 12,
  },
  taskCompletedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#66BB6A",
    justifyContent: "center",
    alignItems: "center",
  },
  taskCheckmark: {
    color: "#000000",
    fontWeight: "bold",
  },
  taskIncompleteCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#555",
  },
});

export default TasksScreen;