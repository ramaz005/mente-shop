import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

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
      await axios.post('https://mente-backend-production.up.railway.app/api/orders', {
        data: {
          total,
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
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#fff', textAlign: 'center', padding: '40px'
    }}>
      <h2 style={{
        fontFamily: 'Anonymous Pro', fontSize: '32px',
        letterSpacing: '4px', marginBottom: '24px', color: '#050505'
      }}>
        ЗАКАЗ ОФОРМЛЕН
      </h2>
      <p style={{ fontFamily: 'Anonymous Pro', fontSize: '16px', color: '#7F7F7F', marginBottom: '40px' }}>
        Мы свяжемся с вами по номеру: {phone}
      </p>
      <Link to="/catalog" style={{
        padding: '18px 48px', backgroundColor: '#2F2F2F',
        color: '#fff', fontFamily: 'Anonymous Pro',
        fontSize: '16px', letterSpacing: '3px',
        textDecoration: 'none', borderRadius: '8px'
      }}>
        ПРОДОЛЖИТЬ ПОКУПКИ
      </Link>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <style>{`
        .cart-wrap {
          display: grid;
          grid-template-columns: 1fr 560px;
          min-height: calc(100vh - 80px);
          border-top: 1px solid #000;
        }
        .cart-left {
          padding: 40px;
          border-right: 1px solid #000;
        }
        .cart-right {
          padding: 40px;
        }
        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 0;
          border-bottom: 1px dashed #000;
        }
        .qty-btn {
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 1px solid #D4D4D4;
          background: none;
          cursor: pointer;
          font-family: 'Anonymous Pro';
          font-size: 16px;
          display: flex; align-items: center; justify-content: center;
        }
        .form-input {
          width: 100%;
          padding: 18px 20px;
          border: 1px solid #000;
          font-family: 'Anonymous Pro', monospace;
          font-size: 16px;
          color: #2F2F2F;
          outline: none;
          margin-bottom: 12px;
          box-sizing: border-box;
          background: #fff;
        }
        .form-input::placeholder { color: #7F7F7F; }
        .order-btn {
          width: 100%;
          padding: 22px;
          background: #2F2F2F;
          color: #fff;
          border: none;
          font-family: 'Anonymous Pro', monospace;
          font-size: 18px;
          letter-spacing: 3px;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 24px;
          border-radius: 8px;
        }
        .order-btn:hover { background: #AA0607; }
        .order-btn:disabled { background: #ccc; cursor: not-allowed; }
        @media (max-width: 900px) {
          .cart-wrap { grid-template-columns: 1fr !important; }
          .cart-left { border-right: none !important; border-bottom: 1px solid #000; }
        }
      `}</style>

      {cart.length === 0 ? (
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: '60vh', gap: '24px'
        }}>
          <h2 style={{ fontFamily: 'Anonymous Pro', fontSize: '28px', letterSpacing: '4px' }}>
            КОРЗИНА ПУСТА
          </h2>
          <Link to="/catalog" style={{
            padding: '16px 40px', background: '#2F2F2F',
            color: '#fff', fontFamily: 'Anonymous Pro',
            fontSize: '14px', letterSpacing: '3px',
            textDecoration: 'none', borderRadius: '8px'
          }}>
            В КАТАЛОГ
          </Link>
        </div>
      ) : (
        <div className="cart-wrap">
          {/* Левая часть — товары */}
          <div className="cart-left">
            <h2 style={{
              fontFamily: 'Anonymous Pro', fontSize: '28px',
              letterSpacing: '4px', marginBottom: '32px', color: '#050505'
            }}>
              ВАШ ЗАКАЗ
            </h2>

            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div>
                  <p style={{
                    fontFamily: 'Anonymous Pro', fontSize: '18px',
                    letterSpacing: '1px', color: '#050505', marginBottom: '4px',
                    fontWeight: '700'
                  }}>
                    {item.name}
                  </p>
                  {item.size && (
                    <p style={{ fontFamily: 'Anonymous Pro', fontSize: '13px', color: '#7F7F7F' }}>
                      размер: {item.size}
                    </p>
                  )}
                  {item.color && (
                    <p style={{ fontFamily: 'Anonymous Pro', fontSize: '13px', color: '#7F7F7F' }}>
                      цвет: {item.color}
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span style={{ fontFamily: 'Anonymous Pro', fontSize: '18px', minWidth: '20px', textAlign: 'center' }}>
                    {item.qty}
                  </span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>

                  <span style={{ fontFamily: 'Anonymous Pro', fontSize: '18px', minWidth: '100px', textAlign: 'right' }}>
                    {(item.price_min * item.qty)?.toLocaleString()} ₽
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'none', cursor: 'pointer',
                      width: '30px', height: '30px',
                      borderRadius: '50%', border: '1px solid #D4D4D4',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px', color: '#000'
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <div style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '24px 0', borderBottom: '1px dashed #000'
            }}>
              <span style={{ fontFamily: 'Anonymous Pro', fontSize: '20px', fontWeight: '700' }}>
                Сумма:
              </span>
              <span style={{ fontFamily: 'Anonymous Pro', fontSize: '20px', fontWeight: '700' }}>
                {total?.toLocaleString()} ₽
              </span>
            </div>
          </div>

          {/* Правая часть — форма */}
          <div className="cart-right">
            <h2 style={{
              fontFamily: 'Anonymous Pro', fontSize: '28px',
              letterSpacing: '4px', marginBottom: '8px', color: '#050505'
            }}>
              ОФОРМЛЕНИЕ
            </h2>
            <p style={{
              fontFamily: 'Anonymous Pro', fontSize: '14px',
              color: '#7F7F7F', marginBottom: '32px'
            }}>
              Все поля обязательны для заполнения
            </p>

            <input
              className="form-input"
              placeholder="Ваше имя"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className="form-input"
              placeholder="Фамилия"
              value={surname}
              onChange={e => setSurname(e.target.value)}
            />
            <input
              className="form-input"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                placeholder="Номер телефона"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ paddingLeft: '60px' }}
              />
              <span style={{
                position: 'absolute', left: '20px', top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'Anonymous Pro', fontSize: '16px', color: '#7F7F7F'
              }}>+7</span>
            </div>

            <div style={{
              borderTop: '1px dashed #000',
              marginTop: '24px', paddingTop: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'Anonymous Pro', fontSize: '18px', fontWeight: '700' }}>
                  Итоговая сумма:
                </span>
                <span style={{ fontFamily: 'Anonymous Pro', fontSize: '18px', fontWeight: '700' }}>
                  {total?.toLocaleString()} ₽
                </span>
              </div>
            </div>

            <button
              className="order-btn"
              onClick={handleOrder}
              disabled={ordering}
            >
              {ordering ? 'ОФОРМЛЯЕМ...' : 'ОПЛАТИТЬ ЗАКАЗ'}
            </button>

            <p style={{
              fontFamily: 'Anonymous Pro', fontSize: '11px',
              color: '#7F7F7F', marginTop: '16px', lineHeight: '1.6'
            }}>
              Нажимая на кнопку «Оплатить», Вы соглашаетесь с условиями публичной оферты,
              принимаете политику защиты и обработки персональных данных.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}