import React from 'react';
import ReminderCard from './ReminderCard';

const ReminderList = ({ items, onRemove }) => {
  return items.map((entry) => (
    <ReminderCard key={entry.id} data={entry} onDelete={onRemove} />
  ));
};

export default ReminderList;
