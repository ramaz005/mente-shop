import { Link } from 'react-router-dom';

export default function Returns() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ borderBottom: '1px solid #000', padding: '80px 80px 60px' }}>
        <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '10px', letterSpacing: '6px', color: '#AA0607', marginBottom: '16px' }}>
          ИНФОРМАЦИЯ
        </p>
        <h1 style={{
          fontFamily: "'Druk Wide Cyr', 'Arial Black', sans-serif",
          fontSize: 'clamp(32px, 5vw, 64px)',
          letterSpacing: '2px', color: '#000', lineHeight: '1.1'
        }}>
          ВОЗВРАТ И ОБМЕН
        </h1>
      </section>

      {/* Условия */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #000' }}>
        <div style={{ padding: '60px 80px', borderRight: '1px solid #000' }}>
          <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '10px', letterSpacing: '4px', color: '#AA0607', marginBottom: '24px' }}>
            УСЛОВИЯ ВОЗВРАТА
          </p>
          <h2 style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '18px', letterSpacing: '2px', marginBottom: '32px', color: '#000' }}>
            КОГДА МОЖНО ВЕРНУТЬ ТОВАР
          </h2>

          {[
            { ok: true,  text: 'Товар не подошёл по размеру' },
            { ok: true,  text: 'Товар не соответствует описанию' },
            { ok: true,  text: 'Производственный брак или дефект' },
            { ok: true,  text: 'Товар не был в использовании' },
            { ok: true,  text: 'Сохранены бирки и упаковка' },
            { ok: false, text: 'Товар был в использовании' },
            { ok: false, text: 'Нет оригинальной упаковки' },
            { ok: false, text: 'Прошло более 14 дней с получения' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span style={{ color: item.ok ? '#10B981' : '#EF4444', fontSize: '16px', flexShrink: 0 }}>
                {item.ok ? '✓' : '✕'}
              </span>
              <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div style={{ padding: '60px 80px' }}>
          <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '10px', letterSpacing: '4px', color: '#AA0607', marginBottom: '24px' }}>
            КАК ОФОРМИТЬ
          </p>
          <h2 style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '18px', letterSpacing: '2px', marginBottom: '32px', color: '#000' }}>
            ПОШАГОВАЯ ИНСТРУКЦИЯ
          </h2>

          {[
            { step: '01', label: 'Свяжитесь с нами', desc: 'Позвоните или напишите нам в течение 14 дней с момента получения товара.' },
            { step: '02', label: 'Опишите проблему', desc: 'Укажите номер заказа и причину возврата. При необходимости — фото товара.' },
            { step: '03', label: 'Отправьте товар', desc: 'Упакуйте товар с бирками и отправьте по указанному нами адресу.' },
            { step: '04', label: 'Получите деньги', desc: 'После проверки товара вернём деньги в течение 3–5 рабочих дней.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '28px' }}>
              <p style={{ fontFamily: "'Druk Wide Cyr', 'Arial Black'", fontSize: '32px', color: '#000', opacity: 0.1, lineHeight: '1', flexShrink: 0 }}>
                {item.step}
              </p>
              <div>
                <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', marginBottom: '6px', color: '#000' }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Сроки и сумма */}
      <section style={{ padding: '60px 80px', backgroundColor: '#fafafa', borderBottom: '1px solid #000' }}>
        <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '10px', letterSpacing: '4px', color: '#AA0607', marginBottom: '32px' }}>
          СРОКИ И КОМПЕНСАЦИЯ
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          {[
            { label: '14 дней', desc: 'Срок для подачи заявки на возврат с момента получения товара' },
            { label: '3–5 дней', desc: 'Срок возврата денег после получения и проверки товара нами' },
            { label: '100%', desc: 'Возврат полной стоимости при производственном браке или ошибке с нашей стороны' },
          ].map((item, i) => (
            <div key={i}>
              <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '28px', fontWeight: '700', color: '#000', marginBottom: '12px' }}>
                {item.label}
              </p>
              <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 80px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '14px', color: '#7F7F7F', marginBottom: '24px', lineHeight: '2' }}>
          Нужна помощь с возвратом? Мы на связи.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+79013562625" style={{
            padding: '14px 36px', background: '#2F2F2F', color: '#fff',
            fontFamily: 'Anonymous Pro, monospace', fontSize: '13px',
            letterSpacing: '2px', textDecoration: 'none'
          }}>
            ПОЗВОНИТЬ
          </a>
          <Link to="/catalog" style={{
            padding: '14px 36px', background: 'none', color: '#000',
            border: '1px solid #000',
            fontFamily: 'Anonymous Pro, monospace', fontSize: '13px',
            letterSpacing: '2px', textDecoration: 'none'
          }}>
            В КАТАЛОГ
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section { padding: 40px 24px !important; }
          section[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
