require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const HOST = '192.168.1.100';

const ONE_SIGNAL_API_KEY = process.env.ONE_SIGNAL_API_KEY;
const ONE_SIGNAL_APP_ID = process.env.ONE_SIGNAL_APP_ID;

app.use(bodyParser.json());

// Просте логування всіх запитів
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} from ${req.ip}`);
  next();
});

// Відправка сповіщення
app.post('/notifications', async (req, res) => {
  try {
    const { include_player_ids, headings, contents, send_after } = req.body;

    if (!Array.isArray(include_player_ids) || include_player_ids.length === 0) {
      return res.status(400).json({ error: 'Не вказано жодного отримувача (include_player_ids).' });
    }
    if (!headings?.en || !contents?.en) {
      return res.status(400).json({ error: 'Не вказано заголовок або текст повідомлення (headings/contents).' });
    }

    const body = {
      app_id: ONE_SIGNAL_APP_ID,
      include_player_ids,
      headings,
      contents,
    };

    if (send_after) {
      body.send_after = send_after; // ISO 8601 string in UTC
    }

    const response = await axios.post('https://onesignal.com/api/v1/notifications', body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${ONE_SIGNAL_API_KEY}`,
      },
    });

    console.log('✅ OneSignal response:', response.data);

    res.status(response.status).json({
      id: response.data.id,
      recipients: response.data.recipients,
    });
  } catch (error) {
    console.error('❌ OneSignal API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Unknown error' });
  }
});

// Видалення сповіщення
app.delete('/notifications/:id', async (req, res) => {
  const notificationId = req.params.id;
  console.log('🗑️ Отримано запит DELETE для notificationId:', notificationId);

  try {
    const url = `https://api.onesignal.com/notifications/${notificationId}?app_id=${ONE_SIGNAL_APP_ID}`;

    const response = await axios.delete(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Key ${ONE_SIGNAL_API_KEY}`,
      },
    });

    console.log('✅ OneSignal DELETE response:', response.status);
    res.status(200).json({
      success: true,
      message: 'Сповіщення успішно видалено',
      id: notificationId,
    });
  } catch (error) {
    console.error('❌ Помилка скасування:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Unknown error' });
  }
});

// Запуск сервера
app.listen(PORT, HOST, () => {
  console.log(`🚀 Proxy server running on http://${HOST}:${PORT}`);
});
