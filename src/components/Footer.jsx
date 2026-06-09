import { Link } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState(null); // 'success' | 'error' | 'duplicate'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubStatus('error');
      return;
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.trim() });

    if (!error) {
      setSubStatus('success');
      setEmail('');
    } else if (error.code === '23505') {
      // UNIQUE constraint — уже подписан
      setSubStatus('duplicate');
    } else {
      setSubStatus('error');
    }
  };

  return (
    <footer style={{ backgroundColor: '#fff', borderTop: '1px solid #000' }}>
      <style>{`
        .footer-top {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          padding: 60px 80px 40px;
          border-bottom: 1px solid #eee;
          gap: 40px;
        }
        .footer-col-title {
          font-family: 'Anonymous Pro', monospace;
          font-size: 20px; color: #050505;
          letter-spacing: 2px; margin-bottom: 24px;
        }
        .footer-link {
          display: block;
          font-family: 'Anonymous Pro', monospace;
          font-size: 16px; color: #A4A4A4;
          text-decoration: none; margin-bottom: 12px;
          letter-spacing: 1px; transition: color 0.2s;
        }
        .footer-link:hover { color: #000; }
        .footer-email-wrap {
          display: flex;
          border: 1px solid #000;
          overflow: hidden;
          max-width: 460px;
        }
        .footer-email-input {
          flex: 1; padding: 18px 20px;
          border: none;
          font-family: 'Anonymous Pro', monospace;
          font-size: 18px; color: #A4A4A4;
          outline: none; background: #fff;
        }
        .footer-email-btn {
          width: 76px; background: #AA0607;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s; flex-shrink: 0;
        }
        .footer-email-btn:hover { background: #601C1D; }
        .footer-sub-msg {
          font-family: 'Anonymous Pro', monospace;
          font-size: 12px; margin-top: 10px; letter-spacing: 1px;
        }
        .footer-contacts {
          display: flex;
          justify-content: center;
          gap: 60px;
          padding: 24px 80px;
          border-top: 1px solid #eee;
        }
        .footer-mnt {
          font-family: 'Druk Wide Cyr', 'Arial Black', sans-serif;
          font-size: clamp(80px, 15vw, 200px);
          font-weight: 500; color: #000;
          text-align: center; line-height: 0.85;
          overflow: hidden; padding: 0 20px; letter-spacing: -4px;
        }
        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr !important; padding: 40px 24px !important; }
          .footer-contacts { padding: 24px !important; flex-wrap: wrap; gap: 24px; }
          .footer-mnt { font-size: clamp(60px, 20vw, 120px) !important; }
        }
      `}</style>

      <div className="footer-top">
        {/* Навигация */}
        <div>
          <p className="footer-col-title">БОЛЬШЕ ОПЦИЙ</p>
          <Link to="/catalog" className="footer-link">КАТАЛОГ</Link>
          <Link to="/about" className="footer-link">О БРЕНДЕ</Link>
          <Link to="/cart" className="footer-link">КОРЗИНА</Link>
        </div>

        {/* Подписка */}
        <div>
          <p className="footer-col-title" style={{ textAlign: 'center' }}>МЫ НА СВЯЗИ ДЛЯ ВАС</p>
          <form className="footer-email-wrap" onSubmit={handleSubscribe}>
            <input
              className="footer-email-input"
              placeholder="ваш e-mail"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setSubStatus(null); }}
            />
            <button type="submit" className="footer-email-btn">
              <svg width="24" height="14" viewBox="0 0 30 14" fill="none">
                <line x1="0" y1="7" x2="26" y2="7" stroke="#fff" strokeWidth="2"/>
                <path d="M20 1L28 7L20 13" stroke="#fff" strokeWidth="2" fill="none"/>
              </svg>
            </button>
          </form>

          {subStatus === 'success' && (
            <p className="footer-sub-msg" style={{ color: '#2F2F2F' }}>✓ Вы подписаны!</p>
          )}
          {subStatus === 'duplicate' && (
            <p className="footer-sub-msg" style={{ color: '#7F7F7F' }}>Вы уже подписаны на рассылку</p>
          )}
          {subStatus === 'error' && (
            <p className="footer-sub-msg" style={{ color: '#AA0607' }}>Введите корректный e-mail</p>
          )}

          <p style={{ fontFamily: 'Anonymous Pro', fontSize: '13px', color: '#050505', marginTop: '16px', textAlign: 'center', lineHeight: '1.6' }}>
            Отправляя данные, вы соглашаетесь с{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>политикой конфиденциальности</span>
          </p>
        </div>

        {/* Коллекции */}
        <div style={{ textAlign: 'right' }}>
          <p className="footer-col-title">КОЛЛЕКЦИИ</p>
          <Link to="/catalog" className="footer-link" style={{ textAlign: 'right' }}>НОВОЕ</Link>
          <Link to="/catalog" className="footer-link" style={{ textAlign: 'right' }}>СМОТРЕТЬ ВСЕ</Link>
          <Link to="/catalog" className="footer-link" style={{ textAlign: 'right' }}>ТОПЫ</Link>
          <Link to="/catalog" className="footer-link" style={{ textAlign: 'right' }}>ЛЕГГИНСЫ</Link>
          <Link to="/catalog" className="footer-link" style={{ textAlign: 'right' }}>КОМБИНЕЗОНЫ</Link>
        </div>
      </div>

      <div className="footer-contacts">
        <span style={{ fontFamily: 'Anonymous Pro', fontSize: '16px', color: '#7F7F7F' }}>8 901 356 26 25</span>
        <span style={{ fontFamily: 'Anonymous Pro', fontSize: '16px', color: '#7F7F7F' }}>|</span>
        <span style={{ fontFamily: 'Anonymous Pro', fontSize: '16px', color: '#7F7F7F' }}>8 937 917 31 21</span>
      </div>

      <div className="footer-mnt">MNT</div>
    </footer>
  );
}
