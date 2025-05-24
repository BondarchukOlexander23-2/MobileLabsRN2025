import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import moment from 'moment';

const ReminderCard = ({ data, onDelete }) => {
  return (
    <View style={styles.cardBox}>
      <View style={styles.cardTop}>
        <Text style={styles.cardTitle}>{data.title}</Text>
        <Pressable onPress={() => onDelete(data.id, data.notificationId)}>
          <Text>✖</Text>
        </Pressable>
      </View>
      {data.description ? <Text style={styles.cardNote}>{data.description}</Text> : null}
      <Text style={styles.cardTime}>📆 {moment(data.date).format('DD.MM.YYYY HH:mm')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBox: { padding: 15, backgroundColor: '#f0f0f0', marginVertical: 6, borderRadius: 6 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between' },
  cardTitle: { fontWeight: 'bold' },
  cardNote: { marginTop: 4 },
  cardTime: { marginTop: 4, fontSize: 12, color: '#555' },
});

export default ReminderCard;
