import { Platform } from 'react-native';

export async function scheduleNotification(title, description, isoDateString, playerId = 'ipz232boo') {
  try {
    const response = await fetch('http://192.168.1.100:3000/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        include_player_ids: [playerId],
        headings: { en: title },
        contents: { en: description || 'Нагадування' },
        send_after: isoDateString, // ISO формат дати: '2025-05-24T15:00:00Z'
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error('❌ Помилка запиту:', response.status, text);
      return null;
    }

    const data = JSON.parse(text);
    console.log('✅ Push надіслано:', data);
    return data.id || null;
  } catch (error) {
    console.error('❌ Помилка надсилання push:', error.message);
    return null;
  }
}
