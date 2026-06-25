import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { notifyNewOrder } from '../lib/notify';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^[\d\s\-\(\)]{7,15}$/.test(phone);

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [formError, setFormError] = useState('');

  const validate = () => {
    if (!name.trim()) return 'Введите имя';
    if (!surname.trim()) return 'Введите фамилию';
    if (!email.trim() || !validateEmail(email)) return 'Введите корректный e-mail';
    if (!phone.trim() || !validatePhone(phone)) return 'Введите корректный номер телефона';
    if (!agreed) return 'Необходимо согласие с политикой конфиденциальности';
    return null;
  };

  const handleOrder = async () => {
    const error = validate();
    if (error) { setFormError(error); return; }
    setFormError('');
    setOrdering(true);

    const { error: dbError } = await supabase.from('orders').insert({
      status: 'pending',
      customer_name: `${name.trim()} ${surname.trim()}`,
      customer_phone: phone.trim(),
      customer_email: email.trim(),
      items: cart,
      total_amount: total,
    });

    if (dbError) {
      setFormError('Ошибка при оформлении. Попробуйте снова.');
    } else {
      const orderData = {
        customer_name: `${name.trim()} ${surname.trim()}`,
        customer_phone: phone.trim(),
        customer_email: email.trim(),
        items: cart,
        total_amount: total,
      };
      await notifyNewOrder(orderData); // Telegram-уведомление
      setSuccess(true);
      clearCart();
    }
    setOrdering(false);
  };

  if (success) return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', textAlign: 'center', padding: '40px' }}>
      <h2 style={{ fontFamily: 'Anonymous Pro', fontSize: '28px', letterSpacing: '4px', marginBottom: '16px' }}>ЗАКАЗ ОФОРМЛЕН</h2>
      <p style={{ fontFamily: 'Anonymous Pro', fontSize: '14px', color: '#7F7F7F', marginBottom: '8px' }}>Спасибо за заказ, {name}!</p>
      <p style={{ fontFamily: 'Anonymous Pro', fontSize: '14px', color: '#7F7F7F', marginBottom: '40px' }}>Дальнейшая информация ожидает Вас на почте.</p>
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
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 1px solid #ccc;
          background: none; cursor: pointer;
          font-family: 'Anonymous Pro'; font-size: 13px;
          display: flex; align-items: center; justify-content: center;
          line-height: 1; padding: 0; flex-shrink: 0;
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
        .form-error {
          font-family: 'Anonymous Pro', monospace;
          font-size: 12px; color: #AA0607;
          margin-top: 8px; letter-spacing: 1px;
        }
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
              <div key={`${item.id}-${item.size}`} className="cart-item">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                ) : (
                  <div className="cart-item-img-placeholder">MENTE</div>
                )}

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

                <div className="qty-wrap">
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Уменьшить">
                    <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><line x1="0" y1="1" x2="10" y2="1" stroke="#000" strokeWidth="1.5"/></svg>
                  </button>
                  <span style={{ fontFamily: 'Anonymous Pro', fontSize: '14px', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Увеличить">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="5" y1="0" x2="5" y2="10" stroke="#000" strokeWidth="1.5"/><line x1="0" y1="5" x2="10" y2="5" stroke="#000" strokeWidth="1.5"/></svg>
                  </button>
                  <button className="qty-btn" onClick={() => removeFromCart(item.id)} aria-label="Удалить">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="0" y1="0" x2="10" y2="10" stroke="#000" strokeWidth="1.5"/><line x1="10" y1="0" x2="0" y2="10" stroke="#000" strokeWidth="1.5"/></svg>
                  </button>
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
            <input className="form-input" placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} />

            <div className="phone-wrap">
              <span className="phone-prefix">+7</span>
              <input
                className="phone-input"
                placeholder="9001234567"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              />
            </div>

            {formError && <p className="form-error">{formError}</p>}

            <div style={{ borderTop: '1px solid #eee', marginTop: '20px', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'Anonymous Pro', fontSize: '16px', fontWeight: '700' }}>Итоговая сумма:</span>
                <span style={{ fontFamily: 'Anonymous Pro', fontSize: '16px', fontWeight: '700' }}>{total?.toLocaleString()} ₽</span>
              </div>
            </div>

            {/* Чекбокс политика */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', marginTop: '20px' }}>
              <div style={{ position: 'relative', flexShrink: 0, marginTop: '2px' }}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  style={{ position: 'absolute', opacity: 0, width: '18px', height: '18px', cursor: 'pointer', margin: 0 }}
                />
                <div style={{
                  width: '18px', height: '18px',
                  border: `1.5px solid ${agreed ? '#2F2F2F' : formError && !agreed ? '#AA0607' : '#ccc'}`,
                  background: agreed ? '#2F2F2F' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                  flexShrink: 0,
                }}>
                  {agreed && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              <span style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', color: '#555', lineHeight: '1.6' }}>
                Я согласен(а) с{' '}
                <Link to="/privacy" style={{ textDecoration: 'underline', color: '#2F2F2F' }}>
                  политикой конфиденциальности
                </Link>
                {' '}и{' '}
                <Link to="/offer" style={{ textDecoration: 'underline', color: '#2F2F2F' }}>
                  условиями публичной оферты
                </Link>
              </span>
            </label>

            <button className="order-btn" onClick={handleOrder} disabled={ordering}>
              {ordering ? 'ОФОРМЛЯЕМ...' : 'ОФОРМИТЬ ЗАКАЗ'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
