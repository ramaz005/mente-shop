export default function Delivery() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        borderBottom: '1px solid #000',
        padding: '80px 80px 60px',
      }}>
        <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '10px', letterSpacing: '6px', color: '#AA0607', marginBottom: '16px' }}>
          ИНФОРМАЦИЯ
        </p>
        <h1 style={{
          fontFamily: "'Druk Wide Cyr', 'Arial Black', sans-serif",
          fontSize: 'clamp(22px, 3vw, 40px)',
          letterSpacing: '2px', color: '#000', lineHeight: '1.1'
        }}>
          ДОСТАВКА И ОПЛАТА
        </h1>
      </section>

      {/* Доставка */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #000' }}>
        <div style={{ padding: '60px 80px', borderRight: '1px solid #000' }}>
          <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '10px', letterSpacing: '4px', color: '#AA0607', marginBottom: '24px' }}>
            ДОСТАВКА
          </p>
          <h2 style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '20px', letterSpacing: '2px', marginBottom: '32px', color: '#000' }}>
            КАК МЫ ДОСТАВЛЯЕМ
          </h2>

          {[
            { label: 'СДЭК', desc: 'Доставка по всей России. Срок: 2–7 рабочих дней в зависимости от города. Стоимость рассчитывается при оформлении заказа.' },
            { label: 'Почта России', desc: 'Доставка в отдалённые регионы. Срок: 7–21 рабочий день. Стоимость от 250 ₽.' },
            { label: 'Самовывоз', desc: 'Получите заказ лично. Адрес и время согласовывается после оформления по телефону.' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: i < 2 ? '1px dashed #eee' : 'none' }}>
              <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', marginBottom: '8px', color: '#000' }}>
                {item.label}
              </p>
              <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ padding: '60px 80px' }}>
          <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '10px', letterSpacing: '4px', color: '#AA0607', marginBottom: '24px' }}>
            ОПЛАТА
          </p>
          <h2 style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '20px', letterSpacing: '2px', marginBottom: '32px', color: '#000' }}>
            СПОСОБЫ ОПЛАТЫ
          </h2>

          {[
            { label: 'НАЛИЧНЫЕ', desc: 'Оплата при получении. Доступно для самовывоза и курьерской доставки.' },
            { label: 'ПЕРЕВОД НА КАРТУ', desc: 'Оплата по реквизитам после подтверждения заказа менеджером. Сбербанк, Тинькофф.' },
            { label: 'ОНЛАЙН-ОПЛАТА', desc: 'Оплата картой онлайн. Все платежи защищены. В разработке — скоро доступно.' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: i < 2 ? '1px dashed #eee' : 'none' }}>
              <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', marginBottom: '8px', color: '#000' }}>
                {item.label}
              </p>
              <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Сроки */}
      <section style={{ padding: '60px 80px', borderBottom: '1px solid #000', backgroundColor: '#fafafa' }}>
        <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '10px', letterSpacing: '4px', color: '#AA0607', marginBottom: '24px' }}>
          ВАЖНО ЗНАТЬ
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          {[
            { num: '1–2', unit: 'дня', label: 'Обработка заказа', desc: 'Свяжемся с вами для подтверждения в течение 1–2 рабочих дней.' },
            { num: '0 ₽', unit: '', label: 'Бесплатная доставка', desc: 'При заказе от 10 000 ₽ доставка СДЭК по России бесплатно.' },
            { num: '100%', unit: '', label: 'Гарантия качества', desc: 'Все товары проходят контроль качества перед отправкой.' },
          ].map((item, i) => (
            <div key={i}>
              <p style={{ fontFamily: "'Druk Wide Cyr', 'Arial Black'", fontSize: '48px', color: '#000', opacity: 0.15, lineHeight: '1' }}>
                {item.num}<span style={{ fontSize: '20px' }}>{item.unit}</span>
              </p>
              <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', margin: '12px 0 8px', color: '#000' }}>
                {item.label}
              </p>
              <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '13px', color: '#555', lineHeight: '1.8' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Контакты */}
      <section style={{ padding: '60px 80px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Anonymous Pro, monospace', fontSize: '13px', color: '#7F7F7F', lineHeight: '2' }}>
          Остались вопросы? Звоните: <strong>8 901 356 26 25</strong> или <strong>8 937 917 31 21</strong>
        </p>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section { padding: 40px 24px !important; }
          section[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          div[style*="borderRight: '1px solid #000'"] { border-right: none !important; border-bottom: 1px solid #000; }
        }
      `}</style>
    </div>
  );
}
