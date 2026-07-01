// Уведомления через Vercel Serverless Function /api/notify
// Токен Telegram хранится на сервере (Vercel Dashboard → Environment Variables)
// и НИКОГДА не попадает в браузерный бандл

const send = async (type, data) => {
  try {
    await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data }),
    });
  } catch {
    // Не прерываем основной флоу если уведомление не отправилось
  }
};

export const notifyNewOrder = (order) => send('order', order);
export const notifyContact  = ({ email, message }) => send('contact', { email, message });
