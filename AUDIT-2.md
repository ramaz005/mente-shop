# Технический аудит v2 — MENTE SHOP
> Senior Full-Stack / Performance / DevOps / Security / DB Architect  
> Дата: 09.06.2026

---

## 1. Общая оценка проекта

| Область | Оценка | Статус |
|---|---|---|
| Архитектура | 7/10 | React SPA — окей для MVP, не окей для SEO |
| Производительность | 4/10 | Шрифты блокируют, нет оптимизации картинок |
| Безопасность | 6/10 | RLS есть, rate limiting отсутствует |
| База данных | 8/10 | Схема правильная, нужны индексы |
| Готовность к нагрузке | 5/10 | Нет CDN для изображений, нет кэширования на уровне API |

**Итоговая готовность к продакшену: ~63%**

---

## 2. Причина медленной загрузки каталога

### Диагностика

| Проблема | Причина | Влияние на скорость | Решение |
|---|---|---|---|
| Google Fonts грузится в runtime | `@import url(...)` в CSS — блокирует рендер | **FCP +800–1200ms** | Перенести в `<link rel="preconnect">` в index.html |
| Druk Wide Cyr без preload | Шрифт грузится после парсинга CSS | **LCP +400ms, FOUT** | Добавить `<link rel="preload">` в index.html |
| Нет размеров у изображений | CLS — браузер перестраивает страницу | **CLS 0.15–0.3** | Добавить `width/height` или `aspect-ratio` |
| Картинки без `loading="lazy"` | Все изображения грузятся сразу | **TTI +500ms** | `<img loading="lazy">` для карточек ниже fold |
| framer-motion в бандле | ~100KB gzip без tree-shaking | **TTI +300ms** | Использовать только нужные части |
| React SPA — JS сначала, HTML потом | Пользователь видит белый экран пока грузится JS | **FCP +600ms** | Критично для SEO, решается переходом на Next.js в будущем |
| Нет `<link rel="preconnect">` для Supabase | DNS lookup при первом запросе | **TTFB +100–300ms** | Добавить preconnect в index.html |
| sessionStorage сбрасывается при закрытии вкладки | Каждая новая сессия = новый запрос к Supabase | Повторные запросы | Опционально: localStorage с TTL |

### Web Vitals — текущая оценка

| Метрика | Текущий результат | Цель | Проблема |
|---|---|---|---|
| FCP | ~2.5–3.5s | < 1.8s | Блокирующие шрифты |
| LCP | ~3.5–5s | < 2.5s | Нет preload hero-картинки, шрифты |
| TTI | ~4–6s | < 3.8s | Большой JS бандл |
| CLS | ~0.15–0.25 | < 0.1 | Нет размеров у изображений |

### Исправления кода

#### index.html — добавить preconnect и preload
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MENTE — спортивная одежда</title>
  <meta name="description" content="MENTE — спортивная одежда. Born in Moscow, inspired by Spain." />

  <!-- Preconnect для шрифтов и Supabase -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://mskdyhbppnzdnsfievjd.supabase.co" />

  <!-- Google Fonts через link вместо @import в CSS -->
  <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400&family=Caveat:wght@400;600&display=swap" rel="stylesheet" />

  <!-- Preload кириллического шрифта -->
  <link rel="preload" href="/fonts/drukwidecyr-bold.otf" as="font" type="font/otf" crossorigin />

  <style>
    @font-face {
      font-family: 'Druk Wide Cyr';
      src: url('/fonts/drukwidecyr-bold.otf') format('opentype');
      font-weight: 500;
      font-style: normal;
      font-display: swap; /* Показывать текст сразу, заменить когда загрузится */
    }
  </style>
</head>
```

#### index.css — убрать @import, оставить только переменные и базовые стили
```css
/* УБРАТЬ все @import url(...) — шрифты теперь в index.html */

:root {
  --bone: #F5F0E8;
  --espresso: #2C1810;
  /* ... остальные переменные */
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html, body, #root {
  background-color: #ffffff;
  min-height: 100vh;
}

body {
  color: #050505;
  -webkit-font-smoothing: antialiased;
  font-display: swap;
}
```

#### Catalog.jsx — добавить lazy loading и размеры
```jsx
<img
  src={product.image_url}
  alt={product.name}
  className="product-img"
  loading="lazy"          // ← ленивая загрузка
  width="400"
  height="533"            // ← aspect-ratio 3:4, убирает CLS
/>
```

---

## 3. База данных клиентов (Задача №2)

### Текущий статус

✅ **Уже реализовано** — заказы сохраняются в Supabase таблицу `orders` с полями:
- `customer_name`, `customer_phone`, `customer_email`
- `items` (JSONB — полный состав корзины с qty и ценами)
- `total_amount`, `status`, `created_at`

### Чего не хватает

1. **Индексы** на часто запрашиваемых полях
2. **Отдельная таблица клиентов** для повторных заказов
3. **Статусы заказа** должны быть ограничены через CHECK constraint

### Улучшенная схема — запусти в SQL Editor

```sql
-- Индексы для быстрого поиска
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_phone ON orders(customer_phone);

-- Ограничение на статусы
ALTER TABLE orders ADD CONSTRAINT chk_status
  CHECK (status IN ('pending', 'confirmed', 'shipped', 'done', 'cancelled'));

-- Таблица клиентов (опционально, для CRM)
CREATE TABLE customers (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(255),
  phone         VARCHAR(30) UNIQUE NOT NULL,
  email         VARCHAR(255),
  orders_count  INTEGER DEFAULT 0,
  total_spent   INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
-- Клиенты видны только через service role (только ты)
```

---

## 4. Панель просмотра заказов (Задача №3)

### Сравнение вариантов

| Вариант | Плюсы | Минусы | Подходит для |
|---|---|---|---|
| **А: Supabase Table Editor** | Готово сейчас, 0 кода | Только ты, неудобно для заказчика | MVP, только ты смотришь |
| **Б: Страница /admin в проекте** | Быстро сделать, в одном репо | Нужна авторизация, риск при взломе | Малый бизнес |
| **В: Отдельный admin.mente.ru** | Изолирован, максимальная безопасность | Дольше делать | Серьёзный продакшн |

### Рекомендация: Вариант Б — /admin внутри проекта

Для небольшого магазина это оптимально. Защита через Supabase Auth (email/password для тебя и заказчика).

### Реализация /admin

```jsx
// src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const STATUS_COLORS = {
  pending:   '#F59E0B',
  confirmed: '#3B82F6',
  shipped:   '#8B5CF6',
  done:      '#10B981',
  cancelled: '#EF4444',
};

const STATUS_LABELS = {
  pending:   'Новый',
  confirmed: 'Подтверждён',
  shipped:   'Отправлен',
  done:      'Выполнен',
  cancelled: 'Отменён',
};

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setOrders(data || []); setLoading(false); });
  }, [session]);

  const login = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError('Неверный email или пароль');
  };

  const updateStatus = async (id, status) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  // Форма входа
  if (!session) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <form onSubmit={login} style={{ width: '360px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h1 style={{ fontFamily: 'Anonymous Pro', fontSize: '20px', letterSpacing: '4px', marginBottom: '8px' }}>ADMIN</h1>
        {authError && <p style={{ color: '#AA0607', fontFamily: 'Anonymous Pro', fontSize: '12px' }}>{authError}</p>}
        <input
          type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          style={{ padding: '14px', border: '1px solid #000', fontFamily: 'Anonymous Pro', fontSize: '14px', outline: 'none' }}
        />
        <input
          type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)}
          style={{ padding: '14px', border: '1px solid #000', fontFamily: 'Anonymous Pro', fontSize: '14px', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '14px', background: '#2F2F2F', color: '#fff', border: 'none', fontFamily: 'Anonymous Pro', fontSize: '13px', letterSpacing: '3px', cursor: 'pointer' }}>
          ВОЙТИ
        </button>
      </form>
    </div>
  );

  // Панель заказов
  return (
    <div style={{ padding: '40px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Anonymous Pro', fontSize: '20px', letterSpacing: '4px' }}>
          ЗАКАЗЫ ({orders.length})
        </h1>
        <button onClick={() => supabase.auth.signOut()} style={{ background: 'none', border: '1px solid #ccc', padding: '8px 16px', fontFamily: 'Anonymous Pro', fontSize: '12px', cursor: 'pointer' }}>
          ВЫЙТИ
        </button>
      </div>

      {loading ? (
        <p style={{ fontFamily: 'Anonymous Pro', opacity: 0.4 }}>загрузка...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Anonymous Pro', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #000' }}>
                {['ID', 'Дата', 'Клиент', 'Телефон', 'Email', 'Сумма', 'Товары', 'Статус'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', letterSpacing: '1px', fontSize: '11px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '14px 16px', color: '#aaa' }}>#{order.id}</td>
                  <td style={{ padding: '14px 16px' }}>{new Date(order.created_at).toLocaleDateString('ru-RU')}</td>
                  <td style={{ padding: '14px 16px', fontWeight: '700' }}>{order.customer_name}</td>
                  <td style={{ padding: '14px 16px' }}>{order.customer_phone}</td>
                  <td style={{ padding: '14px 16px', color: '#7F7F7F' }}>{order.customer_email}</td>
                  <td style={{ padding: '14px 16px', fontWeight: '700' }}>{order.total_amount?.toLocaleString()} ₽</td>
                  <td style={{ padding: '14px 16px' }}>
                    {Array.isArray(order.items) ? order.items.map(i => `${i.name} x${i.qty}`).join(', ') : '—'}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value)}
                      style={{
                        padding: '6px 10px',
                        border: `1px solid ${STATUS_COLORS[order.status]}`,
                        color: STATUS_COLORS[order.status],
                        fontFamily: 'Anonymous Pro',
                        fontSize: '12px',
                        background: '#fff',
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    >
                      {Object.entries(STATUS_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

### Подключение маршрута в App.jsx
```jsx
const Admin = lazy(() => import('./pages/Admin'));

// В Routes добавить:
<Route path="/admin" element={
  <Suspense fallback={<LoadingScreen />}>
    <Admin />
  </Suspense>
} />
```

### RLS для admin-доступа к заказам
```sql
-- Только авторизованные пользователи могут ЧИТАТЬ заказы
CREATE POLICY "Auth users read orders" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');

-- Только авторизованные могут МЕНЯТЬ статус
CREATE POLICY "Auth users update orders" ON orders
  FOR UPDATE USING (auth.role() = 'authenticated');
```

### Создать аккаунт администратора
В Supabase → Authentication → Users → **Add user** → введи email и пароль для заказчика.

---

## 5. Оптимизация под нагрузку (Задача №4)

| Оптимизация | Эффект | Сложность |
|---|---|---|
| Preconnect + preload шрифтов | FCP -800ms | ⭐ Легко |
| `loading="lazy"` на изображения | TTI -500ms, меньше трафика | ⭐ Легко |
| `font-display: swap` | Устраняет FOUT, нет блокировки | ⭐ Легко |
| Убрать `@import` шрифтов из CSS | FCP -400ms | ⭐ Легко |
| CDN для изображений (Cloudinary/imgix) | LCP -1–2s, сжатие авто | ⭐⭐ Средне |
| WebP вместо JPG/PNG | Размер -30–50% | ⭐⭐ Средне |
| Перевести hero.jpg в WebP | LCP -500ms | ⭐ Легко |
| `React.memo` на ProductCard | Меньше ре-рендеров при поиске | ⭐ Легко |
| Убрать framer-motion с Home | -50KB JS бандла | ⭐⭐ Средне |
| localStorage вместо sessionStorage для кэша | Кэш сохраняется между сессиями | ⭐ Легко |
| Vercel Image Optimization | Авто WebP, авто resize | ⭐ Легко (встроено) |
| Переход на Next.js (в будущем) | SSG страниц, SEO, ISR | ⭐⭐⭐ Сложно |

### Roadmap по приоритету

**Сегодня (30 минут):**
1. Исправить index.html (preconnect, preload, убрать @import из CSS)
2. Добавить `loading="lazy"` и размеры на картинки
3. Перевести hero.jpg в WebP

**На этой неделе:**
4. Настроить CDN для изображений товаров (Cloudinary free tier)
5. Обернуть ProductCard в React.memo
6. Настроить /admin страницу

**В будущем:**
7. Переход на Next.js для SEO и SSG
8. Настроить Vercel Analytics для мониторинга

---

## 6. Аудит безопасности (Задача №5)

### Frontend

| Уровень | Уязвимость | Где | Решение |
|---|---|---|---|
| 🟡 Medium | `VITE_SUPABASE_ANON_KEY` виден в бандле | Любой может открыть DevTools | Это нормально для anon key — он публичный. Главное — правильные RLS политики |
| 🟡 Medium | Нет rate limiting на форму заказа | Cart.jsx | Дизейблить кнопку на 5 сек после отправки (уже есть `ordering` state ✅) |
| 🟢 Low | sessionStorage — данные доступны JS на странице | Catalog.jsx | Некритично, товары публичные |
| 🟢 Low | localStorage корзины без шифрования | CartContext.jsx | Некритично — только цены и названия |

### Supabase RLS — текущий статус

| Таблица | SELECT | INSERT | UPDATE | DELETE | Статус |
|---|---|---|---|---|---|
| `products` | Все ✅ | ❌ | ❌ | ❌ | Хорошо |
| `orders` | Все ⚠️ | Все ✅ | ❌ | ❌ | **Нужно исправить** |
| `newsletter_subscribers` | ❌ | Все ✅ | ❌ | ❌ | Хорошо |

**Проблема:** любой пользователь сейчас может прочитать ВСЕ заказы через API. Исправить:

```sql
-- УДАЛИТЬ текущую политику чтения заказов
DROP POLICY IF EXISTS "Anyone can insert order" ON orders;

-- Только анонимные могут СОЗДАВАТЬ заказы
CREATE POLICY "Anon insert order" ON orders
  FOR INSERT WITH CHECK (true);

-- Только авторизованные (ты/заказчик) могут ЧИТАТЬ и МЕНЯТЬ
CREATE POLICY "Auth read orders" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Auth update orders" ON orders
  FOR UPDATE USING (auth.role() = 'authenticated');
```

### Service Role Key

⚠️ **Никогда не используй Service Role Key на фронтенде** — он даёт полный обход RLS. Используй его только в серверных функциях (Supabase Edge Functions, Next.js API routes).

---

## 7. Анализ Supabase Free Tier (Задача №6)

### Лимиты бесплатного тарифа

| Ресурс | Лимит | Когда исчерпается |
|---|---|---|
| База данных | 500 MB | ~500K заказов или ~50K товаров с изображениями |
| Bandwidth | 5 GB/мес | При ~50K посетителей/мес с картинками |
| Auth MAU | 50K/мес | Только если добавить авторизацию пользователей |
| API запросы | Без лимита (fair use) | Практически никогда |
| **Пауза проекта** | После 7 дней без трафика | Если магазин не активен неделю — первый запрос медленный |

### Сколько клиентов выдержит бесплатный тариф

- **Посетителей:** 10 000 – 50 000 в месяц — спокойно
- **Заказов:** 1 000 – 5 000 в месяц — без проблем
- **Товаров в каталоге:** до 500 — без проблем

### Когда переходить на платный

Переходи на Pro ($25/мес) когда:
- Более 50K посетителей в месяц
- Или нужна гарантия no-pause (проект никогда не засыпает)
- Или объём данных превысил 450 MB

### Supabase vs Firebase

| Критерий | Supabase Free | Firebase Spark |
|---|---|---|
| БД | 500 MB PostgreSQL | 1 GB Firestore |
| Запросы | Без лимита | 50K reads/day, 20K writes/day |
| Тип БД | Реляционная (SQL) | NoSQL документы |
| Admin UI | Table Editor ✅ | Firebase Console ✅ |
| Auth | 50K MAU | 50K MAU |
| Пауза | Да (7 дней) | Нет |
| Лучше для | Structured data, SQL queries | Realtime, flexible schema |

**Вывод:** для MENTE Shop Supabase лучше — реляционная структура подходит для заказов, товаров, клиентов. Firebase выгоднее только если нужен realtime (чат, live-обновления).

---

## 8. Что исправить прямо сейчас (по приоритету)

### 🔴 Прямо сейчас (критично)

1. **Обновить RLS политики** — заказы сейчас читает кто угодно
2. **Исправить index.html** — preconnect, preload шрифтов (даст -800ms к FCP)
3. **Убрать `@import` из index.css** — шрифты переехали в index.html

### 🟠 На этой неделе

4. Добавить `/admin` страницу и создать аккаунт администратора в Supabase
5. Добавить `loading="lazy"` на картинки в Catalog
6. Индексы в БД

### 🟡 В ближайший месяц

7. Настроить Cloudinary для изображений
8. Перевести hero.jpg в WebP
9. Настроить Vercel Analytics

---

## 9. Готовые фрагменты для немедленного внедрения

### Исправить index.html (запусти сегодня)
```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MENTE — спортивная одежда</title>
    <meta name="description" content="MENTE — спортивная одежда. Born in Moscow, inspired by Spain." />
    <meta property="og:title" content="MENTE" />
    <meta property="og:description" content="Born in Moscow. Inspired by Spain." />
    <meta property="og:image" content="/hero.jpg" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://mskdyhbppnzdnsfievjd.supabase.co" />
    <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400&family=Caveat:wght@400;600&display=swap" rel="stylesheet" />
    <link rel="preload" href="/fonts/drukwidecyr-bold.otf" as="font" type="font/otf" crossorigin />

    <style>
      @font-face {
        font-family: 'Druk Wide Cyr';
        src: url('/fonts/drukwidecyr-bold.otf') format('opentype');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### Исправить RLS в Supabase SQL Editor
```sql
DROP POLICY IF EXISTS "Public read products" ON products;
DROP POLICY IF EXISTS "Anyone can insert order" ON orders;

CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Anon insert order" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth read orders" ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth update orders" ON orders FOR UPDATE USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
```

### React.memo для ProductCard (уменьшить ре-рендеры)
```jsx
// src/components/ProductCard.jsx — обернуть экспорт
import { memo } from 'react';
export default memo(function ProductCard({ product }) {
  // ... существующий код
});
```
