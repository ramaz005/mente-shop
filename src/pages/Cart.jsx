import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const cartStyles = `
    .cart-grid { display: grid; grid-template-columns: 1fr 380px; gap: 40px; }
    @media (max-width: 768px) {
      .cart-grid { grid-template-columns: 1fr !important; }
    }
  `;

  const handleOrder = async () => {
    if (cart.length === 0) return;
    if (!name || !phone) {
      alert('Заполните имя и телефон!');
      return;
    }
    setOrdering(true);
    try {
      await axios.post(`${STRAPI_URL}/orders`, {
        data: {
          total,
          status: 'pending',
          customer_name: name,
          customer_phone: phone,
          customer_email: email,
          items: cart
        }
      });
      setSuccess(true);
      clearCart();
    } catch (e) {
      alert('Ошибка при оформлении заказа. Попробуйте снова.');
      console.error(e);
    }
    setOrdering(false);
  };

  if (success) return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--bone)', textAlign: 'center', padding: '40px'
    }}>
      <p style={{ fontFamily: 'Caveat', fontSize: '32px', color: 'var(--spanish-sun)', marginBottom: '16px' }}>
        Заказ оформлен!
      </p>
      <h2 style={{ fontFamily: 'Arial Black', fontSize: '28px', letterSpacing: '4px', marginBottom: '24px', color: 'var(--espresso)' }}>
        СПАСИБО ЗА ПОКУПКУ
      </h2>
      <p style={{ fontFamily: 'Anonymous Pro', fontSize: '13px', color: 'var(--espresso)', marginBottom: '8px', opacity: 0.7 }}>
        Мы свяжемся с вами по номеру: {phone}
      </p>
      <p style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', color: 'var(--espresso)', marginBottom: '40px', opacity: 0.5 }}>
        Сумма заказа: {total.toLocaleString()} ₽
      </p>
      <Link to="/catalog" style={{
        padding: '14px 40px', backgroundColor: 'var(--spanish-sun)',
        color: 'var(--bone)', fontFamily: 'Anonymous Pro',
        fontSize: '11px', letterSpacing: '2px', textDecoration: 'none'
      }}>
        ПРОДОЛЖИТЬ ПОКУПКИ
      </Link>
    </div>
  );

  if (cart.length === 0) return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bone)'
    }}>
      <h2 style={{ fontFamily: 'Arial Black', fontSize: '32px', letterSpacing: '4px', marginBottom: '24px', color: 'var(--espresso)' }}>
        КОРЗИНА ПУСТА
      </h2>
      <Link to="/catalog" style={{
        padding: '14px 40px', backgroundColor: 'var(--spanish-sun)',
        color: 'var(--bone)', fontFamily: 'Anonymous Pro',
        fontSize: '11px', letterSpacing: '2px', textDecoration: 'none'
      }}>
        В КАТАЛОГ
      </Link>
    </div>
  );

  return (
    <div style={{ backgroundColor: 'var(--bone)', minHeight: '100vh', padding: '60px 40px' }}>
      <style>{cartStyles}</style>

      <h1 style={{
        fontFamily: 'Arial Black', fontSize: 'clamp(32px, 6vw, 48px)',
        letterSpacing: '4px', marginBottom: '48px', color: 'var(--espresso)'
      }}>
        КОРЗИНА
      </h1>

      <div className="cart-grid">
        {/* Товары */}
        <div>
          {cart.map(item => (
            <div key={item.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '24px 0', borderBottom: '1px solid var(--espresso)'
            }}>
              <div>
                <p style={{ fontFamily: 'Anonymous Pro', fontSize: '14px', letterSpacing: '1px', color: 'var(--espresso)', marginBottom: '4px' }}>
                  {item.name}
                </p>
                {item.color && (
                  <p style={{ fontFamily: 'Anonymous Pro', fontSize: '11px', color: 'var(--espresso)', opacity: 0.5, marginBottom: '4px' }}>
                    {item.color}
                  </p>
                )}
                <p style={{ fontFamily: 'Anonymous Pro', fontSize: '13px', color: 'var(--persian-plum)' }}>
                  {item.price_min?.toLocaleString()} ₽
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} style={{
                    width: '32px', height: '32px', border: '1px solid var(--espresso)',
                    backgroundColor: 'transparent', cursor: 'pointer',
                    fontFamily: 'Anonymous Pro', fontSize: '16px'
                  }}>−</button>
                  <span style={{ fontFamily: 'Anonymous Pro', minWidth: '20px', textAlign: 'center' }}>
                    {item.qty}
                  </span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} style={{
                    width: '32px', height: '32px', border: '1px solid var(--espresso)',
                    backgroundColor: 'transparent', cursor: 'pointer',
                    fontFamily: 'Anonymous Pro', fontSize: '16px'
                  }}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Anonymous Pro', fontSize: '11px',
                  color: 'var(--spanish-sun)', letterSpacing: '1px'
                }}>
                  УДАЛИТЬ
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Итого + форма */}
        <div style={{
          backgroundColor: 'var(--espresso)', padding: '40px',
          height: 'fit-content', position: 'sticky', top: '100px'
        }}>
          <h3 style={{
            fontFamily: 'Arial Black', fontSize: '18px',
            color: 'var(--bone)', letterSpacing: '2px', marginBottom: '24px'
          }}>
            ОФОРМЛЕНИЕ
          </h3>

          {/* Форма */}
          {[
            { placeholder: 'Ваше имя *', value: name, setter: setName },
            { placeholder: 'Телефон *', value: phone, setter: setPhone },
            { placeholder: 'Email', value: email, setter: setEmail }
          ].map((field, i) => (
            <input
              key={i}
              placeholder={field.placeholder}
              value={field.value}
              onChange={e => field.setter(e.target.value)}
              style={{
                width: '100%', padding: '12px',
                marginBottom: '8px',
                backgroundColor: 'transparent',
                border: '1px solid var(--blush)',
                color: 'var(--bone)',
                fontFamily: 'Anonymous Pro',
                fontSize: '12px',
                outline: 'none'
              }}
            />
          ))}

          {/* Разделитель */}
          <div style={{ borderTop: '1px solid var(--persian-plum)', margin: '24px 0' }} />

          {/* Список товаров */}
          {cart.map(item => (
            <div key={item.id} style={{
              display: 'flex', justifyContent: 'space-between', marginBottom: '8px'
            }}>
              <span style={{ fontFamily: 'Anonymous Pro', fontSize: '11px', color: 'var(--blush)' }}>
                {item.name} × {item.qty}
              </span>
              <span style={{ fontFamily: 'Anonymous Pro', fontSize: '11px', color: 'var(--bone)' }}>
                {(item.price_min * item.qty).toLocaleString()} ₽
              </span>
            </div>
          ))}

          {/* Итого */}
          <div style={{
            borderTop: '1px solid var(--persian-plum)',
            marginTop: '16px', paddingTop: '16px',
            display: 'flex', justifyContent: 'space-between', marginBottom: '24px'
          }}>
            <span style={{ fontFamily: 'Arial Black', fontSize: '14px', color: 'var(--bone)', letterSpacing: '2px' }}>
              ИТОГО
            </span>
            <span style={{ fontFamily: 'Arial Black', fontSize: '14px', color: 'var(--lemon-pie)' }}>
              {total.toLocaleString()} ₽
            </span>
          </div>

          <button
            onClick={handleOrder}
            disabled={ordering}
            style={{
              width: '100%', padding: '16px',
              backgroundColor: ordering ? 'var(--persian-plum)' : 'var(--spanish-sun)',
              color: 'var(--bone)', border: 'none',
              fontFamily: 'Anonymous Pro', fontSize: '11px',
              letterSpacing: '3px', cursor: ordering ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            {ordering ? 'ОФОРМЛЯЕМ...' : 'ОФОРМИТЬ ЗАКАЗ'}
          </button>

          <p style={{
            fontFamily: 'Caveat', fontSize: '13px',
            color: 'var(--golden-matcha)', textAlign: 'center', marginTop: '12px'
          }}>
            * платёжная система подключается отдельно
          </p>
        </div>
      </div>
    </div>
  );
}
