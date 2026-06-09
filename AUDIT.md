# 🔍 Технический аудит — MENTE SHOP

> Senior Full-Stack / Security / DevOps / System Architect Review  
> Дата: 09.06.2026  
> Проект: `mente-shop` (React SPA + Strapi Backend)

---

## 1. Общий обзор

MENTE — это React SPA (одностраничное приложение) для e-commerce бренда спортивной одежды. Фронтенд практически готов: верстка, маршрутизация, корзина, анимации — всё сделано. Бэкенд — Strapi, задеплоен на Railway. Критический пробел: нестабильная связь фронт↔бэк, отсутствие реальной оплаты, несколько серьёзных багов и уязвимостей безопасности.

**Общая готовность к продакшену: ~52%**

---

## 2. Карта проекта

| Модуль | Назначение | Состояние | Проблемы |
|---|---|---|---|
| `src/App.jsx` | Роутинг, Layout, Lazy Loading | ✅ Готово | Нет 404-страницы |
| `src/pages/Home.jsx` | Hero-страница | ✅ Готово | setTimeout вместо события load |
| `src/pages/Catalog.jsx` | Каталог товаров + поиск | ✅ Готово | Хардкод URL, нет обработки ошибок |
| `src/pages/Product.jsx` | Страница товара | ⚠️ Баги | Грузит ВСЕ товары, размеры хардкод |
| `src/pages/Cart.jsx` | Корзина + оформление | ⚠️ Баги | Нет валидации email, нет оплаты |
| `src/pages/About.jsx` | О бренде | ❌ Сломано | CSS переменные не определены |
| `src/components/Navbar.jsx` | Навигация | ✅ Готово | — |
| `src/components/Footer.jsx` | Футер | ❌ Не работает | Подписка — пустышка, ссылки битые |
| `src/components/ProductCard.jsx` | Карточка товара | ⚠️ Баги | В корзину без выбора размера |
| `src/context/CartContext.jsx` | Управление корзиной | ✅ Готово | — |
| `src/api/products.js` | API-функции | ❌ Мёртвый код | Нигде не используется |
| Backend (Strapi / Railway) | API + CMS | ⚠️ Не проверен | URL захардкожен в 5 местах |

---

## 3. Список багов и недоработок

| Приоритет | Проблема | Причина | Решение |
|---|---|---|---|
| **Critical** | `Product.jsx` грузит ВСЕ товары для отображения одного | `axios.get('/api/products')` + `.find()` вместо `/api/products/:id` | Заменить на `getProductById(id)` из `api/products.js` |
| **Critical** | `About.jsx` полностью сломан — все цвета `var(--bone)` и т.д. не определены | CSS-переменные не объявлены ни в одном файле | Добавить в `index.css`: `--bone`, `--espresso`, `--blush` и др. |
| **Critical** | `api/products.js` не используется нигде | Все страницы делают прямые `axios.get()` | Рефакторинг: импортировать функции из этого файла |
| **Critical** | STRAPI URL захардкожен в 5 местах | `const STRAPI = 'https://...'` в Catalog, Product, Cart, ProductCard, api/products | Вынести в `VITE_STRAPI_URL` и использовать `import.meta.env` |
| **High** | `ProductCard.jsx` добавляет товар в корзину без размера | `onClick={() => addToCart({...})` без `selectedSize` | Требовать размер ИЛИ убрать кнопку с карточки каталога |
| **High** | Нет 404-страницы | Отсутствует `<Route path="*">` | Добавить компонент NotFound и роут `*` |
| **High** | Валидация формы в Cart — только name и phone, email не проверяется | `if (!name || !phone)` — всё | Валидировать email regex, обязательность фамилии |
| **High** | Footer: подписка на email — кнопка ничего не делает | Нет `onSubmit` / `onClick` handler | Подключить к API или убрать поле |
| **High** | Footer: ссылки "ДОСТАВКА И ОПЛАТА" и др. — `<a href="#">` | Не реализованы страницы | Создать страницы или убрать ссылки |
| **Medium** | Кнопка "ОПЛАТИТЬ ЗАКАЗ" вводит покупателя в заблуждение | Реальной оплаты нет — просто сохраняет заказ | Переименовать в "ОФОРМИТЬ ЗАКАЗ" |
| **Medium** | Изображения товаров не сохраняются в корзину | `addToCart()` в Product.jsx не передаёт `imageUrl` | Добавить `image: product.images[0]?.url` в объект |
| **Medium** | Размеры товара захардкожены `['XS', 'S', 'M']` | Не берутся из API/данных товара | Добавить поле `sizes` в Strapi модель |
| **Medium** | Кэш `sessionStorage` для товаров без TTL | Данные устаревают, нет инвалидации | Хранить timestamp, сбрасывать через 5 минут |
| **Medium** | `@tanstack/react-query` установлен, но не используется | Зря увеличивает бандл ~40KB | Удалить или начать использовать вместо ручного `axios` |
| **Medium** | `tailwindcss` установлен, но не используется | Только inline styles и `<style>` теги | Или удалить, или перейти на Tailwind |
| **Medium** | Дублирующийся `@font-face` для Druk Wide Cyr в `index.html` и `index.css` | Объявлен дважды | Оставить только в `index.css` |
| **Medium** | Двойной импорт Google Fonts в `index.css` | 3 `@import url(...)`, два одинаковых | Оставить один |
| **Low** | `<html lang="en">` — сайт на русском | Забыли изменить | `lang="ru"` в `index.html` |
| **Low** | `setTimeout(() => setLoaded(true), 100)` в Home.jsx | Хак вместо `onLoad` события | Использовать `onLoad` на `<img>` |
| **Low** | Нет `<meta description>` и Open Graph тегов | Не заполнен `index.html` | Добавить для SEO и соцсетей |
| **Low** | `eslint.config.js` указан как `"main"` в `package.json` | Ошибка конфигурации | Удалить поле `"main"` из package.json |

---

## 4. Аудит безопасности

| Уровень риска | Уязвимость | Где находится | Как исправить |
|---|---|---|---|
| 🔴 **CRITICAL** | `.env` файл с токенами зафиксирован в git | `.env` в корне, `.gitignore` не исключает его | Добавить `.env` в `.gitignore`, удалить из истории: `git rm --cached .env` |
| 🔴 **CRITICAL** | API токен Strapi указан как placeholder, но файл всё равно в репо | `.env`: `VITE_STRAPI_API_TOKEN=ваш_token_из_Strapi` | После удаления из git: реальный токен только в `.env.local` |
| 🔴 **CRITICAL** | Нет валидации на форме заказа — можно POST'ить мусор | `Cart.jsx` — `handleOrder()` | Валидировать все поля перед отправкой |
| 🟠 **HIGH** | Нет rate limiting на оформление заказов | `Cart.jsx` → `POST /api/orders` | На стороне Strapi добавить rate limiting плагин. На фронте — дизейблить кнопку после отправки на 5 сек |
| 🟠 **HIGH** | CORS на Strapi открыт `origin: '*'` в vite.config | `vite.config.js` | В Strapi Settings → Security → CORS указать только домен продакшена |
| 🟠 **HIGH** | Нет проверки MIME-типа при загрузке изображений (если Strapi принимает uploads) | Strapi backend | Настроить `allowedFileTypes` в Strapi upload plugin |
| 🟡 **MEDIUM** | Данные корзины в `localStorage` не зашифрованы | `CartContext.jsx` | Некритично для корзины, но не хранить там чувствительные данные |
| 🟡 **MEDIUM** | `sessionStorage` для кэша продуктов — данные доступны всем скриптам на странице | `Catalog.jsx` | Некритично, но помнить об XSS-риске если будет eval или innerHTML |
| 🟡 **MEDIUM** | Телефон в форме не валидируется — принимает любую строку | `Cart.jsx` | Добавить маску или regex для телефона |
| 🟡 **MEDIUM** | Email не валидируется перед отправкой | `Cart.jsx` | `if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))` |
| 🟡 **MEDIUM** | Нет Content Security Policy (CSP) заголовков | `index.html` | Добавить `<meta http-equiv="Content-Security-Policy">` или настроить на Vercel |
| 🟢 **LOW** | Нет SRI (Subresource Integrity) для Google Fonts | `index.css` | Некритично для шрифтов, но желательно |
| 🟢 **LOW** | Нет `X-Frame-Options` / `X-Content-Type-Options` заголовков | Vercel конфиг | Добавить в `vercel.json` через `headers` |

---

## 5. Сравнение бесплатных баз данных

| Сервис | Бесплатный тариф | Ограничения | Плюсы | Минусы |
|---|---|---|---|---|
| **Supabase** | 500MB БД, 5GB хранилище, 50K MAU, 2 проекта | Проект паузируется после 7 дней неактивности | PostgreSQL, Auth, Storage, Realtime, REST+GraphQL API из коробки | Пауза на бесплатном |
| **Neon** | 0.5GB, 190 часов compute/мес, 1 проект | Только БД (нет auth/storage) | Serverless PostgreSQL, мгновенный старт, бранчинг | Нет встроенного BaaS |
| **Firebase** | 1GB Firestore, 10GB хранилище, 50K авторизаций/мес | NoSQL только, лимиты на операции чтения/записи | Realtime DB, Auth, Hosting, Cloud Functions | NoSQL (не реляционная), привязка к Google |
| **Appwrite** | 75K MAU, 2GB хранилище, 3 проекта | Appwrite Cloud Beta | Full BaaS: Auth, DB, Storage, Functions | Новый продукт, меньше документации |
| **PocketBase** | Бесплатен (self-hosted) | Нужен VPS или хостинг (Railway free tier) | SQLite, Admin UI, REST API, реалтайм | Нужен деплой, нет управляемого облака |
| **MongoDB Atlas** | 512MB, M0 кластер | Только NoSQL, нет встроенного Auth | Гибкая схема, хорошо для документов | Маленький лимит, нет реляций |

### Рекомендация

У тебя **уже есть Strapi на Railway** — это и есть бэкенд + БД. Проблема не в отсутствии базы, а в том, что:

1. Railway free tier **засыпает после простоя** → первый запрос медленный
2. Нет UI для просмотра заказов менеджером
3. Не настроены email-уведомления об заказах

**Лучший вариант для твоего проекта: Supabase** в качестве дополнительного хранилища для заказов + newsletter подписок. Либо — продолжать использовать Strapi, но настроить его properly (токен, CORS, email plugin).

**Если хочешь перейти на что-то одно — Supabase.** Он заменит Strapi полностью: даст PostgreSQL с реляциями, Auth, REST API без написания backend-кода, и бесплатный Admin UI для просмотра данных.

---

## 6. Архитектура базы данных (Supabase / PostgreSQL)

```sql
-- Таблица: products
CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  category    VARCHAR(100),
  price_min   INTEGER NOT NULL,
  price_max   INTEGER,
  color       VARCHAR(100),
  sizes       TEXT[],          -- ['XS','S','M','L','XL']
  in_stock    BOOLEAN DEFAULT true,
  description TEXT,
  images      JSONB,           -- [{url, width, height}]
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Таблица: orders
CREATE TABLE orders (
  id              SERIAL PRIMARY KEY,
  status          VARCHAR(50) DEFAULT 'pending',  -- pending | confirmed | shipped | done | cancelled
  customer_name   VARCHAR(255) NOT NULL,
  customer_phone  VARCHAR(30) NOT NULL,
  customer_email  VARCHAR(255),
  items           JSONB NOT NULL,                 -- [{id, name, size, qty, price}]
  total_amount    INTEGER,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- Таблица: newsletter_subscribers
CREATE TABLE newsletter_subscribers (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 7. Пошаговый Roadmap внедрения

### 🔴 Шаг 1 — Критические исправления (1–2 дня)

1. Добавить `.env` в `.gitignore` и удалить из истории
2. Вынести `STRAPI` URL в `import.meta.env.VITE_STRAPI_URL`
3. Исправить `Product.jsx` — использовать `/api/products/:id`
4. Объявить CSS-переменные в `index.css` для `About.jsx`
5. Добавить 404-страницу

### 🟠 Шаг 2 — Важные фиксы (2–3 дня)

6. Добавить валидацию email и телефона в форму Cart
7. Исправить `ProductCard.jsx` — убрать кнопку "В КОРЗИНУ" или требовать размер
8. Передавать `imageUrl` при `addToCart` в Product.jsx
9. Переименовать кнопку "ОПЛАТИТЬ" → "ОФОРМИТЬ ЗАКАЗ"
10. Удалить неиспользуемые зависимости (`@tanstack/react-query`, `tailwindcss`) ИЛИ начать их использовать

### 🟡 Шаг 3 — Подключение Supabase (3–4 дня)

11. Создать проект на [supabase.com](https://supabase.com) — бесплатно
12. Создать таблицы `orders` и `newsletter_subscribers` по схеме выше
13. Установить клиент: `npm install @supabase/supabase-js`
14. Заменить `POST /api/orders` в Cart.jsx на запись в Supabase
15. Подключить форму подписки в Footer к Supabase

### 🟢 Шаг 4 — Улучшения UX (2–3 дня)

16. Добавить страницы "Доставка и оплата", "Возврат и обмен"
17. Настроить email-уведомление при заказе (Supabase Edge Functions или Resend.com)
18. Добавить meta-теги SEO в index.html
19. Исправить `lang="en"` → `lang="ru"` в index.html
20. Добавить Error Boundary компонент

### 🚀 Шаг 5 — Продакшн (1 день)

21. Настроить переменные окружения в Vercel Dashboard
22. Добавить security-заголовки в `vercel.json`
23. Настроить CORS в Strapi только для продакшн-домена
24. Проверить Lighthouse: Performance, Accessibility, SEO

---

## 8. Конкретные исправления кода

### 8.1 Добавить в `.gitignore`
```
# Environment files
.env
.env.local
.env.production
```

### 8.2 Исправить `Product.jsx` — правильный запрос
```js
// БЫЛО (грузит все товары!):
useEffect(() => {
  axios.get(`${STRAPI}/api/products?populate=*`)
    .then(res => {
      const found = res.data.data.find(p => p.id === parseInt(id));
      setProduct(found || null);
    })
}, [id]);

// СТАЛО (грузит только нужный):
useEffect(() => {
  axios.get(`${import.meta.env.VITE_STRAPI_URL}/products/${id}?populate=*`)
    .then(res => {
      setProduct(res.data.data || null);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [id]);
```

### 8.3 CSS-переменные для `About.jsx` (добавить в `index.css`)
```css
:root {
  --bone: #F5F0E8;
  --espresso: #2C1810;
  --blush: #E8C4B8;
  --spanish-sun: #D4621A;
  --golden-matcha: #C8A84B;
  --lemon-pie: #F2E55C;
  --persian-plum: #6B1F2A;
}
```

### 8.4 Убрать `.env` из git-истории
```bash
git rm --cached .env
echo ".env" >> .gitignore
git add .gitignore
git commit -m "fix: remove .env from tracking"
# Если токен уже в истории — сбросить токен в Strapi и сгенерировать новый!
```

### 8.5 Добавить 404-страницу в `App.jsx`
```jsx
// src/pages/NotFound.jsx
export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
      <p style={{ fontFamily: 'Anonymous Pro', fontSize: '11px',
        letterSpacing: '6px', opacity: 0.4 }}>404</p>
      <h1 style={{ fontFamily: "'Druk Wide Cyr', 'Arial Black'", fontSize: '48px' }}>
        СТРАНИЦА НЕ НАЙДЕНА
      </h1>
      <Link to="/" style={{ padding: '14px 40px', background: '#2F2F2F',
        color: '#fff', fontFamily: 'Anonymous Pro', textDecoration: 'none',
        letterSpacing: '3px', fontSize: '13px' }}>
        НА ГЛАВНУЮ
      </Link>
    </div>
  );
}

// В App.jsx добавить роут:
<Route path="*" element={
  <Layout>
    <PageTransition><NotFound /></PageTransition>
  </Layout>
} />
```

### 8.6 Валидация формы заказа
```js
const validateForm = () => {
  if (!name.trim()) return 'Введите имя';
  if (!surname.trim()) return 'Введите фамилию';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Некорректный email';
  if (!/^[\d\s\-\(\)]{7,15}$/.test(phone)) return 'Некорректный телефон';
  return null;
};

const handleOrder = async () => {
  const error = validateForm();
  if (error) { alert(error); return; }
  // ... остальной код
};
```

### 8.7 Security-заголовки в `vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### 8.8 Подключение Supabase для заказов
```js
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// В Cart.jsx вместо axios.post:
import { supabase } from '../lib/supabase';

const handleOrder = async () => {
  const error = validateForm();
  if (error) { alert(error); return; }
  setOrdering(true);
  const { error: dbError } = await supabase.from('orders').insert({
    customer_name: `${name} ${surname}`,
    customer_phone: phone,
    customer_email: email,
    items: cart,
    total_amount: total,
    status: 'pending'
  });
  if (dbError) { alert('Ошибка при оформлении. Попробуйте снова.'); }
  else { setSuccess(true); clearCart(); }
  setOrdering(false);
};
```

---

## 9. Итоговая оценка готовности

| Область | Готовность | Комментарий |
|---|---|---|
| UI / Дизайн | **90%** | Отличный визуал, есть мелкие баги |
| Маршрутизация | **80%** | Нет 404, в остальном ок |
| Каталог | **75%** | Работает, но нет фильтров по категории |
| Страница товара | **55%** | Критический баг с загрузкой |
| Корзина / Заказ | **60%** | Нет валидации, нет реальной оплаты |
| Страница "О бренде" | **20%** | CSS переменные не определены — визуально сломана |
| Футер | **40%** | Ссылки мёртвые, подписка не работает |
| Безопасность | **30%** | .env в git, нет валидации, нет rate limit |
| Backend / API | **60%** | Strapi есть, но не настроен (CORS, email, токен) |
| SEO | **15%** | Нет meta, lang="en", нет sitemap |
| **ИТОГО** | **52%** | До MVP-продакшена нужно 5–7 дней работы |
