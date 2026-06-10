// Telegram-уведомления о новых заказах
// Настройка: см. инструкцию в HANDOVER.md

const BOT_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN;
const CHAT_ID   = import.meta.env.VITE_TG_CHAT_ID;

export const notifyNewOrder = async (order) => {
  if (!BOT_TOKEN || !CHAT_ID) return; // Молча пропускаем если не настроено

  const items = Array.isArray(order.items)
    ? order.items.map(i => `• ${i.name}${i.size ? ` (${i.size})` : ''} × ${i.qty} — ${(i.price_min * i.qty).toLocaleString()} ₽`).join('\n')
    : '—';

  const text = [
    '🛍 *Новый заказ MENTE*',
    '',
    `👤 *${order.customer_name}*`,
    `📞 ${order.customer_phone}`,
    `📧 ${order.customer_email || '—'}`,
    '',
    '*Состав заказа:*',
    items,
    '',
    `💰 *Итого: ${order.total_amount?.toLocaleString()} ₽*`,
    '',
    `🔗 Открыть панель: https://mente-shop.vercel.app/admin`,
  ].join('\n');

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'Markdown',
      }),
    });
  } catch {
    // Не прерываем оформление заказа если уведомление не отправилось
  }
};

export const notifyContact = async ({ email, message }) => {
  if (!BOT_TOKEN || !CHAT_ID) return;

  const text = [
    '✉️ *Новый вопрос с сайта MENTE*',
    '',
    `📧 ${email}`,
    '',
    `💬 ${message}`,
  ].join('\n');

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
    });
  } catch {
    // Молча пропускаем
  }
};
