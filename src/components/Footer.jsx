import { Link } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { notifyContact } from '../lib/notify';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [msgStatus, setMsgStatus] = useState(null); // 'success' | 'error'

  const handleEmailArrow = (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsgStatus('invalid-email');
      return;
    }
    setMsgStatus(null);
    setModalOpen(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);

    const { error } = await supabase.from('contact_messages').insert({
      email: email.trim(),
      message: message.trim(),
    });

    await notifyContact({ email: email.trim(), message: message.trim() });

    if (!error) {
      setMsgStatus('success');
      setEmail('');
      setMessage('');
      setTimeout(() => {
        setModalOpen(false);
        setMsgStatus(null);
      }, 2000);
    } else {
      setMsgStatus('error');
    }
    setSending(false);
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
        /* Модальное окно */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .modal-box {
          background: #fff;
          padding: 40px;
          width: 100%; max-width: 480px;
          animation: fadeInUp 0.25s ease;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .modal-title {
          font-family: 'Anonymous Pro', monospace;
          font-size: 18px; letter-spacing: 3px;
          color: #050505; margin-bottom: 8px;
        }
        .modal-email-shown {
          font-family: 'Anonymous Pro', monospace;
          font-size: 12px; color: #aaa; margin-bottom: 24px;
          letter-spacing: 1px;
        }
        .modal-textarea {
          width: 100%; min-height: 120px;
          padding: 14px 16px; border: 1px solid #000;
          font-family: 'Anonymous Pro', monospace;
          font-size: 14px; color: #000;
          resize: vertical; outline: none;
          box-sizing: border-box; background: #fff;
          margin-bottom: 16px;
        }
        .modal-textarea::placeholder { color: #aaa; }
        .modal-actions { display: flex; gap: 12px; }
        .modal-send-btn {
          flex: 1; padding: 16px;
          background: #2F2F2F; color: #fff; border: none;
          font-family: 'Anonymous Pro', monospace;
          font-size: 13px; letter-spacing: 2px;
          cursor: pointer; transition: background 0.2s;
        }
        .modal-send-btn:hover { background: #AA0607; }
        .modal-send-btn:disabled { background: #ccc; cursor: not-allowed; }
        .modal-cancel-btn {
          padding: 16px 24px;
          background: none; border: 1px solid #ccc; color: #555;
          font-family: 'Anonymous Pro', monospace;
          font-size: 13px; letter-spacing: 1px;
          cursor: pointer; transition: border-color 0.2s;
        }
        .modal-cancel-btn:hover { border-color: #000; }
        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr !important; padding: 40px 24px !important; }
          .footer-contacts { padding: 24px !important; flex-wrap: wrap; gap: 24px; }
          .footer-mnt { font-size: clamp(60px, 20vw, 120px) !important; }
          .modal-box { padding: 28px 20px; }
        }
      `}</style>

      <div className="footer-top" id="info">
        {/* Навигация — новый порядок без корзины */}
        <div>
          <p className="footer-col-title">БОЛЬШЕ ОПЦИЙ</p>
          <Link to="/about" className="footer-link">О БРЕНДЕ</Link>
          <Link to="/contacts" className="footer-link">КОНТАКТЫ</Link>
          <Link to="/delivery" className="footer-link">ДОСТАВКА И ОПЛАТА</Link>
          <Link to="/returns" className="footer-link">ВОЗВРАТ И ОБМЕН</Link>
          <Link to="/privacy" className="footer-link">КОНФИДЕНЦИАЛЬНОСТЬ</Link>
          <Link to="/offer" className="footer-link">ОФЕРТА</Link>
        </div>

        {/* Email → модалка */}
        <div>
          <p className="footer-col-title" style={{ textAlign: 'center' }}>МЫ НА СВЯЗИ ДЛЯ ВАС</p>
          <form className="footer-email-wrap" onSubmit={handleEmailArrow}>
            <input
              className="footer-email-input"
              placeholder="ваш e-mail"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setMsgStatus(null); }}
            />
            <button type="submit" className="footer-email-btn">
              <svg width="24" height="14" viewBox="0 0 30 14" fill="none">
                <line x1="0" y1="7" x2="26" y2="7" stroke="#fff" strokeWidth="2"/>
                <path d="M20 1L28 7L20 13" stroke="#fff" strokeWidth="2" fill="none"/>
              </svg>
            </button>
          </form>

          {msgStatus === 'invalid-email' && (
            <p className="footer-sub-msg" style={{ color: '#AA0607' }}>Введите корректный e-mail</p>
          )}
          {msgStatus === 'success' && (
            <p className="footer-sub-msg" style={{ color: '#2F2F2F' }}>✓ Сообщение отправлено!</p>
          )}

          <p style={{ fontFamily: 'Anonymous Pro', fontSize: '13px', color: '#050505', marginTop: '16px', textAlign: 'center', lineHeight: '1.6' }}>
            Отправляя данные, вы соглашаетесь с{' '}
            <Link to="/privacy" style={{ textDecoration: 'underline', color: '#050505' }}>политикой конфиденциальности</Link>
          </p>
        </div>

        {/* Коллекции — обновлённый список */}
        <div style={{ textAlign: 'right' }}>
          <p className="footer-col-title">КОЛЛЕКЦИИ</p>
          <Link to="/catalog" className="footer-link" style={{ textAlign: 'right' }}>НОВОЕ</Link>
          <Link to="/catalog" className="footer-link" style={{ textAlign: 'right' }}>СМОТРЕТЬ ВСЕ</Link>
          <Link to="/catalog" className="footer-link" style={{ textAlign: 'right' }}>КОМПЛЕКТЫ</Link>
          <Link to="/catalog" className="footer-link" style={{ textAlign: 'right' }}>ТОПЫ</Link>
          <Link to="/catalog" className="footer-link" style={{ textAlign: 'right' }}>РАШГАРДЫ</Link>
          <Link to="/catalog" className="footer-link" style={{ textAlign: 'right' }}>ЛЕГГИНСЫ</Link>
          <Link to="/catalog" className="footer-link" style={{ textAlign: 'right' }}>ШОРТЫ</Link>
          <Link to="/catalog" className="footer-link" style={{ textAlign: 'right' }}>КОМБИНЕЗОНЫ</Link>
        </div>
      </div>

      <div className="footer-contacts">
        <span style={{ fontFamily: 'Anonymous Pro', fontSize: '16px', color: '#7F7F7F' }}>8 901 356 26 25</span>
        <span style={{ fontFamily: 'Anonymous Pro', fontSize: '16px', color: '#7F7F7F' }}>|</span>
        <span style={{ fontFamily: 'Anonymous Pro', fontSize: '16px', color: '#7F7F7F' }}>8 937 917 31 21</span>
      </div>

      <div className="footer-mnt">MNT</div>

      {/* Модальное окно вопроса */}
      {modalOpen && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="modal-box">
            <p className="modal-title">ВАШ ВОПРОС</p>
            <p className="modal-email-shown">Ответим на: {email}</p>
            <form onSubmit={handleSendMessage}>
              <textarea
                className="modal-textarea"
                placeholder="Напишите ваш вопрос или комментарий..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                autoFocus
              />
              {msgStatus === 'error' && (
                <p style={{ fontFamily: 'Anonymous Pro', fontSize: '12px', color: '#AA0607', marginBottom: '12px' }}>
                  Ошибка отправки. Попробуйте снова.
                </p>
              )}
              <div className="modal-actions">
                <button type="submit" className="modal-send-btn" disabled={sending || !message.trim()}>
                  {sending ? 'ОТПРАВЛЯЕМ...' : 'ОТПРАВИТЬ'}
                </button>
                <button type="button" className="modal-cancel-btn" onClick={() => setModalOpen(false)}>
                  ОТМЕНА
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}
