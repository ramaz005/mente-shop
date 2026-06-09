export default function Privacy() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '60px 40px', maxWidth: '800px', margin: '0 auto' }}>
      <style>{`
        .legal-h1 { font-family: 'Anonymous Pro', monospace; font-size: 28px; letter-spacing: 4px; margin-bottom: 40px; color: #050505; }
        .legal-h2 { font-family: 'Anonymous Pro', monospace; font-size: 16px; letter-spacing: 2px; margin: 32px 0 12px; color: #050505; font-weight: 700; }
        .legal-p  { font-family: 'Anonymous Pro', monospace; font-size: 14px; color: #555; line-height: 1.8; margin-bottom: 12px; }
        .legal-updated { font-family: 'Anonymous Pro', monospace; font-size: 12px; color: #aaa; margin-bottom: 40px; letter-spacing: 1px; }
      `}</style>

      <h1 className="legal-h1">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h1>
      <p className="legal-updated">Дата последнего обновления: [дата]</p>

      <h2 className="legal-h2">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
      <p className="legal-p">
        Настоящая политика конфиденциальности определяет порядок обработки персональных данных
        пользователей сайта [название магазина] (далее — «Сайт»), расположенного по адресу [URL сайта].
      </p>
      <p className="legal-p">
        Оператор персональных данных: [ФИО или наименование ИП/ООО], [ИНН].
      </p>

      <h2 className="legal-h2">2. ПЕРСОНАЛЬНЫЕ ДАННЫЕ</h2>
      <p className="legal-p">
        При оформлении заказа мы собираем следующие данные: имя, фамилия, номер телефона, адрес электронной почты.
        При подписке на рассылку — адрес электронной почты.
      </p>

      <h2 className="legal-h2">3. ЦЕЛИ ОБРАБОТКИ</h2>
      <p className="legal-p">
        Персональные данные обрабатываются в следующих целях:
      </p>
      <p className="legal-p">— Обработка и доставка заказов;</p>
      <p className="legal-p">— Связь с покупателем по вопросам заказа;</p>
      <p className="legal-p">— Отправка рекламно-информационной рассылки (при наличии согласия);</p>
      <p className="legal-p">— Улучшение качества обслуживания.</p>

      <h2 className="legal-h2">4. COOKIES</h2>
      <p className="legal-p">
        Сайт использует файлы cookie для обеспечения корректной работы и анализа трафика.
        Вы можете отключить cookie в настройках браузера, однако это может повлиять на работу сайта.
      </p>

      <h2 className="legal-h2">5. ПЕРЕДАЧА ДАННЫХ ТРЕТЬИМ ЛИЦАМ</h2>
      <p className="legal-p">
        Персональные данные не передаются третьим лицам, кроме случаев, необходимых для исполнения заказа
        (службы доставки: СДЭК, Почта России).
      </p>

      <h2 className="legal-h2">6. ХРАНЕНИЕ И ЗАЩИТА</h2>
      <p className="legal-p">
        Данные хранятся на защищённых серверах Supabase (США) с применением шифрования.
        Срок хранения — [3 года] с момента последней покупки или до отзыва согласия.
      </p>

      <h2 className="legal-h2">7. ПРАВА ПОЛЬЗОВАТЕЛЯ</h2>
      <p className="legal-p">
        Вы вправе запросить доступ к своим данным, их исправление или удаление.
        Для этого обратитесь по адресу: [email].
      </p>

      <h2 className="legal-h2">8. КОНТАКТЫ</h2>
      <p className="legal-p">
        По вопросам обработки персональных данных: [email] / [телефон]
      </p>
    </div>
  );
}
