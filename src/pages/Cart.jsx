import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, setCart } = useCart();
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOrder = async () => {
    if (cart.length === 0) return;
    setOrdering(true);
    try {
      await addDoc(collection(db, 'orders'), {
        items: cart,
        total,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
    } catch (e) {
      alert('Ошибка при оформлении заказа');
    }
    setOrdering(false);
  };

  if (success) return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--bone)'
    }}>
      <p style={{ fontFamily: 'Caveat', fontSize: '32px', color: 'var(--spanish-sun)', marginBottom: '16px' }}>
        Заказ оформлен!
      </p>
      <h2 style={{ fontFamily: 'Arial Black', fontSize: '28px', letterSpacing: '4px', marginBottom: '24px', color: 'var(--espresso)' }}>
        СПАСИБО ЗА ПОКУПКУ
      </h2>
      <p style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', color: 'var(--espresso)', marginBottom: '32px', opacity: 0.7 }}>
        Мы свяжемся с вами в ближайшее время
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
      <h1 style={{ fontFamily: 'Arial Black', fontSize: '48px', letterSpacing: '4px', marginBottom: '48px', color: 'var(--espresso)' }}>
        КОРЗИНА
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
        <div>
          {cart.map(item => (
            <div key={item.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '24px 0', borderBottom: '1px solid var(--espresso)'
            }}>
              <div>
                <p style={{ fontFamily: 'Anonymous Pro', fontSize: '14px', letterSpacing: '1px', color: 'var(--espresso)' }}>
                  {item.name}
                </p>
                <p style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', color: 'var(--persian-plum)', marginTop: '4px' }}>
                  {item.price_min?.toLocaleString()} ₽
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} style={{
                    width: '32px', height: '32px', border: '1px solid var(--espresso)',
                    backgroundColor: 'transparent', cursor: 'pointer', fontFamily: 'Anonymous Pro'
                  }}>−</button>
                  <span style={{ fontFamily: 'Anonymous Pro', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} style={{
                    width: '32px', height: '32px', border: '1px solid var(--espresso)',
                    backgroundColor: 'transparent', cursor: 'pointer', fontFamily: 'Anonymous Pro'
                  }}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Anonymous Pro', fontSize: '11px',
                  color: 'var(--spanish-sun)', letterSpacing: '1px'
                }}>УДАЛИТЬ</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: 'var(--espresso)', padding: '40px',
          height: 'fit-content', position: 'sticky', top: '100px'
        }}>
          <h3 style={{ fontFamily: 'Arial Black', fontSize: '18px', color: 'var(--bone)', letterSpacing: '2px', marginBottom: '32px' }}>
            ИТОГО
          </h3>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', color: 'var(--blush)' }}>
                {item.name} × {item.qty}
              </span>
              <span style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', color: 'var(--bone)' }}>
                {(item.price_min * item.qty).toLocaleString()} ₽
              </span>
            </div>
          ))}
          <div style={{
            borderTop: '1px solid var(--blush)', marginTop: '24px', paddingTop: '24px',
            display: 'flex', justifyContent: 'space-between', marginBottom: '32px'
          }}>
            <span style={{ fontFamily: 'Arial Black', fontSize: '14px', color: 'var(--bone)', letterSpacing: '2px' }}>ИТОГО</span>
            <span style={{ fontFamily: 'Arial Black', fontSize: '14px', color: 'var(--lemon-pie)' }}>{total.toLocaleString()} ₽</span>
          </div>
          <button
            onClick={handleOrder}
            disabled={ordering}
            style={{
              width: '100%', padding: '16px',
              backgroundColor: ordering ? 'var(--persian-plum)' : 'var(--spanish-sun)',
              color: 'var(--bone)', border: 'none',
              fontFamily: 'Anonymous Pro', fontSize: '11px',
              letterSpacing: '3px', cursor: ordering ? 'not-allowed' : 'pointer'
            }}>
            {ordering ? 'ОФОРМЛЯЕМ...' : 'ОФОРМИТЬ ЗАКАЗ'}
          </button>
          <p style={{ fontFamily: 'Caveat', fontSize: '14px', color: 'var(--golden-matcha)', textAlign: 'center', marginTop: '16px' }}>
            * платёжная система подключается отдельно
          </p>
        </div>
      </div>
    </div>
  );
}