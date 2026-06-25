export default function Contacts() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <style>{`
        .contacts-wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 40px;
        }
        .contacts-title {
          font-family: 'Anonymous Pro', monospace;
          font-size: 32px;
          letter-spacing: 6px;
          color: #050505;
          margin-bottom: 60px;
        }
        .contacts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }
        .contacts-block-title {
          font-family: 'Anonymous Pro', monospace;
          font-size: 12px;
          letter-spacing: 3px;
          color: #aaa;
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .contacts-block-val {
          font-family: 'Anonymous Pro', monospace;
          font-size: 18px;
          color: #050505;
          text-decoration: none;
          display: block;
          margin-bottom: 10px;
          transition: color 0.2s;
        }
        .contacts-block-val:hover { color: #AA0607; }
        .contacts-note {
          font-family: 'Anonymous Pro', monospace;
          font-size: 12px;
          color: #aaa;
          margin-top: 8px;
          line-height: 1.6;
        }
        .contacts-divider {
          border: none;
          border-top: 1px solid #eee;
          margin: 60px 0;
        }
        @media (max-width: 640px) {
          .contacts-grid { grid-template-columns: 1fr !important; gap: 40px; }
          .contacts-wrap { padding: 40px 24px; }
        }
      `}</style>

      <div className="contacts-wrap">
        <h1 className="contacts-title">КОНТАКТЫ</h1>

        <div className="contacts-grid">
          <div>
            <p className="contacts-block-title">Телефон</p>
            <a href="tel:+79013562625" className="contacts-block-val">+7 901 356-26-25</a>
            <a href="tel:+79379173121" className="contacts-block-val">+7 937 917-31-21</a>
            <p className="contacts-note">Звонки и WhatsApp — ежедневно с 10:00 до 21:00</p>
          </div>

          <div>
            <p className="contacts-block-title">Email</p>
            <a href="mailto:[ваш email]" className="contacts-block-val">[ваш email]</a>
            <p className="contacts-note">Ответим в течение рабочего дня</p>
          </div>

          <div>
            <p className="contacts-block-title">Мессенджеры</p>
            <a href="https://t.me/[ваш_telegram]" target="_blank" rel="noopener noreferrer" className="contacts-block-val">
              Telegram: @[ваш_telegram]
            </a>
            <a href="https://wa.me/79013562625" target="_blank" rel="noopener noreferrer" className="contacts-block-val">
              WhatsApp: +7 901 356-26-25
            </a>
          </div>

          <div>
            <p className="contacts-block-title">Instagram</p>
            <a href="https://instagram.com/[ваш_аккаунт]" target="_blank" rel="noopener noreferrer" className="contacts-block-val">
              @[ваш_аккаунт]
            </a>
          </div>
        </div>

        <hr className="contacts-divider" />

        <div>
          <p className="contacts-block-title">По вопросам заказов, доставки и возврата</p>
          <p style={{ fontFamily: 'Anonymous Pro', fontSize: '14px', color: '#555', lineHeight: '1.8' }}>
            Напишите нам в мессенджер или на почту — ответим в течение рабочего дня.
          </p>
        </div>
      </div>
    </div>
  );
}
