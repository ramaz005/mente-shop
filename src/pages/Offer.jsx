export default function Offer() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '60px 40px', maxWidth: '800px', margin: '0 auto' }}>
      <style>{`
        .legal-h1 { font-family: 'Anonymous Pro', monospace; font-size: 28px; letter-spacing: 4px; margin-bottom: 40px; color: #050505; }
        .legal-h2 { font-family: 'Anonymous Pro', monospace; font-size: 16px; letter-spacing: 2px; margin: 32px 0 12px; color: #050505; font-weight: 700; }
        .legal-p  { font-family: 'Anonymous Pro', monospace; font-size: 14px; color: #555; line-height: 1.8; margin-bottom: 12px; }
        .legal-updated { font-family: 'Anonymous Pro', monospace; font-size: 12px; color: #aaa; margin-bottom: 40px; letter-spacing: 1px; }
      `}</style>

      <h1 className="legal-h1">ПУБЛИЧНАЯ ОФЕРТА</h1>
      <p className="legal-updated">Дата последнего обновления: [дата]</p>

      <h2 className="legal-h2">1. ОБЩИЕ УСЛОВИЯ</h2>
      <p className="legal-p">
        Настоящий документ является публичной офертой [ФИО ИП / наименование ООО], ИНН [ИНН],
        (далее — «Продавец») на продажу товаров через интернет-магазин [название] по адресу [URL].
      </p>
      <p className="legal-p">
        Акцептом настоящей оферты считается оформление заказа на сайте.
      </p>

      <h2 className="legal-h2">2. ПРЕДМЕТ ДОГОВОРА</h2>
      <p className="legal-p">
        Продавец обязуется передать Покупателю товар, указанный в заказе, а Покупатель обязуется
        принять и оплатить товар на условиях настоящей оферты.
      </p>

      <h2 className="legal-h2">3. ОФОРМЛЕНИЕ ЗАКАЗА</h2>
      <p className="legal-p">
        Заказ оформляется через форму на сайте. После оформления Покупатель получает подтверждение
        на указанный email или по телефону. Заказ считается принятым после подтверждения Продавцом.
      </p>

      <h2 className="legal-h2">4. ЦЕНЫ И ОПЛАТА</h2>
      <p className="legal-p">
        Цены указаны в рублях РФ. Оплата производится [способы оплаты: наличными курьеру,
        переводом на карту, через [платёжную систему]].
      </p>

      <h2 className="legal-h2">5. ДОСТАВКА</h2>
      <p className="legal-p">
        Доставка осуществляется по России службами СДЭК и Почта России, а также самовывозом.
        Сроки и стоимость доставки указаны на странице «Доставка и оплата».
      </p>

      <h2 className="legal-h2">6. ВОЗВРАТ И ОБМЕН</h2>
      <p className="legal-p">
        Возврат и обмен товаров осуществляется в соответствии с Законом РФ «О защите прав потребителей»
        и условиями, указанными на странице «Возврат и обмен».
      </p>

      <h2 className="legal-h2">7. ОТВЕТСТВЕННОСТЬ</h2>
      <p className="legal-p">
        Продавец не несёт ответственности за задержки доставки, вызванные действиями третьих лиц
        (служб доставки, таможни и др.).
      </p>

      <h2 className="legal-h2">8. РАЗРЕШЕНИЕ СПОРОВ</h2>
      <p className="legal-p">
        Все споры решаются путём переговоров. При невозможности достичь соглашения — в судебном порядке
        по месту нахождения Продавца.
      </p>

      <h2 className="legal-h2">9. РЕКВИЗИТЫ ПРОДАВЦА</h2>
      <p className="legal-p">[Полное наименование]</p>
      <p className="legal-p">ИНН: [ИНН]</p>
      <p className="legal-p">Email: [email]</p>
      <p className="legal-p">Телефон: [телефон]</p>
    </div>
  );
}
