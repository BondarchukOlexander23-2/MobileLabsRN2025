import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import ReminderInput from '../components/ReminderInput';
import ReminderList from '../components/ReminderList';
import { setupOneSignal } from '../utils/onesignalSetup';
import { loadTasks, saveTasks } from '../services/storage';

const Reminders = () => {
  const [taskCollection, updateTaskCollection] = useState([]);

  useEffect(() => {
    setupOneSignal();
    loadTasks().then((existing) => existing && updateTaskCollection(existing));
  }, []);

  const storeTask = async (item) => {
    const arranged = [...taskCollection, item].sort((a, b) => new Date(a.date) - new Date(b.date));
    updateTaskCollection(arranged);
    await saveTasks(arranged);
  };

  const removeTask = async (uid, notifyId) => {
    const result = taskCollection.filter((task) => task.id !== uid);
    updateTaskCollection(result);
    await saveTasks(result);
    const { cancelNotification } = await import('../components/deleteNotify');
    await cancelNotification(notifyId);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🕒 Нагадування</Text>
      <ReminderInput onAdd={storeTask} />
      <ReminderList items={taskCollection} onRemove={removeTask} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 15 },
});

export default Reminders;
