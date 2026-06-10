-- ===========================
-- MENTE SHOP — Supabase Schema
-- Выполни в SQL Editor Supabase
-- ===========================

-- 1. Таблица товаров
CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  category    VARCHAR(100),
  price_min   INTEGER NOT NULL,
  price_max   INTEGER,
  color       VARCHAR(100),
  sizes       TEXT[] DEFAULT ARRAY['XS','S','M'],
  in_stock    BOOLEAN DEFAULT true,
  description TEXT,
  image_url   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Таблица заказов
CREATE TABLE orders (
  id              SERIAL PRIMARY KEY,
  status          VARCHAR(50) DEFAULT 'pending',
  customer_name   VARCHAR(255) NOT NULL,
  customer_phone  VARCHAR(30) NOT NULL,
  customer_email  VARCHAR(255),
  items           JSONB NOT NULL,
  total_amount    INTEGER,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Подписчики на newsletter
CREATE TABLE newsletter_subscribers (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Обращения с формы на сайте
CREATE TABLE contact_messages (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(255) NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send message" ON contact_messages FOR INSERT WITH CHECK (true);

-- 5. Открыть публичный доступ на ЧТЕНИЕ для товаров (анонимные пользователи могут читать)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);

-- 5. Открыть публичный доступ на ЗАПИСЬ заказов и подписок
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert order" ON orders FOR INSERT WITH CHECK (true);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
-- Защита от дублей — конфликт по UNIQUE email просто игнорируем на уровне приложения
