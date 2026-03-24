import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const STRAPI = 'https://mente-backend-production.up.railway.app';

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleOrder = async () => {
    if (!name || !phone) { alert('Заполните имя и телефон!'); return; }
    setOrdering(true);
    try {
      await axios.post(`${STRAPI}/api/orders`, {
        data: {
          stat: 'pending',
          customer_name: `${name} ${surname}`,
          customer_phone: phone,
          customer_email: email,
          items: cart
        }
      });
      setSuccess(true);
      clearCart();
    } catch (e) {
      alert('Ошибка при оформлении. Попробуйте снова.');
    }
    setOrdering(false);
  };

  if (success) return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', textAlign: 'center', padding: '40px' }}>
      <h2 style={{ fontFamily: 'Anonymous Pro', fontSize: '28px', letterSpacing: '4px', marginBottom: '16px' }}>ЗАКАЗ ОФОРМЛЕН</h2>
      <p style={{ fontFamily: 'Anonymous Pro', fontSize: '14px', color: '#7F7F7F', marginBottom: '40px' }}>Мы свяжемся с вами: {phone}</p>
      <Link to="/catalog" style={{ padding: '16px 40px', backgroundColor: '#2F2F2F', color: '#fff', fontFamily: 'Anonymous Pro', fontSize: '13px', letterSpacing: '3px', textDecoration: 'none', borderRadius: '8px' }}>
        ПРОДОЛЖИТЬ ПОКУПКИ
      </Link>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <style>{`
        .cart-wrap {
          display: grid;
          grid-template-columns: 1fr 480px;
          min-height: calc(100vh - 80px);
          border-top: 1px solid #eee;
        }
        .cart-left { padding: 40px; border-right: 1px solid #eee; }
        .cart-right { padding: 40px; }
        .cart-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid #eee;
        }
        .cart-item-img {
          width: 80px; height: 100px;
          object-fit: cover;
          background: #f5f5f5;
          border-radius: 4px;
          flex-shrink: 0;
        }
        .cart-item-img-placeholder {
          width: 80px; height: 100px;
          background: #f5f5f5;
          border-radius: 4px;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Anonymous Pro'; font-size: 10px; color: #ccc;
        }
        .qty-wrap { display: flex; align-items: center; gap: 8px; }
        .qty-btn {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 1px solid #ccc;
          background: none; cursor: pointer;
          font-family: 'Anonymous Pro'; font-size: 14px;
          display: flex; align-items: center; justify-content: center;
          line-height: 1; padding: 0;
          transition: border-color 0.2s;
        }
        .qty-btn:hover { border-color: #000; }
        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #000;
          font-family: 'Anonymous Pro', monospace;
          font-size: 14px; color: #000;
          outline: none; margin-bottom: 10px;
          box-sizing: border-box; background: #fff;
        }
        .form-input::placeholder { color: #aaa; }
        .phone-wrap { position: relative; margin-bottom: 10px; }
        .phone-prefix {
          position: absolute; left: 16px;
          top: 50%; transform: translateY(-50%);
          font-family: 'Anonymous Pro'; font-size: 14px; color: #000;
          pointer-events: none;
        }
        .phone-input {
          width: 100%; padding: 14px 16px 14px 44px;
          border: 1px solid #000;
          font-family: 'Anonymous Pro', monospace;
          font-size: 14px; color: #000;
          outline: none; box-sizing: border-box; background: #fff;
        }
        .phone-input::placeholder { color: #aaa; }
        .order-btn {
          width: 100%; padding: 18px;
          background: #2F2F2F; color: #fff; border: none;
          font-family: 'Anonymous Pro', monospace;
          font-size: 14px; letter-spacing: 3px;
          cursor: pointer; transition: background 0.2s;
          margin-top: 20px; border-radius: 8px;
        }
        .order-btn:hover { background: #AA0607; }
        .order-btn:disabled { background: #ccc; cursor: not-allowed; }
        @media (max-width: 900px) {
          .cart-wrap { grid-template-columns: 1fr !important; }
          .cart-left { border-right: none !important; border-bottom: 1px solid #eee; }
        }
      `}</style>

      {cart.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '24px' }}>
          <h2 style={{ fontFamily: 'Anonymous Pro', fontSize: '24px', letterSpacing: '4px' }}>КОРЗИНА ПУСТА</h2>
          <Link to="/catalog" style={{ padding: '14px 36px', background: '#2F2F2F', color: '#fff', fontFamily: 'Anonymous Pro', fontSize: '13px', letterSpacing: '3px', textDecoration: 'none', borderRadius: '8px' }}>
            В КАТАЛОГ
          </Link>
        </div>
      ) : (
        <div className="cart-wrap">
          {/* Товары */}
          <div className="cart-left">
            <h2 style={{ fontFamily: 'Anonymous Pro', fontSize: '22px', letterSpacing: '4px', marginBottom: '24px' }}>ВАШ ЗАКАЗ</h2>

            {cart.map(item => (
              <div key={item.id} className="cart-item">
                {/* Фото */}
                {item.image ? (
                  <img src={`${STRAPI}${item.image}`} alt={item.name} className="cart-item-img" />
                ) : (
                  <div className="cart-item-img-placeholder">MENTE</div>
                )}

                {/* Инфо */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Anonymous Pro', fontSize: '14px', letterSpacing: '1px', color: '#050505', marginBottom: '4px', fontWeight: '700' }}>
                    {item.name}
                  </p>
                  {item.size && <p style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', color: '#7F7F7F' }}>размер: {item.size}</p>}
                  {item.color && <p style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', color: '#7F7F7F' }}>цвет: {item.color}</p>}
                  <p style={{ fontFamily: 'Anonymous Pro', fontSize: '14px', color: '#050505', marginTop: '8px' }}>
                    {(item.price_min * item.qty)?.toLocaleString()} ₽
                  </p>
                </div>

                {/* Количество */}
                <div className="qty-wrap">
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span style={{ fontFamily: 'Anonymous Pro', fontSize: '14px', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  <button className="qty-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0' }}>
              <span style={{ fontFamily: 'Anonymous Pro', fontSize: '16px', fontWeight: '700' }}>Итого:</span>
              <span style={{ fontFamily: 'Anonymous Pro', fontSize: '16px', fontWeight: '700' }}>{total?.toLocaleString()} ₽</span>
            </div>
          </div>

          {/* Форма */}
          <div className="cart-right">
            <h2 style={{ fontFamily: 'Anonymous Pro', fontSize: '22px', letterSpacing: '4px', marginBottom: '8px' }}>ОФОРМЛЕНИЕ</h2>
            <p style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', color: '#7F7F7F', marginBottom: '24px', letterSpacing: '1px' }}>
              Все поля обязательны
            </p>

            <input className="form-input" placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} />
            <input className="form-input" placeholder="Фамилия" value={surname} onChange={e => setSurname(e.target.value)} />
            <input className="form-input" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />

            <div className="phone-wrap">
              <span className="phone-prefix">+7</span>
              <input
                className="phone-input"
                placeholder="Номер телефона"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>

            <div style={{ borderTop: '1px solid #eee', marginTop: '20px', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'Anonymous Pro', fontSize: '16px', fontWeight: '700' }}>Итоговая сумма:</span>
                <span style={{ fontFamily: 'Anonymous Pro', fontSize: '16px', fontWeight: '700' }}>{total?.toLocaleString()} ₽</span>
              </div>
            </div>

            <button className="order-btn" onClick={handleOrder} disabled={ordering}>
              {ordering ? 'ОФОРМЛЯЕМ...' : 'ОПЛАТИТЬ ЗАКАЗ'}
            </button>

            <p style={{ fontFamily: 'Anonymous Pro', fontSize: '11px', color: '#aaa', marginTop: '12px', lineHeight: '1.6' }}>
              Нажимая «Оплатить», вы соглашаетесь с условиями публичной оферты.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}