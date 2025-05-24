import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { scheduleNotification } from './sendNotify';

const ReminderInput = ({ onAdd }) => {
  const [taskName, setTaskName] = useState('');
  const [taskNote, setTaskNote] = useState('');
  const [taskDate, setTaskDate] = useState(null);
  const [isPickerVisible, setPickerVisibility] = useState(false);

  const submitTask = async () => {
    if (!taskName || !taskDate || taskDate <= new Date()) return;

    const taskId = Date.now().toString();
    const alertId = await scheduleNotification(taskName, taskNote, taskDate.toISOString());

    const payload = {
      id: taskId,
      title: taskName,
      description: taskNote,
      date: taskDate,
      isFinished: false,
      notificationId: alertId,
    };

    onAdd(payload);
    setTaskName('');
    setTaskNote('');
    setTaskDate(null);
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        value={taskName}
        onChangeText={setTaskName}
        placeholder="Назва"
        style={styles.field}
        placeholderTextColor="#888"
      />
      <TextInput
        value={taskNote}
        onChangeText={setTaskNote}
        placeholder="Опис"
        style={styles.field}
        placeholderTextColor="#888"
      />
      <Pressable onPress={() => setPickerVisibility(true)} style={styles.dateSelector}>
        <Text>{taskDate ? moment(taskDate).format('DD.MM.YYYY HH:mm') : 'Оберіть дату'}</Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="datetime"
        onConfirm={(chosen) => { setTaskDate(chosen); setPickerVisibility(false); }}
        onCancel={() => setPickerVisibility(false)}
        minimumDate={new Date()}
      />
      <Pressable onPress={submitTask} style={styles.submitBtn}>
        <Text>💾 Зберегти</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: { marginBottom: 20 },
  field: { borderBottomWidth: 1, padding: 8, marginBottom: 10 },
  dateSelector: { padding: 10, backgroundColor: '#efefef', marginBottom: 10 },
  submitBtn: { backgroundColor: '#28a745', padding: 12, borderRadius: 5 },
});

export default ReminderInput;
