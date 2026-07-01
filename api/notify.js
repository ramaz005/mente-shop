// Vercel Serverless Function — вызывается с сервера, токен не виден клиенту
// Переменные TG_BOT_TOKEN и TG_CHAT_ID ставятся в Vercel Dashboard → Settings → Environment Variables
// (БЕЗ префикса VITE_ — они не нужны в браузере)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const BOT_TOKEN = process.env.TG_BOT_TOKEN;
  const CHAT_ID   = process.env.TG_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(200).json({ ok: true, skipped: true });
  }

  const { type, data } = req.body;

  if (!type || !data) {
    return res.status(400).json({ error: 'Missing type or data' });
  }

  let text = '';

  if (type === 'order') {
    const items = Array.isArray(data.items)
      ? data.items.map(i => `• ${i.name}${i.size ? ` (${i.size})` : ''} × ${i.qty} — ${(i.price_min * i.qty).toLocaleString()} ₽`).join('\n')
      : '—';

    text = [
      '🛍 *Новый заказ MENTE*', '',
      `👤 *${data.customer_name}*`,
      `📞 ${data.customer_phone}`,
      `📧 ${data.customer_email || '—'}`, '',
      '*Состав заказа:*', items, '',
      `💰 *Итого: ${data.total_amount?.toLocaleString()} ₽*`,
    ].join('\n');
  } else if (type === 'contact') {
    text = [
      '✉️ *Новый вопрос с сайта MENTE*', '',
      `📧 ${data.email}`, '',
      `💬 ${data.message}`,
    ].join('\n');
  } else {
    return res.status(400).json({ error: 'Unknown type' });
  }

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Telegram error' });
  }
}
